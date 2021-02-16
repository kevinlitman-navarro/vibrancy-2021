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
    <GlobalButton command="All weights to midpoint" />
    <GlobalButton command="Only per capita metrics" />
    <GlobalButton command="Only absolute metrics" />
  </div>
</div>
<div class="lower">
  <GlobalSliders />
</div>

<style>
  .buttons {
    display: flex;
    justify-content: flex-start;
  }

  .lower {
    margin-top:2rem;
  }

  div.buttons > * {
    cursor: pointer;
  }
</style>
