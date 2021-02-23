<script>
  import { getContext } from "svelte";

  const { width, height, xScale, yScale, yRange } = getContext("LayerCake");
  export let chart;
  export let gridlines = true;
  export let formatTick = (d) => d;
  export let baseline = false;
  export let snapTicks = false;
  export let ticks = undefined;
  export let xTick = 0;
  export let yTick = 16;
  export let dxTick = 0;
  export let dyTick = 0;
  export let axis_position = 1;
  export let type;
  export let values;

  $: tickVals = Array.isArray(ticks)
    ? ticks
    : typeof ticks === "function"
    ? ticks($xScale.ticks())
    : $xScale.ticks(ticks);

  function textAnchor(i) {
    if (snapTicks === true) {
      if (i === 0) {
        return "start";
      }
      if (i === tickVals.length - 1) {
        return "end";
      }
    }
    return "middle";
  }
</script>

{#if type == "heatmap"}
  <g> </g>
{:else}
  <g class="axis x-axis">
    {#each tickVals as tick, i}
      <g
        class="tick tick-{tick}"
        transform="translate({$xScale(tick)},{$yRange[0]})"
      >
        {#if gridlines !== false}
          <line y1="{$height * -1}" y2="0" x1="0" x2="0"></line>
        {/if}
        <text
          x="{xTick}"
          y="{yTick}"
          dx="{dxTick}"
          dy="{dyTick}"
          text-anchor="{textAnchor(i)}"
        >
          {formatTick(tick)}
        </text>
      </g>
    {/each}
    {#if baseline === true}
      <line class="baseline" y1="{$height}" y2="{$height}" x1="0" x2="{$width}"
      ></line>
    {/if}
  </g>
{/if}

<style>
  .tick {
    font-size: 0.75em;
  }

  .tick:nth-of-type(even) {
    display: none;
  }

  line,
  .tick line {
    stroke: var(--default);
    stroke-dasharray: 2;
    stroke-opacity: 0.33;
  }

  .tick text {
    fill: var(--fg);
  }

  .baseline {
    stroke-dasharray: 0;
    stroke: var(--default);
    stroke-opacity: 0.5;
  }

  text {
    font-family: var(--source);
  }

  @media only screen and (min-width: 640px) {
    .tick:nth-of-type(even) {
      display: none;
    }

    .tick:nth-of-type(4n + 1) {
      display: block;
    }
  }
</style>
