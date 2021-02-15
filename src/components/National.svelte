<script>
  import Intro from "../components/Intro.svelte";
  import NationalCountrySelect from "./NationalCountrySelect.svelte";
  import NationalBars from "./NationalBars.svelte";
  import NationalLines from "./NationalLines.svelte";
</script>

<div class="upper">
  <div class="intro">
    <Intro />
  </div>
  <div class="line0"></div>
  <div class="top-right">
    <NationalCountrySelect />
  </div>
</div>

<div class="mid">
  <div class="chart">
    <NationalBars />
  </div>
</div>

<div class="line"></div>

<div class="lower">
  <div class="title-container">
    <h1>Selected Metrics Over Time</h1>
    <h3>
      Select two individual metrics at a time to see how they have changed over
      the years.
    </h3>
  </div>
  <div class="chart">
    <NationalLines />
  </div>
</div>

<style>
  .intro {
    width: 45%;
  }
  .top-right {
    width: 45%;
  }

  .line0 {
    width: 0.2%;
    /* align-self: center; */
    /* margin: auto 0; */
    /* height: 90%; */
    background-color: var(--gray);
  }
  .upper {
    display: flex;
    direction: column;
    justify-content: space-between;
    width: 85%;
    height: 100%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  .chart {
    width: 100%;
    margin: 0 auto;
  }

  .line {
    height: 0.1rem;
    width: 100%;
    margin: 2rem 0 2rem 0;
    /* align-self: center; */
    /* margin: auto 0; */
    /* height: 90%; */
    background-color: var(--gray);
  }

  .mid {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
  }

  .lower {
    width: 90%;
    margin: 0 auto;
    /* display: flex;
    align-items: center; */
    margin-bottom: 6rem;
  }
</style>
