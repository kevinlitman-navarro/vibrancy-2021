<script>
  import Tooltip from "./Tooltip.svelte";
  import { methodology_year, tooltip_text } from "../stores/vibrancy.js";
  export let data;
  export let countries;
  export let values_raw;
  export let values_scaled;
  export let keys;
  export let mounted;
  import { onMount } from "svelte";
  let temp;
  let scale_storage = [];
  let show = false;

  import { scaleLinear } from "d3-scale";
  import { extent, descending } from "d3-array";
  let x_pos;
  let y_pos;

  let getScale = () => {
    scale_storage = [];
    keys.forEach((k) => {
      temp = {};
      temp["values"] = values_scaled.map((d) => d[k]);
      temp["variable_name"] = k;
      if ($methodology_year == 2016 && k.includes("Deep Learning")) {
        console.log(
          values_scaled
            .map((d) => d[k])
            .filter((v) => {
              return v != "-";
            })
        );
        temp["extent"] = extent(
          values_scaled
            .map((d) => d[k])
            .filter((v) => {
              return v != "-";
            })
        );
      } else {
        temp["extent"] = extent(values_scaled.map((d) => d[k]));
      }
      if ($methodology_year == 2016 && k.includes("Deep Learning")) {
        temp["scale"] = scaleLinear()
          .domain(
            extent(
              values_scaled
                .map((d) => d[k])
                .filter((v) => {
                  return v != "-";
                })
            )
          )
          .range(["#c6dbef", "#08306b"]);
      } else {
        temp["scale"] = scaleLinear()
          .domain(extent(values_scaled.map((d) => d[k])))
          .range(["#c6dbef", "#08306b"]);
      }
      scale_storage.push(temp);
    });
    console.log(scale_storage);
  };

  //["#29162b", "#f4eef4"]

  onMount(() => {
    getScale();
  });

  $: values_scaled, getScale();
  const range = ["#29162b", "#f4eef4"];

  console.log(countries);
  console.log(values_scaled);
  console.log(keys);
  console.log(data);

  function handleMouseout() {
    show = false;
  }

  function handleMouseover(c, k, d) {
    console.log(d);

    // $tooltip_text = $y(d).concat(" : ").concat(Math.round(d.value), 2);
    $tooltip_text = "<b>"
      .concat(c)
      .concat("</b>")
      .concat("<br>")
      .concat("————")
      .concat("<br>")
      .concat(k)
      .concat(" : ")
      .concat(
        values_scaled
          .find((d) => {
            return d.country_name == c;
          })
          [k].toFixed(2)
      );

    x_pos = d["x"];
    console.log(d["x"]);
    y_pos = d["y"] + 22;
    show = true;
  }
</script>

{#if mounted}
  <div class="container">
    {#each keys as k, i}
      <div class="row">
        <span class="x-label"
          >{k
            .replace("Number of", "")
            .replace("Per Capita", "PC")
            .replace("AI ", "")
            .replace(" (Job Titles)", "")
            .replace("*", "")}</span
        >
        {#each countries as c}
          {#if i == 0}
            <span
              class="y-label"
              style="transform:  rotate(45deg) translate(-110px,20px) ;text-align:right; width:130px;"
              >{c}</span
            >
          {/if}
          <div
            variable="{k}"
            country="{c}"
            class="cell"
            on:mouseover="{handleMouseover(c, k, this.getBoundingClientRect())}"
            on:mouseout="{handleMouseout}"
            style="background-color:{scale_storage
              .find((x) => {
                return x.variable_name == k;
              })
              .scale(
                values_scaled.find((d) => {
                  return d.country_name == c;
                })[k]
              )
              ? scale_storage
                  .find((x) => {
                    return x.variable_name == k;
                  })
                  .scale(
                    values_scaled.find((d) => {
                      return d.country_name == c;
                    })[k]
                  )
              : '#cccccc'};"
          ></div>
        {/each}
      </div>
    {/each}
    <Tooltip
      x="{x_pos}"
      y="{y_pos}"
      width="fit-content"
      max_width="400px"
      unit="px"
      text_align="left"
      show_tooltip="{show}"
      position="fixed"
    />
    <div class="legend">
      <div class="legend1">
        <div class="annotation">
          <p class="label left">0</p>
          <p class="label middle">Index Score</p>
          <p class="label right">100</p>
        </div>
      </div>

      <div class="legend2">
        <div class="box"></div>
        <div class="annotation2 no-data">
          <p class="label final">No data available</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- {Math.round(
              values_scaled.find((d) => {
                return d.country_name == c;
              })[k]
            )} -->
<style>
  .row {
    display: block;
    margin: 0;
    padding: 0;
    height: 20px;
  }

  .no-data {
    text-align: center;
  }

  .annotation {
    position: absolute;
    display: flex;
    align-items: space-between;
    justify-content: space-between;
  }

  .label {
    position: absolute;
    text-align: center;
  }

  .final {
    text-align: center;
    margin-top: 0;
    padding-top: 0;
    left: -44px;
  }

  .left {
  }

  .middle {
    left: 7vw;
    width: 100px;
    display: none;
  }

  .right {
    left: 19vw;
  }

  .legend {
    display: flex;
    justify-content: space-around;
  }

  .legend1 {
    background-image: linear-gradient(to right, #c6dbef, #08306b);
    margin-top: 2vh;
    width: 20vw;
    height: 2vh;

    position: relative;
  }
  .legend2 {
    margin-top: 2vh;
    width: 20vw;
    height: 2vh;
    position: relative;
  }
  .legend2 > .box {
    background-color: #cccccc;
    width: 30px;
    height: 2vh;
  }

  .cell {
    display: inline-block;
    width: 3%;
    /* min-width: 2%; */
    min-height: 10px;
    height: 20px;
    max-height: 20px;
  }

  .container {
    height: 80vh;
    min-width: 1010px;
    cursor: initial;
    display: grid;
    position: relative;
    margin: 0 auto;
    padding-top: 5em;
    padding-left: 6em;
    left: 6em;
  }

  .y-label {
    position: absolute;
    text-align: right;
    /* transform: translate(0, -20px) rotate(45deg); */
  }

  .x-label {
    position: absolute;
    transform: translate(-210px, 3px);
    width: 200px;
    text-align: right;
    font-size: 0.8em;
  }
</style>
