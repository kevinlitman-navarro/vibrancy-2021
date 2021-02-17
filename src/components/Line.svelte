<script>
  import { getContext } from "svelte";
  import { scaleOrdinal } from "d3-scale";
  const { data, xGet, yGet } = getContext("LayerCake");

  export let stroke = "#ab00d6";

  const seriesNames = ["Research and Development", "Economy", "Society"];

  const seriesColors = ["#3a8dc7", "#249499", "#9d5da3"];
  const scale = scaleOrdinal().domain(seriesNames).range(seriesColors);

  $: path =
    "M" +
    $data
      .map((d) => {
        return $xGet(d) + "," + $yGet(d);
      })
      .join("L");
</script>

<!-- <path class="path-line" d="{path}" 
stroke="{scale($data[0].pillar)}"
></path> -->

<!-- <path class="path-line" d="{path}"></path> -->

<path class="path-line" d="{path}" stroke="{scale($data[0].pillar)}"></path>

<!-- <path class="path-line" d="{path}"></path> -->
<style>
  .path-line {
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }
</style>
