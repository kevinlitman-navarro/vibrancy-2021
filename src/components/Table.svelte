<script>
  export let data;
  export let keys;
  export let mounted;
  import { methodology_year } from "../stores/vibrancy.js";
  console.log(keys);
  let export_data;
  $: mounted, console.log(keys);
  let file;

  function download_csv(csv, filename) {
    console.log(csv);
    let csvFile;
    let downloadLink;
    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    downloadLink.id = "downloader";
    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Make sure that the link is not displayed
    downloadLink.style.display = "none";
    console.log(downloadLink);
    // Add the link to your DOM
    document.body.appendChild(downloadLink);
    // Lanzamos
    document.querySelector("#downloader").click();
    // remove the link
    document.body.removeChild(downloadLink);
  }

  function export_table_to_csv(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

      csv.push(row.join(","));
    }

    // Download CSV
    download_csv(csv.join("\n"), filename);
  }

  document.querySelector("button").addEventListener("click", function () {});

  let exportTable = () => {
    console.log("clicked");
    var html = document.querySelector("table").outerHTML;
    file = $methodology_year.toString().concat("_data.csv");
    export_table_to_csv(export_data, file);
  };
</script>

<div class="overall-container">
  <button on:click="{() => exportTable()}">Export table to csv</button>
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

  .overall-container {
    pointer-events: all;
  }
</style>
