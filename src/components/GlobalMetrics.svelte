<script>
  import GlobalSliders from "./GlobalSliders.svelte";
  import GlobalButton from "./GlobalButton.svelte";
</script>

<div class="container">
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
</div>

<style>
  .container {
    overflow-y: hidden;
    overflow-x: visible;
    max-height: 430px;
  }

  .buttons {
    display: flex;
    justify-content: flex-start;
  }

  h2 {
    margin-bottom: 0px;
    padding-bottom: 0px;
  }

  .explanation {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  .lower {
    margin-top: 2rem;
    overflow-x: visible;
  }

  div.buttons > * {
    cursor: pointer;
  }
</style>
