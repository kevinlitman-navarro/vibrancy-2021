<script>
  import { LayerCake, Svg, Html, flatten } from "layercake";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import YearSlider from "./YearSlider.svelte";
  import Tooltip from "./Tooltip.svelte";
  import Annotation from "./Annotation.svelte";
  import Bars from "./Bars.svelte";
  import { data } from "../stores/vibrancy.js";
  import { global_year } from "../stores/vibrancy.js";
  import { onMount } from "svelte";
  import { group, mean, ascending, sum, descending, filter } from "d3-array";
  import { stack } from "d3-shape";
  import { scaleBand, scaleOrdinal } from "d3-scale";
  import { variables } from "../stores/vibrancy.js";

  let mounted = false;
  let data_2020;
  let usable_country_cut;
  let country_cut;
  let current_key;
  const xKey = "country_name";
  const yKey = [0, 1];
  const zKey = "key";
  const metric_endpoint = "_weighted";
  const pillar_endpoint = "average";
  let updated_key;
  let get_averages = [];

  const seriesNames = ["research_share", "economy_share", "society_share"];

  const seriesColors = ["#3a8dc7", "#249499", "#9d5da3"];
  let stackData;
  let series;

  let country_names = [];

  let updateCountryData = () => {
    country_cut = Array.from(
      group($data, (d) => d.CountryName),
      ([country_name, metadata]) => ({
        country_name,
        metadata: metadata.map((v) => ({
          ...v,
        })),
        research_average: 1,
        economy_average: 1,
        society_average: 1,
        total_average: 1,
        global_year: $global_year,
      })
    );
    console.log(country_cut);
    stackData = stack().keys(seriesNames);
    series = stackData(country_cut);
  };

  let updateWeights = () => {
    country_cut.forEach((d) => {
      $variables.forEach((v) => {
        get_averages = [];
        if (v.metric_name == "Research and Development") {
          v.metadata.forEach((x) => {
            d.metadata.forEach((y) => {
              try {
                if ($global_year == y.PublishYear) {
                  current_key = x.shortname_raw.concat(metric_endpoint);
                  y[current_key] = y[x.shortname_raw] * x.multiplier;

                  current_key = x.shortname_scaled.concat(metric_endpoint);
                  y[current_key] = y[x.shortname_scaled] * x.multiplier;

                  get_averages.push(y[x.shortname_scaled] * x.multiplier);
                }
              } catch (error) {}
            });
          });
          d.research_average = mean(get_averages);
          d["research_average_weighted"] = d.research_average * v.multiplier;
        } else if (v.metric_name == "Economy") {
          d["economy_average_weighted"] = d.economy_average * v.multiplier;
          v.metadata.forEach((x) => {
            d.metadata.forEach((y) => {
              try {
                if ($global_year == y.PublishYear) {
                  current_key = x.shortname_raw.concat(metric_endpoint);
                  y[current_key] = y[x.shortname_raw] * x.multiplier;

                  current_key = x.shortname_scaled.concat(metric_endpoint);
                  y[current_key] = y[x.shortname_scaled] * x.multiplier;
                  get_averages.push(y[x.shortname_scaled] * x.multiplier);
                }
              } catch (error) {}
            });
          });
          d.economy_average = mean(get_averages);
          d["economy_average_weighted"] = d.economy_average * v.multiplier;
        } else if (v.metric_name == "Society") {
          d["society_average_weighted"] = d.society_average * v.multiplier;
          v.metadata.forEach((x) => {
            d.metadata.forEach((y) => {
              try {
                if ($global_year == y.PublishYear) {
                  current_key = x.shortname_raw.concat(metric_endpoint);
                  y[current_key] = y[x.shortname_raw] * x.multiplier;

                  current_key = x.shortname_scaled.concat(metric_endpoint);
                  y[current_key] = y[x.shortname_scaled] * x.multiplier;
                  get_averages.push(y[x.shortname_scaled] * x.multiplier);
                }
              } catch (error) {}
            });
          });
          d.society_average = mean(get_averages);
          d["society_average_weighted"] = d.society_average * v.multiplier;
        }
      });
      d.total_sum = sum([
        d.society_average_weighted,
        d.economy_average_weighted,
        d.research_average_weighted,
      ]);
      d.total_average = mean([
        d.society_average_weighted,
        d.economy_average_weighted,
        d.research_average_weighted,
      ]);

      d.pillars_used = 0;
      if (d.society_average_weighted) {
        d.pillars_used += +1;
      }
      if (d.economy_average_weighted) {
        d.pillars_used += +1;
      }
      if (d.research_average_weighted) {
        d.pillars_used += +1;
      }

      country_cut.forEach((d) => {
        for (let x of [
          "society_average_weighted",
          "economy_average_weighted",
          "research_average_weighted",
        ]) {
          if (!d[x]) {
            d[x] = 0;
          }
        }
      });

      d.society_share = d.society_average_weighted / d.pillars_used;
      d.economy_share = d.economy_average_weighted / d.pillars_used;
      d.research_share = d.research_average_weighted / d.pillars_used;

      country_cut.forEach((d) => {
        for (let x of ["society_share", "economy_share", "research_share"]) {
          if (!d[x]) {
            d[x] = 0;
          }
        }
      });
    });

    usable_country_cut = country_cut.filter((d) => {
      return (
        Array.from(d.metadata.map((x) => x.PublishYear)).indexOf($global_year) >
        0
      );
    });
    usable_country_cut.sort((a, b) =>
      ascending(a.total_average, b.total_average)
    );

    country_names = Array.from(usable_country_cut.map((d) => d.country_name));

    stackData = stack().keys(seriesNames);
    series = stackData(usable_country_cut);
    if (!data_2020 && $global_year == 2020) {
      data_2020 = series;
      console.log(data_2020);
    }

    console.log(flatten(series));
  };

  let current_x;
  let current_y;
  let show;
  const global_axis_position = 0;
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
    updateWeights();
    mounted = true;
  });

  $: $global_year, updateCountryData(), updateWeights();
  $: $variables, updateWeights();
</script>

{#if mounted}
  <div class="chart-container shadow border-left-primary">
    <div class="chart-inner">
      <div class="upper">
        <div class="title-container">
          <h1 class="primary-title">{$global_year} Global Vibrancy Ranking</h1>
          <h3 class="secondary-title">
            Weighted Index Scores in <span class="research"
              >Research and Development</span
            >, <span class="economy"> Economy</span> and
            <span class="society">Society</span>
          </h3>
        </div>
        <div class="slider">
          <YearSlider year="{$global_year}" name="global_year_slider" />
        </div>
      </div>
      <LayerCake
        y="{(d) => d.data[xKey]}"
        x="{yKey}"
        z="{zKey}"
        yScale="{scaleBand().paddingInner([0.05]).round(true)}"
        yDomain="{country_names}"
        zScale="{scaleOrdinal()}"
        zDomain="{seriesNames}"
        zRange="{seriesColors}"
        flatData="{flatten(series)}"
        data="{series}"
        padding="{{ top: 0, right: 0, bottom: 20, left: 140 }}"
      >
        <Svg>
          <AxisX axis_position="{global_axis_position}" />
          <AxisY textAnchor="end" spacing="136" text_size="" />
        </Svg>
        <Html>
          <Annotation content="Click a bar to visit that country's profile" />
          <!-- <Tooltip
            type="global"
            x="{current_x}"
            y="{current_y}"
            show_tooltip="{show}"
          /> -->
        </Html>
        <Svg>
          <Bars
            additional_data="{country_cut}"
            stacked="{true}"
            on:message="{updateTooltip}"
          />
        </Svg>
      </LayerCake>
    </div>
    <!-- <div class="fade"></div> -->
  </div>
{/if}

<style>
  .chart-container {
    width: 100%;
    height: 100vh;
    background-clip: border-box;
    border: 1px solid #e3e6f0;
    border-radius: 0.35rem;
    overflow-y: scroll;
    overflow-x: hidden;
    pointer-events: all;
  }

  .chart-inner {
    width: 100%;
    height: 150vh;
    padding: 1.25rem;
    pointer-events: all;
  }

  .upper {
    display: flex;
    position: sticky;
    direction: column;
    justify-content: space-between;
    align-items: baseline;
  }

  .shadow {
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
  }

  .border-left-primary {
    border-left: 0.25rem solid #a3d2f8 !important;
  }

  .fade {
    width: 100%;
    /* margin: 0 auto; */
    /* transform: translate(-10%, 1%); */
    height: 13.5rem;
    background: linear-gradient(0deg, #ffffff 20%, rgba(254, 251, 247, 0) 100%);
    position: absolute;
    top: 150vh;
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
</style>
