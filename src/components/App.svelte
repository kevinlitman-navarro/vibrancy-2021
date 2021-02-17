<script>
  import Intro from "./Intro.svelte";
  import Header from "./Header.svelte";
  import Global from "./Global.svelte";
  import National from "./National.svelte";
  import Methodology from "./Methodology.svelte";
  import { csv } from "d3-fetch";
  import { variables, data, toggle } from "../stores/vibrancy.js";
  import { group } from "d3-array";
  import codebook from "../data/demo/codebook.csv";
  import { onMount } from "svelte";

  let variable_names = [];

  onMount(() => {
    $variables = Array.from(
      group(codebook, (d) => d.pillar_1),
      ([metric_name, metadata]) => ({
        metric_name,
        metadata: metadata.map((v) => ({
          ...v,
          multiplier: 1,
        })),
        multiplier: 1,
      })
    );
    $variables.forEach((d) => {
      d.metadata.forEach((v) => {
        variable_names.push(v.shortname_raw);
        variable_names.push(v.shortname_scaled);
      });
    });
    variable_names.push("PublishYear");
    console.log(variable_names);

    csv("assets/data/full_data_2.csv").then((raw) => {
      $data = raw;
      $data.forEach((z) => {
        variable_names.forEach((x) => {
          if (z[x] != "-") {
            z[x] = parseFloat(z[x]);
          }
        });
      });
      console.log($variables);
    });
  });

  $: console.log($toggle);
</script>

<section class="header">
  <Header />
</section>
{#if $data}
  <section class="story">
    <section class="global" class:active="{$toggle == 'Global'}">
      <Global />
    </section>
    <section class="national" class:active="{$toggle == 'National'}">
      <National />
    </section>
  </section>
  <section class="methodology">
    <Methodology />
  </section>
{/if}

<style>
  .header {
    width: 100%;
    height: 10vh;
    position: sticky;
  }
  .story {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .methodology {
    width: 100%;
    margin: 0 auto;
    height: 100%;
    pointer-events: all;
  }
  .global {
    display: none;
    height: 100%;
  }

  .active {
    display: block;
  }

  .national {
    display: none;
    height: 100%;
  }

  .active {
    display: block;
  }
</style>
