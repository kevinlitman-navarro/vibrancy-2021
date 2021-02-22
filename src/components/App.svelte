<script>
  import Heatmap from "./Heatmap.svelte";
  import Header from "./Header.svelte";
  import Global from "./Global.svelte";
  import National from "./National.svelte";
  import Methodology from "./Methodology.svelte";
  import { csv } from "d3-fetch";
  import { variables, data, toggle } from "../stores/vibrancy.js";
  import { group } from "d3-array";
  import codebook from "../data/demo/codebook_2.csv";
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

    csv("assets/data/full_data_4.csv").then((raw) => {
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

<!-- <section class="header">
  <Header />
</section> -->
{#if $data}
  <section class="story">
    <section class="global" class:active="{$toggle == 'Global'}">
      <Global />
    </section>
    <section class="national" class:active="{$toggle == 'National'}">
      <National />
    </section>
  </section>
  <div class="line"></div>
  <section class="methodology">
    <Methodology />
  </section>
{/if}

<!-- <section class="header">
  <Header />
</section> -->
<style>
  .header {
    width: 100%;
    height: 10vh;
    position: sticky;
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
  .story {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .methodology {
    width: 100%;
    margin: 0 auto;
    height: 100%;
    /* pointer-events: all; */
  }
  .global {
    display: none;
    height: 100%;
    overflow-x: visible;
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

  @media only screen and (max-width: 768px) {
    .upper {
      /* grid-auto-flow: row;
      grid-auto-rows: (minmax(0, 1fr)); */
      /* background-color: black; */
    }
  }
</style>
