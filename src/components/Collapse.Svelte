<script>
  import Icon from "./helpers/Icon.svelte";

  // based on suggestions from:
  // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
  export let headerText = "See individual metrics";
  export let color;
  export let type;
  export let name;
  export let research_clicked = false;
  export let economy_clicked = false;
  export let inclusion_clicked = false;
  let expanded = false;
  let fill = "#666666";

  let check = () => {
    if (name == "Research & Development") {
      expanded = research_clicked;
    } else if (name == "Economy") {
      expanded = economy_clicked;
    } else if (name == "Inclusion*") {
      expanded = inclusion_clicked;
    }
    expanded = expanded;
  };

  $: research_clicked, economy_clicked, inclusion_clicked, check();
</script>

<div class="collapse">
  <div class="clickable" on:click="{() => (expanded = !expanded)}">
    {#if type == "header"}
      <h1 class="header">{headerText}</h1>
    {:else if type == "header-small"}
      <h3 class="header">{headerText}</h3>
    {:else}
      <span class="see-more">{headerText}</span>
    {/if}

    <button class="carrot" aria-expanded="{expanded}">
      <div class="icon-container" focusable="false">
        <div class="closed">
          <Icon
            name="chevron-down"
            stroke="{fill}"
            strokeWidth="{type == 'header' ? 3 : 3}"
          />
        </div>
        <div class="open">
          <Icon name="chevron-left" stroke="{fill}" />
        </div>
      </div>
    </button>
  </div>

  <div class="contents" hidden="{!expanded}">
    <slot />
  </div>
</div>

<style>
  .clickable {
    display: flex;
  }
  button {
    all: inherit;
    pointer-events: auto;
    display: inline;
    max-width: fit-content;
  }

  .header {
    margin: 0 auto;
  }

  .collapse {
    width: 100%;
    display: flex;
    cursor: pointer;
    flex-wrap: wrap;
  }
  .carrot {
    width: 5px;
  }
  h1.header {
    color: #3a8dc7;
  }
  .see-more {
    margin: 0;
    margin-right: 0.5rem;
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

  .icon-container,
  .contents {
    pointer-events: auto;
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

  .slider-container {
    position: relative;
  }

  .contents {
    width: 100%;
  }
</style>
