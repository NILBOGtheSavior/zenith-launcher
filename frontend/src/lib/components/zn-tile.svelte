<script lang="ts">
    let { icon, name, url } = $props();
</script>

<a class="zn-tile" href={url}>
    <div class="zn-tile-head">
        <span class="zn-tile-icon">{icon}</span>
        <span class="zn-tile-dot dot-online"></span>
    </div>
    <div class="zn-tile-name">{name}</div>
</a>
