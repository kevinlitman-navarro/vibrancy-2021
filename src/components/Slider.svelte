<script>
  export let variable;
  export let name;
  export let multiplier;
  export let id;
  import { variables } from "../stores/vibrancy";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function update(multiplier) {
    dispatch("message", {
      multiplier,
      name,
      id,
    });
  }

  $: update(multiplier);
</script>

{#if variable != "Research and Development" && variable != "Economy" && variable != "Inclusion"}
  <span class="slider-name"
    >{variable
      .replace("Number of ", "")
      .replace("*", "")
      .replace(" Per Capita", " PC")
      .replace(" (Job Titles)", "")}</span
  >
{/if}

{#if variable == "Research and Development"}
  <span class="low annotation">Low</span>
{/if}
{#if variable == "Research and Development"}
  <span class="high annotation">High importance</span>
{/if}
<!-- <p>{multiplier}</p> -->
<input
  name="{name}"
  id="{id}"
  type="range"
  step=".1"
  max="1"
  min="0"
  list="tickmarks"
  bind:value="{multiplier}"
/>

<datalist id="tickmarks">
  <option value="0"></option>
  <option value=".1"></option>
  <option value=".2"></option>
  <option value=".3"></option>
  <option value=".4"></option>
  <option value=".5"></option>
  <option value=".6"></option>
  <option value=".7"></option>
  <option value=".8"></option>
  <option value=".9"></option>
  <option value="1"></option>
</datalist>

<!-- <p>{multiplier}</p> -->
<style>
  .annotation {
    position: absolute;
    font-size: 0.8rem;
    top: 5px;
  }

  .slider-name {
    width: 100%;
    text-align: right;
    max-width: 150px;
    margin-right: 0.2rem;
    font-size: 0.8rem;
  }

  .low {
    text-align: right;
    left: 0;
    transform: translate(calc(-50%), -120%);
  }
  input {
    margin-left: 0.2rem;
    padding-left: 0;
  }

  .high {
    text-align: left;
    right: 0;
    transform: translate(calc(50% - 10px), -120%);
  }
</style>
