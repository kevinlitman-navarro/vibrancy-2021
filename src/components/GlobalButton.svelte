<script>
  export let command;
  import { variables } from "../stores/vibrancy.js";
  let clicked = false;

  let runCommand = (command) => {
    clicked = true;
    if (command == "All weights to midpoint") {
      $variables.forEach((x) => {
        x.multiplier = 0.5;
        x.metadata.forEach((y) => {
          y.multiplier = 0.5;
        });
      });
      $variables = $variables;
    } else if (command == "Only absolute metrics") {
      $variables.forEach((x) => {
        x.metadata.forEach((y) => {
          if (!y.metric_name.toLowerCase().includes("per capita")) {
            y.multiplier = 1;
          } else {
            y.multiplier = 0;
          }
        });
      });
      $variables = $variables;
    } else if (command == "Only per capita metrics") {
      $variables.forEach((x) => {
        x.metadata.forEach((y) => {
          if (y.metric_name.toLowerCase().includes("per capita")) {
            y.multiplier = 1;
          } else {
            y.multiplier = 0;
          }
        });
      });
      $variables = $variables;
    }
  };
</script>

<div on:click="{runCommand(command)}" class="button-container">
  <input class="button" value="{command}" />
</div>

<style>
  input {
    pointer-events: none;
    background: var(--white);
    cursor: pointer;
  }

  input:hover {
  }

  .button-container {
    cursor: pointer;
  }

  .button-container:hover {
    background: #ececf1;
    pointer-events: all;
  }
</style>
