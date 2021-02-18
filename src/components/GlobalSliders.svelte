<script>
  import Slider from "./Slider.svelte";
  import Collapse from "./Collapse.svelte";
  import { variables } from "../stores/vibrancy.js";
  import { scaleOrdinal } from "d3-scale";
  const seriesNames = ["Reseach and Development", "Economy", "Inclusion"];
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
  let research_fix = {
    "Research and Development": "Research",
  };
  let clicked = false;
  let research_clicked = false;
  let economy_clicked = false;
  let inclusion_clicked = false;
  let which_clicked = null;
  let isInt = (n) => {
    return parseInt(n) === n;
  };
</script>

<div class="overall">
  {#if $variables}
    {#each $variables as d}
      <div
        class="container"
        on:click="{() => {
          if (d.metric_name == 'Research and Development') {
            research_clicked = !research_clicked;
            economy_clicked = false;
            inclusion_clicked = false;
            console.log(research_clicked);
          } else if (d.metric_name == 'Economy') {
            economy_clicked = !economy_clicked;
            research_clicked = false;
            inclusion_clicked = false;
          } else if (d.metric_name == 'Inclusion') {
            inclusion_clicked = !inclusion_clicked;
            economy_clicked = false;
            research_clicked = false;
          }
        }}"
      >
        {#if d.metric_name == "Research and Development"}
          <p style="color:{scale(d.metric_name)};" class="title">
            {research_fix[d.metric_name]}
          </p>
        {:else}
          <p style="color:{scale(d.metric_name)};" class="title">
            {d.metric_name}
          </p>
        {/if}
        <div class="slider">
          <Slider
            variable="{d.metric_name}"
            name="{d.metric_name}"
            multiplier="{d.multiplier}"
            on:message="{updatePillar}"
          />
        </div>

        <Collapse
          headerText="See individual metrics"
          color="{scale(d.metric_name)}"
          name="{d.metric_name}"
        >
          <div
            class="collapsed-sliders"
            headerText="{d.metric_name}"
            color="{scale(d.metric_name)}"
            style="overflow-y:{d.metric_name == 'Inclusion'
              ? 'visible'
              : 'scroll'}"
          >
            <div class="column one">
              {#each d.metadata as v, i}
                {#if isInt(i / 2)}
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
                {/if}
              {/each}
            </div>

            <div class="column two">
              {#each d.metadata as v, i}
                {#if !isInt(i / 2)}
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
                {/if}
              {/each}
            </div>
          </div>
        </Collapse>
      </div>
    {/each}
  {/if}
</div>

<style>
  .collapsed-sliders {
    width: 100%;
    margin-top: 0rem;
    display: flex;
    overflow-x: visible;
    overflow-y: scroll;
    min-height: 140px;
    height: 100%;
    max-height: 160px;
    padding-top: 0.2rem;
    padding-right: 0.4rem;
    padding-bottom: 4rem;
  }

  .column {
    flex: 50%;
  }

  .one {
    margin-right: 5px;
  }

  .two {
    margin-left: 5px;
  }

  .overall {
    overflow: visible;
    display: inline-block;
  }
  .container {
    display: flex;
    margin: 0;
    overflow: visible;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    /* pointer-events: none; */
  }

  /* .container:active {
    display: none;
  } */
  .title {
    max-width: 150px;
    margin: 0;
    width: 120px;
    font-size: 1.3rem;
    margin-right: 1rem;
    line-height: 1.2;
  }

  .slider {
    position: relative;
    align-self: center;
  }

  .pillar {
    position: relative;
    display: flex;
    margin-bottom: 1rem;
  }

  .pillar {
  }
</style>
