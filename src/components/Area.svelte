<script>
  import { getContext } from "svelte";
  import { scaleOrdinal } from "d3-scale";

  const { data, xGet, yGet, xScale, yScale, extents } = getContext("LayerCake");

  export let fill = "#ab00d610";

  const seriesNames = ["Research and Development", "Economy", "Society"];
  const seriesColors = ["#75ceee", "#78cabc", "#d5a4cb"];
  const scale = scaleOrdinal().domain(seriesNames).range(seriesColors);

  $: path =
    "M" +
    $data
      .map((d) => {
        return $xGet(d) + "," + $yGet(d);
      })
      .join("L");

  let area;

  $: {
    const yRange = $yScale.range();
    area =
      path +
      ("L" +
        $xScale($extents.x ? $extents.x[1] : 0) +
        "," +
        yRange[0] +
        "L" +
        $xScale($extents.x ? $extents.x[0] : 0) +
        "," +
        yRange[0] +
        "Z");
  }
</script>

<!-- <path class="path-area" d="{area}" opacity=".4"></path> -->
<path class="path-area" d="{area}" opacity=".4" fill="{scale($data[0].pillar)}"
></path>
