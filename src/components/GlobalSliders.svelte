<script>
  import Slider from "./Slider.svelte";
  import Collapse from "./Collapse.svelte";
  import { variables } from "../stores/vibrancy.js";
  import { scaleOrdinal } from "d3-scale";
  const seriesNames = ["Reseach and Development", "Economy", "Society"];
  const seriesColors = ["#3a8dc7", "#249499", "#9d5da3"];
  const scale = scaleOrdinal().domain(seriesNames).range(seriesColors);

  let updatePillar = (event) => {
    console.log("updating");
    console.log($variables);
    $variables.find((d) => d.metric_name == event.detail.name).multiplier =
      event.detail.multiplier;
    $variables = $variables;
  };

  // x.find((z) => (z.id = event.detail.id)).multiplier =
  //         event.detail.mulitplier;

  let updateVariable = (event) => {
    console.log("updating");
    console.log($variables);
    $variables.forEach((d) => {
      d.metadata.forEach((x) => {
        if (x.id == event.detail.id) {
          x.multiplier = event.detail.multiplier;
        }
      });
    });
    $variables = $variables;
  };
</script>

<div class="overall">
  {#if $variables}
    {#each $variables as d}
      <div class="container">
        <div class="collapse">
          <Collapse headerText="{d.metric_name}" color="{scale(d.metric_name)}">
            {#each d.metadata as v}
              <div class="slider-container">
                <div class="slider pillar">
                  <Slider
                    variable="{v.metric_name}"
                    name="{v.metric_name}"
                    id="{v.id}"
                    multiplier="{v.multiplier}"
                    on:message="{updateVariable}"
                  />
                </div>
              </div>
            {/each}
          </Collapse>
        </div>
        <div class="slider">
          <Slider
            variable="{d.metric_name}"
            name="{d.metric_name}"
            multiplier="{d.multiplier}"
            on:message="{updatePillar}"
          />
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .overall {
    display: inline-block;
  }
  .container {
    display: flex;
    align-items: center;
    margin: 0;
  }
  .collapse {
    margin-right: 1em;
  }

  .slider {
    position: relative;
  }

  .pillar {
    position: relative;
  }

  .slider-container {
    position: relative;
  }
</style>
