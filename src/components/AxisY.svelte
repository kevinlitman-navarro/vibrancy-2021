<script>
  import { getContext } from "svelte";
  const { padding, xRange, xScale, yGet, yScale } = getContext("LayerCake");
  export let ticks = 5;
  export let gridlines = false;
  export let formatTick = (d) => d;
  export let xTick = 0;
  export let spacing;
  export let yTick = 0;
  export let dxTick = 0;
  export let dyTick = -4;
  export let textAnchor = "start";
  export let label;
  export let text_size = 1;
  $: isBandwidth = typeof $yScale.bandwidth === "function";

  $: tickVals = Array.isArray(ticks)
    ? ticks
    : isBandwidth
    ? $yScale.domain()
    : $yScale.ticks(ticks);
</script>

<g class="axis y-axis" transform="translate({-$padding.left}, 0)">
  {#each tickVals as tick, i}
    <g
      class="tick tick-{tick}"
      transform="translate({$xRange[0]}, {$yScale(tick) +
        (isBandwidth ? $yScale.bandwidth() / 2 : 0)})"
    >
      {#if gridlines !== false}
        <line x2="100%" y1="{yTick}" y2="{yTick}"></line>
      {/if}
      <text
        x="{xTick}"
        y="{yTick}"
        dx="{textAnchor == 'end' ? dxTick + spacing : dxTick}"
        dy="{dyTick + 8}"
        font-size="{text_size}em"
        style="text-anchor:{textAnchor};"
      >
        {formatTick(tick)}
        {#if label && i === tickVals.length - 1}{label}{/if}
      </text>
    </g>
  {/each}
</g>

<style>
  /* .tick {
    font-size: 0.75em;
  }
  .tick:first-of-type {
    display: none;
  }
  .tick line {
    stroke: var(--default);
    stroke-dasharray: 2;
    stroke-opacity: 0.33;
  }
  .tick text {
    fill: var(--fg);
  }
  .tick.tick-0 line {
    stroke-dasharray: 0;
  } */
</style>
