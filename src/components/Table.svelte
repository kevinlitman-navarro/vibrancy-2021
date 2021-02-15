<script>
  export let data;
  export let keys;
  export let mounted;
  console.log(keys);
  $: mounted, console.log(keys);
</script>

<div class="overall-container">
  <div class="table-container">
    <table>
      <thead>
        <tr>
          {#each keys as k}
            {#if k == "country_name"}
              <th></th>
            {:else}
              <th>{k}</th>
            {/if}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as d}
          <tr>
            {#each keys as k}
              <td>{d[k]}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .table-container {
    margin: 0 auto;
    width: 100%;
    height: 70vw;
    overflow: scroll;
  }

  th {
    min-width: 10rem;
    width: 10rem;
  }
</style>
