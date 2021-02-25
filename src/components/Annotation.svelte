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
  let mounted = false;
  onMount(() => {
    screenWidth = window.innerWidth;
    mounted = true;
  });

  import { getContext, onMount, createEventDispatcher } from "svelte";
  let screenWidth;
  let first;
  console.log(additional_data);
  console.log($xScale.range());

  $: if (type == "national") {
    first = $data
      .filter((d) => {
        return d.value <= 60;
      })
      .slice(-1)[0];
    if (!first) {
      first = $data[0];
    }
    // else if (
    //   $data.filter((d) => {
    //     return d.value <= 60;
    //   }).length == 1
    // ) {
    //   first = $data.slice(-2)[0];
    // }
  }

  $: if (type == "rank") {
    console.log($data);
    console.log($xScale.range());
    console.log(
      $data.filter((d) => {
        return d.value <= $xScale.domain()[1] / 2;
      })
    );
    first = $data
      .filter((d) => {
        return d.value <= $xScale.domain()[1] / 2;
      })
      .slice(-1)[0];
    console.log(first);
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
  {#if type == "national"}
    <div
      class="annotation-container"
      style="top:{$yGet(first)}px;left:{$xGet(first) + padding}px;"
    >
      <span class="annotation"
        >Click a bar to see where {$country} ranks globally on that metric</span
      >
    </div>
  {:else if type == "rank"}
    {#if mounted}
      {#if screenWidth <= 1080}
        <div
          class="annotation-container"
          style="top:{$yGet(first)}px;left:{0}px;width:100px;text-align:left;"
        >
          <span style="text-align:right" class="annotation">{content}</span>
        </div>
      {:else}
        <div
          class="annotation-container"
          style="top:{$yGet(first)}px;left:{$xScale.range()[1] /
            2}px;transform:translate({-$xGet(
            first
          )}px,0px);width:100px;text-align:right;"
        >
          <span style="text-align:right" class="annotation">{content}</span>
        </div>
      {/if}
    {/if}
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
