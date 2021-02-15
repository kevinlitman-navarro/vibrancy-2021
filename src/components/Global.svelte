<script>
  import GlobalMetrics from "./GlobalMetrics.svelte";
  import Intro from "./Intro.svelte";
  import GlobalBars from "./GlobalBars.svelte";
</script>

<div class="upper">
  <div class="intro">
    <Intro />
  </div>
  <div class="line"></div>
  <div class="top-right">
    <GlobalMetrics />
  </div>
</div>
<div class="lower">
  <div class="chart">
    <GlobalBars />
  </div>
</div>

<style>
  .line {
    width: 0.2%;
    /* align-self: center; */
    /* margin: auto 0; */
    /* height: 90%; */
    background-color: var(--gray);
  }
  .intro {
    width: 45%;
  }
  .top-right {
    width: 45%;
  }
  .upper {
    display: flex;
    direction: column;
    justify-content: space-between;
    width: 85%;
    margin-bottom: 2rem;
    height: 100%;
    margin: 0 auto;
  }
  .lower {
    width: 90%;
    margin: 0 auto;
    margin-top: 2rem;
    display: flex;
    align-items: center;
  }

  .chart {
    width: 100%;
    margin: 0 auto;
  }
</style>
