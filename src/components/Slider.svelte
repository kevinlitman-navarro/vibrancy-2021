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

{#if variable != "Research and Development" && variable != "Economy" && variable != "Society"}
  <span>{variable}</span>
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

<style>
  .annotation {
    position: absolute;
    display: inline-block;
  }

  .low {
    text-align: right;
    transform: translate(-1em, 1em);
  }

  .high {
    text-align: left;
    transform: translate(4em, 1em);
  }
</style>
