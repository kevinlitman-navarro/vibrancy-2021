<script>
  import Toggle from "./Toggle.svelte";
  export let options = [];
  export let value = null;
</script>

<div class="eyebrow">SELECT A VIEW</div>
<div class="toggle-container">
  <div class="annotation left">
    <p>Compare countries across 26 metrics</p>
  </div>
  <div class="toggle">
    <Toggle options="{options}" value="{value}" />
  </div>
  <div class="annotation right">
    <p>Select a country to see detailed metrics</p>
  </div>
</div>

<style>
  .toggle-container {
    display: flex;
    /* direction: column; */
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .eyebrow {
    text-align: center;
    margin: 0 auto;
    font-weight: 700;
  }

  .toggle {
    margin: 0 0.4em 0 0.4em;
  }

  .annotation {
    max-width: 25%;
  }

  .left {
    text-align: right;
  }

  .right {
    text-align: left;
  }
</style>
