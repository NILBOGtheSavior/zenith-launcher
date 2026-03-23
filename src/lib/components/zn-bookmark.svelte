<script lang="ts">
    let { name, url } = $props();
</script>

<a class="zn-bookmark" href={url}>
    <span class="zn-bookmark-icon">
        <img src="{url}/favicon.ico" alt="{name} icon" />
    </span>
    <div class="zn-bookmark-name">{name}</div>
</a>
