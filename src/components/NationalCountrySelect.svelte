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
    <p class="annotation">SELECT A COUNTRY</p>
    <Dropdown
      items="{[...new Set($data.map((d) => d.CountryName))].sort(ascending)}"
      countries="true"
      placeholder="United States"
    />
  </div>
</div>
<div class="body">
  <h3>
    Number of metrics from {$country} in {$national_year}: {$number_of_metrics}
  </h3>
  <p>
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est
    laborum."
  </p>
</div>

<style>
  .dropdown {
    display: block;
  }

  .annotation {
    font-weight: bold;
  }
</style>
