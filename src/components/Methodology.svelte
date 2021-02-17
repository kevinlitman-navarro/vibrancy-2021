<script>
  import { variables, data, methodology_year } from "../stores/vibrancy.js";
  import { onMount } from "svelte";
  import YearSlider from "./YearSlider.svelte";
  import Collapse from "./Collapse.svelte";
  import Table from "./Table.svelte";
  import { group } from "d3-array";
  let variable_names = [];
  let temp_variable;
  let table_values;
  let filtered;
  let temp;
  let mounted = false;

  let updateTableValues = () => {
    filtered = $data.filter((d) => {
      return d.PublishYear == $methodology_year;
    });
    filtered = filtered;
    table_values = [];
    filtered.forEach((d) => {
      temp = {};
      temp["country_name"] = d.CountryName;
      variable_names.forEach((v) => {
        temp[v.display_name] = d[v.variable_name];
      });
      table_values.push(temp);
    });
    table_values = table_values;
    // console.log(country_values);
    console.log($variables);
    // console.log(filtered);
  };

  onMount(() => {
    $variables.forEach((d) => {
      d.metadata.forEach((v) => {
        temp_variable = {};
        temp_variable["variable_name"] = v.shortname_raw;
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
    <Collapse headerText="Methodology and Data Dictionary" type="header">
      <div class="upper">
        <h1 class="section-header">Methodology and Data Dictionary</h1>
        <h2>Data Dictionary</h2>
        {#each $variables as v}
          <ul>
            <li>
              <Collapse headerText="{v.metric_name}">
                {#each v.metadata as d}
                  <li>{d.metric_name}: {d.Definition}</li>
                {/each}
              </Collapse>
            </li>
          </ul>
        {/each}
      </div>
      <div class="title-container">
        <h2>Export Data</h2>
        <YearSlider methodology="true" />
      </div>
      <div class="table">
        <Table
          data="{table_values}"
          keys="{Object.keys(table_values[0])}"
          mounted="{mounted}"
        />
      </div>
    </Collapse>
  </div>
{/if}

<style>
  .overall-container {
    width: 90%;
    margin: 0 auto;
    pointer-events: all;
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  .upper {
    width: 80%;
    margin: 0 auto;
  }

  .title-container {
    width: 80%;
    margin: 0 auto;
  }

  .table {
    width: 100%;
    margin: 0 auto;
  }

  .section-header {
  }
</style>
