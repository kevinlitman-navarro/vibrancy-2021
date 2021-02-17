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
    max-width: 550px;
    width: 50%;
  }
  .top-right {
    max-width: 500px;
    width: 50%;
    align-self: center;
    justify-self: center;
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
    width: calc(100% - 25px);
    max-width: 1100px;
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
    width: 80%;
    margin: 2rem auto 2rem auto;
    /* align-self: center; */
    /* margin: auto 0; */
    /* height: 90%; */
    background-color: var(--gray);
  }

  .mid {
    width: 90%;
    height: 100%;
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
    height: 100%;
  }
</style>
