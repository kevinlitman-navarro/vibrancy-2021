<script>
  import { getContext, onMount, createEventDispatcher } from "svelte";
  export let additional_data = [];
  import { scaleOrdinal, scaleBand } from "d3-scale";
  import {
    ranked_metric,
    country,
    toggle,
    tooltip_text,
  } from "../stores/vibrancy.js";

  const { data, xGet, xScale, yGet, zGet, yScale, custom, y } = getContext(
    "LayerCake"
  );
  export let stacked;
  export let ranked;
  const dispatch = createEventDispatcher();
  let clamped_scale;
  let initial_range;
  let show = false;
  let current_x;
  let current_y;
  let pillar;
  let type;

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

  let updateMessage = () => {
    dispatch("message", {
      current_x,
      current_y,
      show,
      type,
    });
  };

  function handleMouseout() {
    show = false;
    updateMessage();
  }

  function handleMouseoverNational(d) {
    show = true;
    // $tooltip_text = $y(d).concat(" : ").concat(Math.round(d.value), 2);
    $tooltip_text = $y(d).concat(": ").concat(Math.round(d.value));
    current_x = columnWidth(d);
    current_y = $yGet(d) - $yScale.bandwidth() * 2;
    type = "national";

    updateMessage();
  }

  function handleMouseoverRanked(d) {
    show = true;
    $tooltip_text = $y(d);
    current_x = $xScale.range()[1] / 2;
    current_y = $yGet(d);
    type = "rank";

    updateMessage();
  }

  function handleMouseoverGlobal(d) {
    show = true;
    $tooltip_text = $y(d);
    current_x = $xGet(d)[0];
    current_y = $yGet(d);
    type = "global";

    updateMessage();
  }

  console.log($data);
</script>

{#if stacked}
  <g class="bar-group stacked">
    {#each $data as series}
      {#each series as d, i}
        <rect
          name="{$y(d)}"
          class="group-rect stacked"
          data-id="{i}"
          x="{$xGet(d)[0]}"
          y="{$yGet(d)}"
          height="{$yScale.bandwidth()}"
          width="{columnWidth(d)}"
          fill="{$zGet(series)}"
          on:mouseenter="{handleMouseoverGlobal(d)}"
          on:mouseout="{handleMouseout}"
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
        x="{$xScale.range()[1]}"
        y="{$yGet(d)}"
        fill="{$y(d) == $country ? '#041b33' : '#cccccc'}"
        height="{$yScale.bandwidth()}"
        width="{$xGet(d)}"
        transform="translate({-$xGet(d)},0)"
        on:mouseenter="{handleMouseoverRanked(d)}"
        on:mouseout="{handleMouseout}"></rect>
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
        on:mouseenter="{handleMouseoverNational(d)}"
        on:mouseout="{handleMouseout}"
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

  .group-rect.stacked:hover {
    box-shadow: 0px 2px 10px rgba(191, 178, 162, 0.5);
    opacity: 0.8;
  }

  rect.active {
    stroke: black;
    stroke-width: 2px;
  }
</style>
