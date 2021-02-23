<script>
  import GlobalSliders from "./GlobalSliders.svelte";
  import GlobalButton from "./GlobalButton.svelte";
  import { onMount } from "svelte";
  let mounted = false;
  let screenWidth;
  let small_screen = false;
  onMount(() => {
    screenWidth = window.innerWidth;
    console.log(screenWidth);
    console.log(screenWidth <= 1040);
    small_screen = screenWidth <= 1040;
    mounted = true;
  });
</script>

{#if mounted}
  <div class="container" class:active="{small_screen}">
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
{/if}

<style>
  .container {
    overflow-y: hidden;
    /* overflow-x: visible; */
    max-height: 580px;
  }

  .container.active {
    max-height: none;
  }

  .buttons {
    display: flex;
    justify-content: flex-start;
  }

  h2 {
    margin-bottom: 0px;
    padding-bottom: 0px;
    color: var(--extra-dark-blue);
    font-weight: normal;
  }

  .explanation {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  .lower {
    margin-top: 0;
    padding-top: 2rem;
    overflow-x: visible;
    overflow-y: scroll;
    max-height: 300px;
  }

  div.buttons > * {
    cursor: pointer;
  }

  @media screen and (max-width: 415px) {
    .lower {
      overflow-x: hidden;
    }
  }
</style>
