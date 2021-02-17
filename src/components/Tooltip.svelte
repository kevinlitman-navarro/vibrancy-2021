<script>
  import { tooltip_text } from "../stores/vibrancy.js";
  export let x;
  export let y;
  export let show_tooltip;
  export let unit = "px";
  export let width = 120;
</script>

<div
  style="top:{y}{unit};left:{x - 60}{unit};width:{width}"
  class="tooltip"
  class:visible="{show_tooltip}"
>
  {$tooltip_text}
</div>

<style>
  .tooltip {
    visibility: hidden;
    width: 120px;
    background-color: var(--extra-light-plum);
    color: var(--extra-dark-plum);
    text-align: center;
    padding: 5px 5px;
    border-radius: 6px;
    pointer-events: none;
    font-family: "Source Sans Pro";
    font-weight: 300;
    border: 1px solid var(--light-plum);
    box-shadow: 0px 2px 10px rgba(191, 178, 162, 0.25);

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }
  .visible {
    visibility: visible;
  }
</style>
