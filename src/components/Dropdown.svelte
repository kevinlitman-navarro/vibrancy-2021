<script>
  import AutoComplete from "simple-svelte-autocomplete";
  let value;
  export let countries;
  export let metric1;
  export let metric2;
  import {
    temporal_metric_1,
    temporal_metric_2,
    country,
  } from "../stores/vibrancy.js";
  export let items = [];
  export let placeholder;

  $: binder = value;
</script>

{#if countries}
  <div class="country-select">
    <AutoComplete
      items="{items}"
      bind:selectedItem="{$country}"
      placeholder="{placeholder}"
    />
  </div>
{/if}

{#if metric1}
  <AutoComplete
    items="{items}"
    bind:selectedItem="{$temporal_metric_1}"
    placeholder="{placeholder}"
  />
{/if}

{#if metric2}
  <AutoComplete
    items="{items}"
    bind:selectedItem="{$temporal_metric_2}"
    placeholder="{placeholder}"
  />
{/if}

<style>
  .country-select {
    font-size: 24px;
    font-family: var(--source);
  }
</style>
