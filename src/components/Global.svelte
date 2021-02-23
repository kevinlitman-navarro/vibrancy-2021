<script>
  import GlobalMetrics from "./GlobalMetrics.svelte";
  import Intro from "./Intro.svelte";
  import GlobalBars from "./GlobalBars.svelte";
</script>

<div class="upper">
  <div class="intro">
    <Intro />
  </div>
  <!-- <div class="line"></div> -->
  <div class="top-right">
    <GlobalMetrics />
  </div>
</div>
<div class="lower">
  <div class="chart">
    <GlobalBars />
  </div>
  <div class="note">
    <p>
      *We created the Inclusion pillar to highlight the importance of diversity
      in the AI field. Currently, the pillar only includes gender metrics due to
      the lack of data, but we aim to include more measures in future reports.
    </p>
  </div>
</div>

<style>
  .line {
    width: 1px;
    height: 350px;
    align-self: center;
    max-height: 400px;
    justify-self: center;
    /* : calc(100% - 6em); */
    margin-left: 20px;
    margin-right: 20px;
    background-color: var(--gray);
  }
  .intro {
    /* max-width: 550px; */
    /* width: 50%; */
  }

  .top-right {
    /* width: 50%; */
    /* flex-grow: 1; */
    /* max-width: 550px; */
    /* overflow-x: visible;
    overflow-y: visible; */
    height: 100%;
    /* max-height: 100%; */
  }
  .upper {
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    grid-gap: 35px;
    align-items: stretch;

    /* justify-content: space-between; */
    overflow-x: visible;

    width: 100%;
    padding: 0 10px;
    /* -25 px */
    max-width: 1060px;
    /* 1100 px */
    margin-bottom: 3rem;
    height: 100%;
    /* max-height: 426px; */
    margin: 0 auto;
  }
  .lower {
    width: 100%;
    padding: 0 10px;
    max-width: 1060px;
    margin: 0 auto;
    margin-top: 2rem;
    display: block;
    align-items: center;
  }

  .chart {
    width: 100%;
    margin: 0 auto;
  }

  @media only screen and (max-width: 1080px) {
    .upper {
      padding: 0 40px;
    }

    .lower {
      padding: 0 40px;
    }
  }

  @media only screen and (max-width: 768px) {
    .upper {
      grid-auto-flow: row;
      grid-gap: 35px;
    }

    .rank-container {
      display: none;
    }
  }
</style>
