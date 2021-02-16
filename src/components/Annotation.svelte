<script>
  export let content;
  export let top;
  export let left;
</script>

<div class="annotation-container" style="top:{top}px;left:{left}px;">
  <span class="annotation">{content}</span>
</div>

<style>
  .annotation-container {
    max-width: 8rem;
    /* top: 20vh;
    left: 40vw; */
    position: absolute;
  }
</style>
