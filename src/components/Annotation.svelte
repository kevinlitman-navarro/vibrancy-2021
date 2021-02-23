<script>
  export let content;
  export let top;
  export let left;
  export let type;
  export let padding = 5;
  export let additional_data;
  import { country } from "../stores/vibrancy.js";
  const {
    data,
    xGet,
    flatData,
    // additional_data,
    xScale,
    yGet,
    zGet,
    yScale,
    custom,
    y,
  } = getContext("LayerCake");
  import { getContext, onMount, createEventDispatcher } from "svelte";

  let first;
  console.log(additional_data);
  console.log($xScale.range());

  $: if (type != "global") {
    first = $data.filter((d) => {
      return d.value >= 40;
    })[0];
    if (!first) {
      first = $data.slice(-1)[0];
    }
  }

  $: if (type == "rank") {
    console.log($data);
    console.log($xScale.range());
    first = $data.find((d) => {
      return (d.country_name = $country);
    });
    console.log(first);
    content = first.country_name;
    console.log($xScale(first.value));
  }

  $: if (type == "global" && additional_data) {
    console.log(additional_data);
    console.log($xScale.domain());
    first = additional_data.filter((d) => {
      return d.share_sum >= $xScale.domain()[1] / 2;
    })[0];
    if (additional_data.indexOf(first) == 25) {
      first = additional_data[24];
    }
    console.log(first);
  }
</script>

{#if first}
  {#if type != "global" && type != "rank"}
    <div
      class="annotation-container"
      style="top:{$yGet(first)}px;left:{$xGet(first) + padding}px;"
    >
      <span class="annotation"
        >Click a bar to see where {$country} ranks globally on that metric</span
      >
    </div>
  {:else if type == "rank"}
    <div
      class="annotation-container"
      style="top:{$yGet(
        first
      )}px;left:{$xScale.range()[1]}px;transform:translate({-$xGet(
        first
      )}px,0px)"
    >
      <span style="text-align:right" class="annotation">{content}</span>
    </div>
  {:else}
    <div
      class="annotation-container"
      style="top:{$yScale(first.country_name)}px;left:{$xScale(
        first.share_sum
      ) + padding}px;"
    >
      <span class="annotation">{content}</span>
    </div>
  {/if}
{/if}

<style>
  .annotation-container {
    max-width: 8rem;
    /* top: 20vh;
    left: 40vw; */
    position: absolute;
    z-index: 2;
  }

  span {
    font-family: var(--source);
  }
</style>
