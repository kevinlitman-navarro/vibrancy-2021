<script>
  import Toggle from "./Toggle.svelte";
  export let options = [];
  export let value = null;
</script>

<div class="annotation">
  <p>Compare countries across X metrics</p>
</div>
<Toggle options="{options}" value="{value}" />
<div class="annotation">
  <p>Select a country to see detailed metrics</p>
</div>

<style></style>
