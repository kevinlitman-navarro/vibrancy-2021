<script>
  import Icon from "./helpers/Icon.svelte";

  // based on suggestions from:
  // Inclusive Components by Heydon Pickering https://inclusive-components.design/collapsible-sections/
  export let headerText;
  export let color;
  let expanded = false;
  let fill = "#666666";
</script>




<div class="collapse" on:click="{() => (expanded = !expanded)}">
  <span class="see-more">See more</span>

  <button class="carrot" aria-expanded="{expanded}">
    <div class="icon-container" focusable="false">
      <div class="closed">
        <Icon name="chevron-down" stroke="{fill}" />
      </div>
      <div class="open">
        <Icon name="chevron-left" stroke="{fill}" />
      </div>
    </div>
  </button>

  <div class="contents" hidden="{!expanded}">
    <slot />
  </div>

</div>



<style>
  button {
    all: inherit;
  }

  .collapse {
    width:100%;
    display:flex;
    cursor:pointer;
    flex-wrap:wrap;
  }
  .carrot {
    width: 5px;
  }


  .see-more{
    margin:0;
    margin-right:.5rem;
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

  .slider-container {
    position: relative;
  }


</style>
