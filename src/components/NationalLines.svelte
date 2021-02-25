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
    tooltip_text,
  } from "../stores/vibrancy.js";
  import { format } from "d3-format";
  import codebook from "../data/demo/codebook_3.csv";
  import Tooltip from "./Tooltip.svelte";
  import Line from "./Line.svelte";
  import Area from "./Area.svelte";
  import AxisX from "./AxisX.svelte";
  import Icon from "./helpers/Icon.svelte";
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
  let show1 = false;
  let show2 = false;

  let updateLines1 = () => {
    chart_values1 = [];
    console.log($temporal_metric_1);
    country_cut = $data.filter((d) => {
      return d.CountryName == $country;
    });
    country_cut.forEach((d) => {
      temp = {};
      temp["variable"] = codebook.find((v) => {
        return v.metric_name == $temporal_metric_1;
      }).shortname_raw;
      temp["pillar"] = codebook.find((d) => {
        return d.metric_name == $temporal_metric_1;
      }).pillar_1;
      temp["country_name"] = d.CountryName;
      temp["value"] =
        d[
          codebook.find((v) => {
            return v.metric_name == $temporal_metric_1;
          }).shortname_raw
        ];
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
    console.log($temporal_metric_2);
    country_cut = $data.filter((d) => {
      return d.CountryName == $country;
    });

    country_cut.forEach((d) => {
      temp = {};
      temp["variable"] = codebook.find((v) => {
        return v.metric_name == $temporal_metric_2;
      }).shortname_raw;
      temp["country_name"] = d.CountryName;
      temp["pillar"] = codebook.find((d) => {
        return d.metric_name == $temporal_metric_2;
      }).pillar_1;
      temp["value"] =
        d[
          codebook.find((v) => {
            return v.metric_name == $temporal_metric_2;
          }).shortname_raw
        ];
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
          country_cut.slice(-2)[0][v.shortname_raw] &&
          country_cut.slice(-1)[0][v.shortname_raw] != "-" &&
          country_cut.slice(-2)[0][v.shortname_raw] != "-"
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
    console.log(variable_names);
    $temporal_metric_1 = display_names[0];
    $temporal_metric_2 = display_names[1];
    console.log(display_names);
    console.log($temporal_metric_1);
  };

  function handleMouseout() {
    show1 = false;
    show2 = false;
  }

  function handleMouseover1(d, elem) {
    show1 = true;
    // $tooltip_text = $y(d).concat(" : ").concat(Math.round(d.value), 2);
    $tooltip_text = d;
    console.log(d);
    x_pos = elem.getBoundingClientRect().x;
    console.log(elem.getBoundingClientRect());
    y_pos = elem.getBoundingClientRect().y + 22;
  }
  let x_pos;
  let y_pos;
  function handleMouseover2(d, elem) {
    show2 = true;
    // $tooltip_text = $y(d).concat(" : ").concat(Math.round(d.value), 2);
    $tooltip_text = d;
    console.log(d);
    x_pos = elem.getBoundingClientRect().x;
    console.log(elem.getBoundingClientRect());
    y_pos = elem.getBoundingClientRect().y + 22;
  }

  onMount(() => {
    getVariableNames();
    $temporal_metric_1 = display_names[0];
    $temporal_metric_2 = display_names[1];

    console.log($data);

    mounted = true;
  });

  $: if ($temporal_metric_1) {
    $temporal_metric_1, updateLines1();
  }
  $: if ($temporal_metric_2) {
    $temporal_metric_2, updateLines2();
  }
  $: if (mounted) {
    updateLines1();
    updateLines2();
  }
  $: $country, getVariableNames();
</script>

{#if mounted}
  <div class="overall-container">
    <div class="chart-container one">
      <div class="dropdown">
        <p class="annotation">SELECT A METRIC*</p>
        <Dropdown
          items="{display_names}"
          metric1="true"
          placeholder="{display_names[0]}"
        />
      </div>
      {#if $temporal_metric_1}
        <div class="title-container">
          <Tooltip
            x="{x_pos}"
            y="{y_pos}"
            width="fit-content"
            max_width="300px"
            unit="px"
            text_align="left"
            show_tooltip="{show1}"
            position="fixed"
          />
          <h3>
            {codebook
              .find((d) => d.metric_name == $temporal_metric_1)
              .metric_name.replace("*", "")
              .replace("Number of ", "")}<span
              on:mouseout="{handleMouseout}"
              on:mouseenter="{handleMouseover1(
                codebook.find((d) => d.metric_name == $temporal_metric_1)
                  .Definition,
                this
              )}"
              ><Icon
                pointer-events="{true}"
                name="info"
                strokeWidth="{2}"
                dimension="{0.9}"
              /></span
            >
            in {$country}, {chart_values1[0].year}-{chart_values1.slice(-1)[0]
              .year}
          </h3>
        </div>
      {/if}
      <div class="chart-inner">
        <LayerCake
          padding="{{ right: 10, bottom: 20, left: 25 }}"
          x="{xKey}"
          y="{yKey}"
          yDomain="{[0, null]}"
          data="{chart_values1}"
        >
          <Svg>
            <AxisX
              ticks="{[
                chart_values1[0].year,
                ,
                chart_values1.slice(-1)[0].year,
              ]}"
            />
            <AxisY
              formatTick="{(d) => format(',')(d)}"
              ticks="{4}"
              textAnchor="end"
              text_size=".8"
              spacing="20"
            />
            <Line />
            <Area />
          </Svg>
        </LayerCake>
      </div>
    </div>
    <div class="chart-container two">
      <div class="dropdown">
        <p class="annotation">SELECT A METRIC*</p>
        <Dropdown
          items="{display_names}"
          metric2="true"
          placeholder="{display_names.slice(-1)[0]}"
        />
      </div>
      {#if $temporal_metric_2}
        <div class="title-container">
          <Tooltip
            x="{x_pos}"
            y="{y_pos}"
            width="fit-content"
            max_width="300px"
            unit="px"
            text_align="left"
            show_tooltip="{show2}"
            position="fixed"
          />
          <h3>
            {codebook
              .find((d) => d.metric_name == $temporal_metric_2)
              .metric_name.replace("*", "")
              .replace("Number of ", "")}<span
              on:mouseout="{handleMouseout}"
              on:mouseenter="{handleMouseover2(
                codebook.find((d) => d.metric_name == $temporal_metric_2)
                  .Definition,
                this
              )}"
              ><Icon
                pointer-events="{false}"
                name="info"
                strokeWidth="{2}"
                dimension="{0.9}"
              /></span
            >
            in {$country}, {chart_values2[0].year}-{chart_values2.slice(-1)[0]
              .year}
          </h3>
        </div>
      {/if}
      <div class="chart-inner">
        <LayerCake
          padding="{{ right: 10, bottom: 20, left: 25 }}"
          x="{xKey}"
          y="{yKey}"
          yDomain="{[0, null]}"
          data="{chart_values2}"
        >
          <Svg>
            <AxisX
              gridlines="{false}"
              ticks="{[
                chart_values2[0].year,
                ,
                chart_values2.slice(-1)[0].year,
              ]}"
            />
            <AxisY
              formatTick="{(d) => format(',')(d)}"
              ticks="{4}"
              textAnchor="end"
              text_size=".8"
              spacing="20"
            />
            <Line />
            <Area />
          </Svg>
        </LayerCake>
      </div>
    </div>
  </div>
{/if}

<style>
  .chart-container {
    width: 45%;
    height: 100%;
  }

  .chart-inner {
    width: 100%;
    height: 35vh;
    padding: 1.25rem;
    pointer-events: all;
  }

  .overall-container {
    display: flex;
    direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  h3 > * {
    pointer-events: all;
  }

  .annotation {
    font-weight: bold;
  }

  @media screen and (max-width: 415px) {
    .chart-container.two {
      display: none;
    }

    .chart-container {
      width: 100%;
    }
  }
</style>
