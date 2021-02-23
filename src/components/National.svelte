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
  <!-- <div class="line0"></div> -->
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
    {#if screen.width <= 415}
      <h3>Select a metric to see how it has changed over the years.</h3>
    {:else}
      <h3>
        Select two individual metrics at a time to see how they have changed
        over the years.
      </h3>
    {/if}
  </div>
  <div class="chart">
    <NationalLines />
  </div>
</div>

<style>
  .intro {
    /* max-width: 550px;
    width: 50%; */
  }

  .top-right {
    /* width: 50%; */
    /* flex-grow: 1; */
    /* max-width: 550px; */
    overflow-x: visible;
    overflow-y: visible;
    height: 100%;
    /* max-height: 100%; */
  }
  .upper {
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    grid-gap: 60px;
    align-items: stretch;

    /* justify-content: space-between; */
    overflow-x: visible;
    width: 100%;
    padding: 0 30px;
    /* -25 px */
    max-width: 1400px;
    /* 1100 px */
    margin-bottom: 3rem;
    height: 100%;
    /* max-height: 426px; */
    margin: 0 auto;

    margin-bottom: 2rem;
  }

  /* old styling */
  /* .top-right {
    max-width: 500px;

    align-self: center;
    justify-self: center;
  }

  .line0 {
    width: 1px;
    height: 350px;
    align-self: center;
    max-height: 400px;
    justify-self: center;
    margin-left: 20px;
    margin-right: 20px;
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
  } */
  .chart {
    width: 100%;
    margin: 0 auto;
  }

  .line {
    height: 1px;
    width: 80%;
    margin: 2rem auto 2rem auto;
    /* align-self: center; */
    /* margin: auto 0; */
    /* height: 90%; */
    background-color: var(--gray);
  }

  .mid {
    width: 100%;
    height: 100%;
    max-width: 1400px;
    padding: 0 30px;
    margin: 0 auto;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
  }

  .lower {
    width: 100%;
    max-width: 1400px;
    padding: 0 30px;
    margin: 0 auto;
    /* display: flex;
    align-items: center; */
    margin-bottom: 6rem;
    height: 100%;
  }

  @media only screen and (max-width: 768px) {
    .upper {
      grid-auto-flow: row;
      grid-gap: 35px;
      /* grid-auto-rows: (minmax(0, 1fr)); */
      /* background-color: black; */
    }
  }
</style>
