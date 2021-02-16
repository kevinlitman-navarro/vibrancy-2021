<script>
  import Icon from "./helpers/Icon.svelte";

  // based on suggestions from:
  // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
  export let headerText;
  export let color;
  let expanded = false;
  let fill = "#666666";
</script>

<div class="collapsible">
  <h3 style="color:{color}">
    <button aria-expanded="{expanded}" on:click="{() => (expanded = !expanded)}"
      >{headerText}
      <!-- <svg viewBox="0 0 10 10" focusable="false"> -->
      <div class="icon-container" focusable="false">
        <div class="closed">
          <Icon name="chevron-down" stroke="{fill}" />
        </div>
        <div class="open">
          <Icon name="chevron-left" stroke="{fill}" />
        </div>
      </div>
      <!-- <rect class="vert" height="8" width="2" y="1" x="4"></rect>
        <rect height="2" width="8" y="4" x="1"></rect> -->
      <!-- </svg> -->
    </button>
  </h3>

  <div class="contents" hidden="{!expanded}">
    <slot />
  </div>
</div>

<style>
  button {
    all: inherit;
  }

  .open {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .closed {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-container {
    margin: auto 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  button[aria-expanded="true"] .closed {
    display: none;
  }

  button[aria-expanded="false"] .open {
    display: none;
  }
  /* button:focus svg {
    outline: 2px solid;
    cursor: pointer;
  } */

  button [aria-expanded="true"] rect {
    fill: #666666;
  }

  svg {
    height: 0.8em;
  }
</style>
