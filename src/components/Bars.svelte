<script>
  import { getContext, onMount } from "svelte";
  export let additional_data = [];
  import { scaleOrdinal, scaleBand } from "d3-scale";
  import { ranked_metric, country, toggle } from "../stores/vibrancy.js";

  const { data, xGet, xScale, yGet, zGet, yScale, custom, y } = getContext(
    "LayerCake"
  );
  export let stacked;
  export let ranked;
  let clamped_scale;
  let initial_range;

  if (stacked) {
    // initial_range = $yScale.range();
    // console.log(initial_range);
    // clamped_scale = scaleBand()
    //   .paddingInner([0.05])
    //   .range(initial_range)
    //   .round(true);
    // $yScale = clamped_scale;
    clamped_scale = $yScale;
    initial_range = $yScale.range();
    console.log(initial_range);
    clamped_scale = clamped_scale.range(initial_range);
  }

  $: columnWidth = (d) => {
    const xVals = $xGet(d);
    return xVals[1] - xVals[0];
  };

  console.log($data);
</script>

{#if stacked}
  <g class="bar-group stacked">
    {#each $data as series}
      {#each series as d, i}
        <rect
          name="{$y(d)}"
          class="group-rect"
          data-id="{i}"
          x="{$xGet(d)[0]}"
          y="{$yGet(d)}"
          height="{$yScale.bandwidth()}"
          width="{columnWidth(d)}"
          fill="{$zGet(series)}"
          on:click="{() => {
            $country = $y(d);
            $toggle = 'National';
          }}"></rect>
      {/each}
    {/each}
  </g>
{:else if ranked}
  <g class="bar-group ranked">
    {#each $data as d, i}
      <rect
        name="{$y(d)}"
        class="group-rect"
        data-id="{i}"
        x="{$xScale.range()[0]}"
        y="{$yGet(d)}"
        fill="{$y(d) == $country ? '#BB86FC' : '#D24939'}"
        height="{$yScale.bandwidth()}"
        width="{$xGet(d)}"></rect>
    {/each}
  </g>
{:else if !stacked}
  <g class="bar-group national">
    {#each $data as d, i}
      <rect
        name="{$y(d)}"
        class="group-rect national"
        data-id="{i}"
        x="{$xScale.range()[0]}"
        y="{$yGet(d)}"
        fill="{$zGet(d)}"
        height="{$yScale.bandwidth()}"
        on:click="{() => {
          $ranked_metric = d.variable;
          $ranked_metric = $ranked_metric;
          console.log($ranked_metric);
        }}"
        class:active="{$ranked_metric == d.variable}"
        width="{$xGet(d)}"></rect>
    {/each}
  </g>
{/if}

<style>
  rect.national:hover {
    box-shadow: 0px 2px 10px rgba(191, 178, 162, 0.5);
    opacity: 0.8;
  }

  rect.active {
    stroke: black;
    stroke-width: 2px;
  }
</style>
