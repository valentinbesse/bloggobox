<script lang="ts">
  export let data;
</script>

<h1>Bloggobox</h1>

<ul>
  {#each data.articles as article}
    <li>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </li>
  {/each}
</ul>
