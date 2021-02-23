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
    <Collapse headerText="Methodology and Metrics" type="header">
      <div class="upper">
        <h2>Source</h2>
        <p class="description">
          The data is collected by AI Index using diverse datasets that are
          referenced in the 2020 AI Index Report chapters.
        </p>
        <h2>Methodology</h2>
        <p>
          <b>Step 1:</b> Obtain, harmonize, and integrate data on individual
          attributes across countries and time.<br /><b>Step 2:</b> Use Min-Max
          Scalar to normalize each country-year specific indicator between
          0-100.<br /><b>Step 3:</b>
          Take arithmetic Mean per country-indicator for a given year.<br /><b
            >Step 4:</b
          > Build modular weighted Mean for available pillars and individual indicators.
        </p>
        <h2>Aggregate Measure</h2>
        <p>
          The AI Vibrancy Composite Index can be expressed in the following
          equation:
        </p>
        <p class="formula">
          <i>AI Vibrancy</i><sub>c,t</sub> = ( &Psi;<sub>pillar</sub>
          &times; [&Omega;<sub>c,t</sub> &times; &Psi;<sub>indicator</sub> ])
          &divide;
          <i>N</i>
        </p>
        <p>
          where <i>c</i> represents a country and <i>t</i> represents year,
          &Omega;<sub>c,t</sub> is the scaled (0-100) individual indicator,
          &Psi;<sub>indicator</sub> is the weight assigned to individual
          indicators, &Psi;<sub>pillar</sub> is the weight specific to one of
          the three high-level pillars and <i>N</i> is the number of indicators available
          for a given country for a specific year.
        </p>
        <h2>Normalization</h2>
        <p>
          To adjust for differences in units of measurement and ranges of
          variation, all 22 variables were normalized into the [0, 100] range,
          with higher scores representing better outcomes. A minimum-maximum
          normalization method was adopted, given the minimum and maximum values
          of each variable respectively. Higher values indicate better outcomes.
          The normalization formula is:
        </p>
        <p class="formula">
          <i>Min—max scalar</i> (<i>MS</i>100) = 100 &times; (((<i>value</i>)
          &minus; (<i>min</i>)) &divide; ((<i>max</i>) &minus; (<i>min</i>)))
          <!-- <span class="supsub"
            ><sup>(value) - (min)</sup><sub>(max) - (min)</sub></span
          > -->
        </p>
        <h2>Coverages and Nuances</h2>
        <p>
          A threshold of 73% coverage was chosen to select the final list of
          countries based on an average of available data between 2015-2020.
          Russia and South Korea were added manually due to their growing
          importance in the global AI landscape, even though they did not pass
          the 73% threshold.
        </p>
        <h1>Metric Definitions</h1>
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
        <div class="heatmap shadow border-left-primary">
          <div class="chart-upper">
            <div class="title-container">
              <h1 class="primary-title">
                {$methodology_year} AI Vibrancy Matrix
              </h1>
              <h3 class="secondary-title">
                Normalized Score (0-100) of 22 Metrics
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
    width: 100%;
    max-width: 1060px;
    padding: 0 10px;
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

  .supsub {
    display: inline-block;
  }

  .supsub sup,
  .supsub sub {
    position: relative;
    display: block;
    font-size: 0.5em;
    line-height: 1.2;
  }

  .supsub sub {
    top: 0.3em;
  }

  sub {
    font-style: italic;
  }

  .formula {
    font-size: 20px;
    line-height: 2.5rem;
    text-indent: 2rem;
    font-weight: bold;
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

  h1 {
    color: var(--dark-blue);
  }

  .title-container {
    display: inline;
  }

  .primary-title {
    margin-bottom: 0;
    padding-bottom: 0;
    color: black;
  }

  .secondary-title {
    margin-top: 0;
    padding-top: 0px;
  }

  .heatmap {
    margin: 0 auto;
    min-height: 720px;
    height: 98vh;
    position: relative;
  }

  .slider {
    margin-left: 2rem;
  }

  @media only screen and (max-width: 1080px) {
    .overall-container {
      padding: 0 40px;
    }
  }

  @media screen and (max-width: 1080px) {
    .heatmap {
      overflow: scroll;
    }
  }

  @media screen and (max-width: 768px) {
    .primary-title {
      line-height: 1.6rem;
    }
  }

  @media screen and (max-width: 415px) {
    .lower {
      display: none;
    }
  }
</style>
