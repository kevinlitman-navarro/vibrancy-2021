<script>
  import Global from "./Global.svelte";
  import { csv } from "d3-fetch";
  import { data, variables } from "../stores/vibrancy.js";
  import { group } from "d3-array";
  import codebook from "../data/demo/codebook.csv";
  import { onMount } from "svelte";

  // const columns = Array.from(
  //   group(codebook, (d) => d.pillar_1),
  //   ([metric_name, metadata]) => ({
  //     metric_name,
  //     metadata: metadata.map((v) => ({
  //       ...v,
  //       multiplier: 1,
  //     })),
  //     multiplier: 1,
  //   })
  // );

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
    csv("assets/data/full_data.csv").then((z) => {
      $data = z;
    });
    // $variables = columns;
    console.log($variables);
    // .then(console.log());
  });
</script>

<Global />
