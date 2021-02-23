<script>
  import AnnotatedToggle from "./AnnotatedToggle.svelte";
  const options = ["Global", "National"].map((d) => ({
    id: d,
    label: d,
  }));
  let value = "Global";
</script>

<h1>Global AI Vibrancy Tool</h1>
<div class="explanation">
  <p>
    The Global AI Vibrancy Tool is an interactive visualization that allows
    cross-country comparison for up to 26 countries across 22 indicators. The
    tool provides transparent evaluation of the relative position of countries
    based on users’ preference; identifies relevant national indicators to guide
    policy priorities at a country level; and shows local centers of AI
    excellence for not just advanced economies but also emerging markets.
  </p>

  <p>
    The <b>global view</b> provides a weighted ranking of X countries based on
    user-inputted parameters and a matrix that gives a top-level view of each
    country’s success across selected metrics. The <b>national view</b> includes
    a ranking across all metrics within a selected country and detailed
    timeseries data going back to 2015 for all available metrics.
    <b>Toggle between views using the buttons below.</b>
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

  @media screen and (max-width: 415px) {
    h1 {
      font-size: 28px;
    }
  }
</style>
