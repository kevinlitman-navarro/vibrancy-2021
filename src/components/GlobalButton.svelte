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
  <button class="button" value="{command}">{command}</button>
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
    background-color: #3A8DC7;
    display: block;
    background: white;
    border: var(--dark-blue) solid 1px;
    margin-left: -1px;
    max-width: 33%;
  }



  .button {
    background:none;
    border:none;
    color: var(--dark-blue);
    display: block;
  }

  .button-container:first-of-type {
    margin-left:0px;
    border-radius: 6px 0 0 6px;
  }

  .button-container:last-of-type {
    border-radius: 0 6px 6px 0;
  }

  .button-container:hover {
    background: #ececf1;
    pointer-events: all;
  }
</style>
