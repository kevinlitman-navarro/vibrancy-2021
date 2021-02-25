<script>
  import {
    data,
    country,
    national_year,
    number_of_metrics,
  } from "../stores/vibrancy.js";
  import Dropdown from "./Dropdown.svelte";
  import { ascending } from "d3-array";
</script>

<div class="upper">
  <div class="dropdown">
    <h2 class="annotation">Country Selection</h2>
    <Dropdown
      items="{[...new Set($data.map((d) => d.CountryName))].sort(ascending)}"
      countries="true"
      placeholder="United States"
    />
  </div>
</div>
<div class="body">
  <h3>
    <b>{$number_of_metrics} metrics available</b> from {$country} in {$national_year}
  </h3>
</div>

<style>
  .dropdown {
    display: block;
  }

  .annotation {
    font-weight: normal;
    color: var(--extra-dark-blue);
  }

  h3 {
    font-family: var(--source);
    font-weight: normal;
    font-size: 22px;
  }
</style>
