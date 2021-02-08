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

  $: update(multiplier), console.log($variables);
</script>

<span>{variable}</span>
<p>{multiplier}</p>
<input
  name="{name}"
  id="{id}"
  type="range"
  step=".2"
  max="1"
  min="0"
  list="tickmarks"
  bind:value="{multiplier}"
/>

<datalist id="tickmarks">
  <option value="0"></option>
  <option value=".2"></option>
  <option value=".4"></option>
  <option value=".6"></option>
  <option value=".8"></option>
  <option value="1"></option>
</datalist>

<style></style>
