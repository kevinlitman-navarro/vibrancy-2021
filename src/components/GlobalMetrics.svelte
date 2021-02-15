<script>
  import GlobalSliders from "./GlobalSliders.svelte";
  import GlobalButton from "./GlobalButton.svelte";
</script>

<div class="upper">
  <h2>Importance of Metrics</h2>
  <div class="explanation">
    <p>
      Change the weights according to what metrics are important to you. The
      graph below will automatically update to reflect your choices.
    </p>
  </div>
  <div class="buttons">
    <div>
      <GlobalButton command="All weights to midpoint" />
    </div>
    <div>
      <GlobalButton command="Only per capita metrics" />
    </div>
    <div>
      <GlobalButton command="Only absolute metrics" />
    </div>
  </div>
</div>
<div class="lower">
  <GlobalSliders />
</div>

<style>
  .buttons {
    display: flex;
    direction: row;
    justify-content: space-between;
  }
  div.buttons > * {
    cursor: pointer;
  }
</style>
