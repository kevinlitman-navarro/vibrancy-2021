<script>
  // based on suggestions from:
  // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
  export let headerText;
  export let color;
  let expanded = false;
</script>

<div class="collapsible">
  <h3 style="color:{color}">
    <button aria-expanded="{expanded}" on:click="{() => (expanded = !expanded)}"
      >{headerText}
      <svg viewBox="0 0 10 10" focusable="false">
        <rect class="vert" height="8" width="2" y="1" x="4"></rect>
        <rect height="2" width="8" y="4" x="1"></rect>
      </svg>
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

  button[aria-expanded="true"] .vert {
    display: none;
  }

  button:focus svg {
    outline: 2px solid;
  }

  button [aria-expanded="true"] rect {
    fill: currentColor;
  }

  svg {
    height: 0.8em;
  }
</style>
