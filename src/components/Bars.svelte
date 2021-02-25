<script>
  import { getContext, onMount, createEventDispatcher } from "svelte";
  export let additional_data = [];
  export let length;
  import { scaleOrdinal, scaleBand } from "d3-scale";
  import {
    ranked_metric,
    country,
    toggle,
    tooltip_text,
    national_year,
    global_year,
  } from "../stores/vibrancy.js";

  const {
    data,
    xGet,
    flatData,
    xScale,
    yGet,
    zGet,
    yScale,
    custom,
    y,
  } = getContext("LayerCake");
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

    // clamped_scale = scaleBand()
    //   .paddingInner([0.05])
    //   .range(initial_range)
    //   .round(true);
    // $yScale = clamped_scale;
    clamped_scale = $yScale;
    initial_range = $yScale.range();

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
</script>

{#if stacked}
  <!-- {#if length == 0}
    <text>No data available</text>
    <circle></circle>
  {:else} -->
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
            $national_year = $global_year;
          }}"></rect>
      {/each}
    {/each}
  </g>
  <!-- {/if} -->
{:else if ranked}
  <g class="bar-group ranked">
    {#each $data as d, i}
      <rect
        name="{$y(d)}"
        class="group-rect rank"
        data-id="{i}"
        x="{$xScale.range()[1]}"
        y="{$yGet(d)}"
        fill="{$y(d) == $country ? '#d5a4cb' : '#cccccc'}"
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

  rect.rank:hover {
    box-shadow: 0px 2px 10px rgba(191, 178, 162, 0.5);
    opacity: 0.7;
  }

  /* .group-rect.stacked:hover {
    box-shadow: 0px 2px 10px rgba(191, 178, 162, 0.5);
    opacity: 0.8;
  } */

  rect.active {
    stroke: var(--extra-dark-blue);
    stroke-width: 2px;
  }

  @media screen and (max-width: 768px) {
    rect.national:hover {
    }

    .group-rect.stacked:hover {
    }

    rect.active {
      stroke-width: 0px;
    }
  }
</style>
