<script>
  export let name;
  export let year = 2020;
  import { toggle } from "../stores/vibrancy.js";
  import {
    national_year,
    global_year,
    methodology_year,
  } from "../stores/vibrancy.js";
  export let methodology;

  let updateYear = () => {
    if ($toggle == "Global" && !methodology) {
      $global_year = year;
    } else if ($toggle == "National" && !methodology) {
      $national_year = year;
    } else if (methodology) {
      $methodology_year = year;
    }
  };

  $: year, updateYear();
</script>

<div class="container">
  <span class="top">Choose a year</span>
  <span class="low annotation">2015</span>
  <span class="high annotation">2020</span>
  <input
    name="{name}"
    type="range"
    step="1"
    max="2020"
    min="2015"
    list="tickmarks"
    bind:value="{year}"
  />
</div>

<datalist id="tickmarks">
  <option value="2015"></option>
  <option value="2016"></option>
  <option value="2017"></option>
  <option value="2018"></option>
  <option value="2019"></option>
  <option value="2020"></option>
</datalist>

<style>
  .annotation {
    position: absolute;
    display: inline-block;
  }
  .container {
    /* display: flex;
    align-items: center; */
  }
  .top {
    display: inline-block;
    text-align: center;
    /* margin: 0 auto; */
  }

  .low {
    text-align: right;
    transform: translate(-7.4em, 2.4em);
  }

  .high {
    text-align: left;
    transform: translate(0em, 2.4em);
  }
</style>
