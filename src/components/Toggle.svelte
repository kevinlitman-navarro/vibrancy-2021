<script>
  import { toggle } from "../stores/vibrancy.js";
  export let options = [];
  export let value = $toggle;
  export let onChange = () => {};

  const onChangeLocal = (option) => {
    onChange(option);
    value = option.id;

    $toggle = value;
  };
</script>

<div class="c">
  {#each options as option}
    <button
      class="option"
      class:selected="{option.id == $toggle}"
      on:click="{() => onChangeLocal(option)}"
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .c {
    display: flex;
    align-items: center;
  }
  .option:hover {
    background: #ececf1;
  }
  .option.selected,
  .option.selected:hover {
    background: var(--dark-blue);
    color: var(--white);
  }

  /* gravy */
  .option {
    padding: 0.6em 1em;
    line-height: 1.3em;
    appearance: none;
    background: none;
    font-weight: 600;
    font-size: 1.2em;
    color: var(--dark-blue);
    border: 1px solid var(--dark-blue);
    border-radius: 0;
    outline: none;
    cursor: pointer;
  }
  .option + .option {
    border-left-width: 0;
  }
  .option:first-of-type {
    border-radius: 6px 0 0 6px;
  }
  .option:last-of-type {
    border-radius: 0 6px 6px 0;
  }
</style>
