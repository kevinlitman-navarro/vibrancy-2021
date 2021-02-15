<script>
  import { LayerCake, Svg } from "layercake";
  import { onMount } from "svelte";
  import {
    data,
    variables,
    country,
    temporal_metric_1,
    temporal_metric_2,
    ranked_metric,
  } from "../stores/vibrancy.js";
  import codebook from "../data/demo/codebook.csv";

  import Line from "./Line.svelte";
  import Area from "./Area.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Dropdown from "./Dropdown.svelte";
  let chart_values1;
  let chart_values2;
  let country_cut;
  let temp;
  import { ascending } from "d3-array";

  const xKey = "year";
  const yKey = "value";
  let variable_names;
  let display_names;
  let mounted = false;

  let updateLines1 = () => {
    chart_values1 = [];
    country_cut = $data.filter((d) => {
      return d.CountryName == $country;
    });
    country_cut.forEach((d) => {
      temp = {};
      temp["variable"] = $temporal_metric_1;
      temp["country_name"] = d.CountryName;
      temp["value"] = d[$temporal_metric_1];
      temp["year"] = d.PublishYear;
      if (temp.year && temp.value && temp.value != "-") {
        chart_values1.push(temp);
      }
    });
    chart_values1.sort((a, b) => ascending(a.year, b.year));
    console.log(chart_values1);
  };

  let updateLines2 = () => {
    chart_values2 = [];
    country_cut = $data.filter((d) => {
      return d.CountryName == $country;
    });

    country_cut.forEach((d) => {
      temp = {};
      temp["variable"] = $temporal_metric_2;
      temp["country_name"] = d.CountryName;
      temp["value"] = d[$temporal_metric_2];
      temp["year"] = d.PublishYear;
      if (temp.year && temp.value && temp.value != "-") {
        chart_values2.push(temp);
      }
    });
    chart_values2.sort((a, b) => ascending(a.year, b.year));
    console.log(chart_values2);
  };

  let getVariableNames = () => {
    variable_names = [];
    display_names = [];
    country_cut = $data.filter((d) => {
      return d.CountryName == $country;
    });
    $variables.forEach((d) => {
      d.metadata.forEach((v) => {
        if (
          country_cut.slice(-1)[0][v.shortname_raw] &&
          country_cut.slice(-1)[0][v.shortname_raw]
        ) {
          variable_names.push(v.shortname_raw);
        }
      });
    });
    variable_names.forEach((d) => {
      display_names.push(
        codebook.find((x) => x.shortname_raw == d).metric_name
      );
    });
    console.log(display_names);
  };

  onMount(() => {
    getVariableNames();
    $temporal_metric_1 = variable_names[0];
    $temporal_metric_2 = variable_names[1];
    console.log($data);
    updateLines1();
    updateLines2();

    mounted = true;
  });

  $: $temporal_metric_1, updateLines1();
  $: $temporal_metric_2, updateLines2();
  $: $country, getVariableNames();
</script>

<div class="overall-container">
  <div class="chart-container">
    <div class="dropdown">
      <p class="annotation">SELECT A METRIC</p>
      <Dropdown
        items="{variable_names}"
        metric1="true"
        placeholder="{variable_names[0]}"
      />
    </div>
    {#if $temporal_metric_1}
      <div class="title-container">
        <h3>
          {codebook.find((d) => d.shortname_raw == $temporal_metric_1)
            .metric_name} in {$country}, {chart_values1[0]
            .year}-{chart_values1.slice(-1)[0].year}
        </h3>
      </div>
    {/if}
    <LayerCake
      padding="{{ right: 10, bottom: 20, left: 25 }}"
      x="{xKey}"
      y="{yKey}"
      yDomain="{[0, null]}"
      data="{chart_values1}"
    >
      <Svg>
        <AxisX />
        <AxisY ticks="{4}" />
        <Line />
        <Area />
      </Svg>
    </LayerCake>
  </div>
  <div class="chart-container">
    <div class="dropdown">
      <p class="annotation">SELECT A METRIC</p>
      <Dropdown
        items="{variable_names}"
        metric2="true"
        placeholder="{variable_names.slice(-1)[0]}"
      />
    </div>
    {#if $temporal_metric_2}
      <div class="title-container">
        <h3>
          {codebook.find((d) => d.shortname_raw == $temporal_metric_2)
            .metric_name} in {$country}, {chart_values2[0]
            .year}-{chart_values2.slice(-1)[0].year}
        </h3>
      </div>
    {/if}
    <LayerCake
      padding="{{ right: 10, bottom: 20, left: 25 }}"
      x="{xKey}"
      y="{yKey}"
      yDomain="{[0, null]}"
      data="{chart_values2}"
    >
      <Svg>
        <AxisX />
        <AxisY ticks="{4}" />
        <Line />
        <Area />
      </Svg>
    </LayerCake>
  </div>
</div>

<style>
  .chart-container {
    width: 50%;
    height: 50vh;
  }

  .overall-container {
    display: flex;
    direction: column;
    justify-content: center;
    width: 100%;
  }

  .annotation {
    font-weight: bold;
  }
</style>
