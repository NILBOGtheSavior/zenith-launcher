<script lang="ts">
    let { name, url } = $props();
</script>

<a class="zn-bookmark" href="https://{url}/">
    <span class="zn-bookmark-icon">
        <img
            src="https://icons.duckduckgo.com/ip3/{url}.ico"
            alt="{name} icon"
        />
    </span>
    <div class="zn-bookmark-name">{name}</div>
</a>
