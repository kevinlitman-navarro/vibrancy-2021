<script>
  import Slider from "./Slider.svelte";
  import Collapse from "./Collapse.svelte";
  import { variables } from "../stores/vibrancy.js";

  let updatePillar = (event) => {
    $variables.find((d) => d.metric_name == event.detail.name).multiplier =
      event.detail.multiplier;
  };

  // x.find((z) => (z.id = event.detail.id)).multiplier =
  //         event.detail.mulitplier;

  let updateVariable = (event) => {
    $variables.forEach((d) => {
      d.metadata.forEach((x) => {
        if (x.id == event.detail.id) {
          x.multiplier = event.detail.multiplier;
        }
      });
    });
  };
</script>

{#if $variables}
  {#each $variables as d}
    <span class="low">Low</span>
    <Slider
      variable="{d.metric_name}"
      name="{d.metric_name}"
      multiplier="{d.multiplier}"
      on:message="{updatePillar}"
    />
    <p class="high">High importance</p>
    <Collapse headerText="{d.metric_name}">
      {#each d.metadata as v}
        <Slider
          variable="{v.metric_name}"
          name="{v.metric_name}"
          id="{v.id}"
          multiplier="{v.multiplier}"
          on:message="{updateVariable}"
        />
      {/each}
    </Collapse>
  {/each}
{/if}

<style>
  .low {
    display: none;
  }

  .high {
    display: none;
  }

  .high:first-of-type {
    display: inline;
  }

  .low:first-of-type {
    display: inline;
  }
</style>
