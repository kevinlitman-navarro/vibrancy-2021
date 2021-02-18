<script>
  import { variables, data, methodology_year } from "../stores/vibrancy.js";
  import { onMount } from "svelte";
  import { LayerCake, Svg, Html } from "layercake";
  import YearSlider from "./YearSlider.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Collapse from "./Collapse.svelte";
  import Heatmap from "./Heatmap.svelte";
  import Table from "./Table.svelte";
  import { group } from "d3-array";
  let variable_names = [];
  let temp_variable;
  let table_values_scaled;
  let table_values_raw;
  let filtered;
  let temp;
  let mounted = false;

  let updateTableValues = () => {
    filtered = $data.filter((d) => {
      return d.PublishYear == $methodology_year;
    });
    filtered = filtered;
    table_values_scaled = [];
    table_values_raw = [];
    filtered.forEach((d) => {
      temp = {};
      temp["country_name"] = d.CountryName;
      variable_names.forEach((v) => {
        temp[v.display_name] = d[v.variable_name_raw];
      });
      table_values_raw.push(temp);
    });
    table_values_raw = table_values_raw;

    filtered.forEach((d) => {
      temp = {};
      temp["country_name"] = d.CountryName;
      variable_names.forEach((v) => {
        temp[v.display_name] = d[v.variable_name_scaled];
      });
      table_values_scaled.push(temp);
    });
    table_values_scaled = table_values_scaled;
    // console.log(country_values);
    console.log($variables);
    // console.log(filtered);
  };

  onMount(() => {
    $variables.forEach((d) => {
      d.metadata.forEach((v) => {
        temp_variable = {};
        temp_variable["variable_name_raw"] = v.shortname_raw;
        temp_variable["variable_name_scaled"] = v.shortname_scaled;
        temp_variable["pillar"] = v.pillar_1;
        temp_variable["display_name"] = v.metric_name;
        variable_names.push(temp_variable);
      });
    });
    updateTableValues();
    mounted = true;
  });

  $: $methodology_year, updateTableValues();
  //   $: variable_names, updateTableValues();
</script>

{#if mounted}
  <div class="overall-container">
    <Collapse headerText="Methodology and Data" type="header">
      <div class="upper">
        <p class="description">
          Methodology write up for ranking here -- "Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum."
        </p>
        <h1>Data Dictionary</h1>
        <p>Read about the variables included in the 2021 AI Index Report.</p>
        {#each $variables as v}
          <ul>
            <li>
              <Collapse headerText="{v.metric_name}" type="header-small">
                {#each v.metadata as d}
                  <li class="metric">
                    <b>{d.metric_name}</b>: {d.Definition}
                    <i>Source: {d.source}</i>
                  </li>
                {/each}
              </Collapse>
            </li>
          </ul>
        {/each}
      </div>
      <div class="lower">
        <div class="title-container">
          <h1>View all of the data</h1>
        </div>
        <p>
          Heatmap provides bird's eye view of AI Vibrancy while showing the
          granularity of each metric.
        </p>
        <div class="heatmap shadow border-left-primary">
          <div class="chart-upper">
            <div class="title-container">
              <h1 class="primary-title">
                {$methodology_year} AI Vibrancy Matrix
              </h1>
              <h3 class="secondary-title">
                Normalized Score (0-100) of 24 Metrics
              </h3>
            </div>
            <div class="slider">
              <YearSlider methodology="true" />
            </div>
          </div>
          <Heatmap
            data="{table_values_raw}"
            values_raw="{table_values_raw}"
            values_scaled="{table_values_scaled}"
            countries="{table_values_raw.map((d) => d.country_name)}"
            keys="{variable_names.map((d) => d.display_name)}"
            mounted="{mounted}"
          />
        </div>
      </div>
    </Collapse>
  </div>
{/if}

<style>
  .overall-container {
    width: calc(100% - 25px);
    max-width: 1100px;
    margin: 0 auto;
    pointer-events: all;
    margin-top: 2rem;
    margin-bottom: 4rem;
    cursor: initial;
  }

  .shadow {
    box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
  }

  .border-left-primary {
    border-left: 0.25rem solid #a3d2f8 !important;
  }

  .metric {
    margin-left: 1rem;
    font-weight: 500;
    font-family: "Source Sans Pro";
  }

  p {
    font-weight: 500;
    font-family: "Source Sans Pro";
  }

  .description {
    width: 100%;
    font-weight: 500;
    font-family: "Source Sans Pro";
  }
  .chart-upper {
    display: flex;
    justify-content: space-between;
    padding-left: 1em;
    padding-right: 2em;
    align-items: center;
    margin-bottom: 1rem;
  }

  .upper {
    width: 90%;
    cursor: initial;
  }

  .lower {
    width: 100%;
    cursor: initial;
  }

  .title-container {
    display: inline;
  }

  .primary-title {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .secondary-title {
    margin-top: 0;
    padding-top: 0px;
  }

  .heatmap {
    margin: 0 auto;
    height: 98vh;
    position: relative;
  }

  .slider {
    margin-left: 2rem;
  }

  .table {
    width: 100%;
    margin: 0 auto;
  }
</style>
