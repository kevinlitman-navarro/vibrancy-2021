<script>
  import { tooltip_text } from "../stores/vibrancy.js";
  export let x;
  export let y;
  export let show_tooltip;
  export let text_align = "center";
  export let unit = "px";
  export let width = 120;
  export let max_width = "240px";
  export let position = "absolute";
</script>

<div
  style="top:{y}{unit};left:{x -
    60}{unit};width:{width};max-width:{max_width};position:{position};text-align:{text_align}"
  class="tooltip"
  class:visible="{show_tooltip}"
>
  {@html $tooltip_text}
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
    z-index: 2;
  }
  .visible {
    visibility: visible;
  }
</style>
