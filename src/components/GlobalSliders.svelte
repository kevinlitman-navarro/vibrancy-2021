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
        <p style="color:{scale(d.metric_name)};" class="title">{d.metric_name}</p>
        <div class="slider">
          <Slider
            variable="{d.metric_name}"
            name="{d.metric_name}"
            multiplier="{d.multiplier}"
            on:message="{updatePillar}"
          />
        </div>

        <Collapse headerText="{d.metric_name}" color="{scale(d.metric_name)}">

          <div class="collapsed-sliders" headerText="{d.metric_name}" color="{scale(d.metric_name)}">

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

          </div>

        </Collapse>


      </div>
    {/each}
  {/if}
</div>

<style>

  .collapsed-sliders {
    width:100%;
    margin-top:1rem;
    overflow-y:scroll;
    max-height: 300px;
    padding:1rem;
  }

  .overall {
    display: inline-block;
  }
  .container {
    display: flex;
    margin: 0;
    flex-wrap:wrap;
    margin-bottom:1rem;

  }
  .title {
    max-width:150px;
    margin:0;
    width:120px;
    font-size:1.3rem;
    margin-right:1rem;
    line-height: 1.2;
  }

  .slider {
    position: relative;
    align-self:center;
  }

  .pillar {
    position: relative;
    display:flex;
    margin-bottom:1rem;
  }

  .pillar {

  }


</style>
