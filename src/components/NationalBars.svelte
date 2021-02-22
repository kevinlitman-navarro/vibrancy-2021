<script>
  import { LayerCake, Svg, Html, flatten } from "layercake";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Annotation from "./Annotation.svelte";
  import Tooltip from "./Tooltip.svelte";
  import YearSlider from "./YearSlider.svelte";
  import Bars from "./Bars.svelte";
  import {
    data,
    national_year,
    country,
    variables,
    number_of_metrics,
    ranked_metric,
    temporal_metric_1,
    temporal_metric_2,
  } from "../stores/vibrancy.js";

  import { onMount, createEventDispatcher } from "svelte";
  import { group, mean, ascending, sum, descending, filter } from "d3-array";
  import { stack } from "d3-shape";
  import { scaleBand, scaleOrdinal, scaleLinear } from "d3-scale";
  let text_sorted;
  let mounted = false;
  let country_cut;
  let single_country_cut;
  const xKey = "value";
  const yKey = "display";
  const zKey = "pillar";
  let variable_names = [];
  let chart_values = [];
  let temp_variable;
  let temp;
  let ranked_data;
  let ranked_values;
  const dispatch = createEventDispatcher();
  import codebook from "../data/demo/codebook_2.csv";

  const seriesNames = ["Research and Development", "Economy", "Inclusion*"];

  const seriesColors = ["#3a8dc7", "#249499", "#9d5da3"];

  let updateCountryData = () => {
    variable_names = [];
    chart_values = [];
    single_country_cut = $data.find((d) => {
      return d.CountryName == $country && d.PublishYear == $national_year;
    });
    console.log(single_country_cut);

    $variables.forEach((d) => {
      d.metadata.forEach((v) => {
        if (
          single_country_cut[v.shortname_scaled] &&
          single_country_cut[v.shortname_scaled] != "-"
        ) {
          temp_variable = {};
          temp_variable["variable_name"] = v.shortname_scaled;
          temp_variable["variable_name_raw"] = v.shortname_raw;
          temp_variable["pillar"] = v.pillar_1;
          temp_variable["display_name"] = v.metric_name;
          variable_names.push(temp_variable);
        }
      });
    });

    $number_of_metrics = variable_names.length;

    variable_names.forEach((d) => {
      temp = {};
      temp["display"] = d.display_name
        .replace("Number of", "")
        .replace("per capita", "PC")
        .replace("AI ", "")
        .replace(" (Job Titles)", "")
        .replace("*", "");
      temp["pillar"] = d.pillar;
      temp["variable"] = d.variable_name;
      temp["value"] = single_country_cut[d.variable_name];
      chart_values.push(temp);
    });
    chart_values.sort((a, b) => ascending(a.value, b.value));
    console.log(chart_values);
    $ranked_metric = chart_values.slice(-1)[0].variable;
    // $temporal_metric_1 = chart_values.slice(-1)[0].variable;
    // $temporal_metric_2 = chart_values[0].variable;
  };

  let updateRankChart = () => {
    ranked_data = $data.filter((d) => {
      return d.PublishYear == $national_year;
    });
    console.log(ranked_data);
    ranked_values = [];
    ranked_data.forEach((d) => {
      temp = {};
      temp["country_name"] = d.CountryName;
      temp["variable"] = $ranked_metric;
      temp["value"] = d[$ranked_metric];
      if (temp.value && temp.value != "-") {
        ranked_values.push(temp);
      }
    });

    ranked_values.sort((a, b) => ascending(a.value, b.value));
    text_sorted = [...ranked_values].reverse();
    // ranked_values = text_sorted.sort((a, b) => ascending(a.value, b.value));
    // console.log(text_sorted[0], ranked_values[0]);
  };

  let current_x;
  let current_y;
  let show;
  let pillar;
  let type;
  let updateTooltip = (event) => {
    current_x = event.detail.current_x;
    current_y = event.detail.current_y;
    show = event.detail.show;
    type = event.detail.type;
  };

  onMount(() => {
    updateCountryData();
    mounted = true;
  });

  $: $national_year, updateCountryData(), updateRankChart();
  $: $ranked_metric, updateRankChart();
  $: $country, updateCountryData(), updateRankChart();
</script>

{#if mounted}
  <div class="overall-container">
    <div class="chart-container metric-container shadow border-left-primary">
      <div class="chart-inner">
        <div class="upper">
          <div class="title-container">
            <h1 class="primary-title">
              {$national_year} Vibrancy Ranking in {$country}
            </h1>

            <h3 class="secondary-title">
              Normalized Scores in <span class="research"
                >Research and Development</span
              >, <span class="economy"> Economy</span> and
              <span class="society">Society</span>
            </h3>
          </div>
          <div class="slider">
            <YearSlider year="{$national_year}" name="national_year_slider" />
          </div>
        </div>
        <div class="layercake">
          <LayerCake
            x="{xKey}"
            y="{yKey}"
            z="{zKey}"
            yScale="{scaleBand().paddingInner([0.05]).round(true)}"
            xDomain="{[0, 100]}"
            zScale="{scaleOrdinal()}"
            zDomain="{seriesNames}"
            zRange="{seriesColors}"
            yDomain="{chart_values.map((d) => d.display)}"
            data="{chart_values}"
            padding="{{ top: 0, right: 0, bottom: 20, left: 186 }}"
          >
            <Html pointerEvents="{false}">
              {#if type == "national"}
                <Tooltip
                  x="{current_x}"
                  y="{current_y}"
                  show_tooltip="{show}"
                />
              {/if}
              <Annotation
                content="Click a bar to see where a country ranks on that variable"
                top="200"
                left="500"
              />
            </Html>
            <Svg>
              <AxisX />
              <AxisY textAnchor="end" text_size=".8" spacing="180" />
            </Svg>
            <Svg>
              <Bars
                additional_data="{single_country_cut}"
                stacked="{false}"
                on:message="{updateTooltip}"
              />
            </Svg>
          </LayerCake>
        </div>
      </div>
    </div>
    <div class="chart-container rank-container shadow border-right-primary">
      <div class="chart-inner">
        <div class="title-container">
          <h2 class="rank-title">
            {codebook
              .find((d) => d.shortname_scaled == $ranked_metric)
              .metric_name.replace("*", "")}, {$national_year}
          </h2>
          <span class="rank-subhead"
            >Rank: {text_sorted.indexOf(
              text_sorted.find((d) => {
                return d.country_name == $country;
              })
            ) + 1} of {text_sorted.length} countries</span
          >
        </div>
        <div class="layercake">
          <LayerCake
            x="value"
            y="country_name"
            yScale="{scaleBand().paddingInner([0.05]).round(true)}"
            xDomain="{[0, null]}"
            yDomain="{ranked_values.map((d) => d.country_name)}"
            data="{ranked_values}"
            padding="{{ top: 0, right: 0, bottom: 20, left: 0 }}"
          >
            <Html pointerEvents="{false}">
              {#if type == "rank"}
                <Tooltip
                  type="rank"
                  x="{current_x}"
                  y="{current_y}"
                  show_tooltip="{show}"
                />
              {/if}
            </Html>
            <!-- <Svg>
          <AxisX />
          <AxisY />
        </Svg> -->

            <Svg>
              <Bars ranked="{true}" on:message="{updateTooltip}" />
            </Svg>
          </LayerCake>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .overall-container {
    display: flex;
    direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 85vh;
  }

  .upper {
    display: flex;
    position: sticky;
    direction: column;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 0rem;
  }
  .metric-container {
    width: 70%;
    height: 85vh;
    min-height: 960px;
  }

  .primary-title {
    padding-bottom: 0px;
    margin-bottom: 0px;
    margin-top: 0px;
    line-height: 1.9rem;
  }

  .rank-title {
    padding-bottom: 0.1rem;
    margin-top: 0.3rem;
  }

  .secondary-title {
    padding-bottom: 0px;
    margin-bottom: 0.4rem;
    margin-top: 0rem;
  }

  .chart-container {
    /* width: 100%; */
    height: 100%;
    min-height: 680px;
    background-clip: border-box;
    border: 1px solid #e3e6f0;
    border-radius: 0.35rem;
    pointer-events: all;
  }

  .chart-inner {
    width: 100%;
    height: 85vh;
    padding: 1.25rem;
    pointer-events: all;
  }

  .layercake {
    width: 100%;
    height: 70vh;
    min-height: 550px;
  }
  .rank-container {
    width: 25%;
    height: 85vh;
    line-height: 1.5em;
  }

  .shadow {
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
  }

  .border-left-primary {
    border-left: 0.25rem solid #a3d2f8 !important;
  }

  .border-right-primary {
    border-right: 0.25rem solid #a3d2f8 !important;
  }

  .research {
    color: var(--dark-blue);
  }

  .economy {
    color: var(--dark-green);
  }
  .society {
    color: var(--dark-plum);
  }

  @media only screen and (max-width: 768px) {
    .rank-container {
      display: none;
    }

    .metric-container {
      width: 100%;
    }

    .primary-title {
      line-height: 1.9rem;
    }
  }

  @media screen and (max-width: 1166px) {
    .chart-container {
      min-height: 720px;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 810px) {
    .chart-container {
      min-height: 770px;
    }
  }

  @media screen and (min-width: 400px) {
    .chart-container {
      min-height: 750px;
    }
  }
</style>
