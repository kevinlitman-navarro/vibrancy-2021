<script>
  import AnnotatedToggle from "./AnnotatedToggle.svelte";
  const options = ["Global", "National"].map((d) => ({
    id: d,
    label: d,
  }));
  let value = "Global";
</script>

<h1>Global Vibrancy Tool</h1>
<div class="explanation">
  <p>
    The AI Vibrancy Tool compares countries’ activities in the AI industry. It
    is tempting to provide a single ranking of countries, but such rankings are
    notoriously tricky. Projecting complex, heterogeneous measures down to a
    single number (or even a small set of numbers) is fraught with
    methodological subtleties, and can be highly subjective or skewed.
  </p>

  <p>
    The <b>global view</b> provides a weighted ranking of X countries based on
    user-inputted parameters and a matrix that gives a top-level view of each
    country’s success across selected metrics. The <b>national view</b> includes
    a ranking across all metrics within a selected country and detailed
    timeseries data going back to 2015 for all available metrics.
    <b>Toggle between views using the buttons above.</b>
  </p>
</div>

<AnnotatedToggle options="{options}" value="{value}" />

<style>
  h1 {
    font-family: Circular;
    color: var(--dark-blue);
    font-weight: 700;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .explanation {
    padding-top: 0;
    margin-top: 0;
  }
</style>
