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

<style>
    .zn-tile {
        background: var(--panel);
        border: 1px solid transparent;
        border-radius: 10px;
        padding: 14px;
        cursor: pointer;
        transition:
            border-color 0.15s,
            background 0.15s;
        text-decoration: none;
    }

    .zn-tile:hover {
        border-color: var(--comment);
        background: var(--background);
    }

    .zn-tile-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .zn-tile-icon {
        font-size: 15px;
        font-family: "JetBrains Mono", monospace;
        font-weight: 500;
        color: var(--foreground);
    }

    .zn-tile-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-top: 2px;
    }

    .zn-tile-name {
        font-size: 11px;
        color: var(--comment);
        margin-top: 10px;
        font-weight: 400;
    }
</style>
