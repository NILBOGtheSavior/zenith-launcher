<script lang="ts">
    import { editMode } from "$lib/stores.js";

    let {
        icon,
        name,
        url = undefined,
        status = "online",
        onclick = undefined,
        onremove = undefined,
    } = $props();
</script>

{#if onclick}
    <button class="zn-tile" {onclick}>
        <div class="zn-tile-head">
            <span class="zn-tile-icon">{icon}</span>
        </div>
        <div class="zn-tile-name">{name}</div>
    </button>
{:else}
    <a class="zn-tile" href={url} class:editing={$editMode}>
        <div class="zn-tile-head">
            <span class="zn-tile-icon">{icon}</span>
            <span class="zn-tile-status">
                <button
                    class="zn-remove-btn"
                    onclick={(e) => {
                        e.preventDefault();
                        onremove?.();
                    }}
                    title="Remove {name}"
                >
                    <svg
                        class="zn-remove-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        ><path
                            d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m3.36 12.3c.29.29.29.77 0 1.06a.7.7 0 01-.53.22.7.7 0 01-.53-.22l-2.3-2.3-2.3 2.3a.7.7 0 01-.53.22.7.7 0 01-.53-.22.75.75 0 010-1.06l2.3-2.3-2.3-2.3a.75.75 0 010-1.06.75.75 0 011.06 0l2.3 2.3 2.3-2.3a.75.75 0 011.06 0c.29.29.29.77 0 1.06l-2.3 2.3z"
                            fill="var(--comment)"
                        /></svg
                    >
                </button>
                <span class="zn-tile-dot dot-{status}"></span>
            </span>
        </div>
        <div class="zn-tile-name">{name}</div>
    </a>
{/if}

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
        display: block;
        width: 100%;
        text-align: left;
        font-family: inherit;
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
    .zn-tile-status {
        width: 15px;
        height: 15px;
        position: relative;
    }
    .zn-tile-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        right: 0;
    }
    .dot-online,
    .dot-running {
        background: var(--green, #3fb950);
    }
    .dot-offline,
    .dot-stopped {
        background: var(--comment);
        opacity: 0.4;
    }
    .zn-tile-name {
        font-size: 11px;
        color: var(--comment);
        margin-top: 10px;
        font-weight: 400;
    }
    .zn-remove-btn {
        display: none;
        width: 100%;
        height: 100%;
        background: transparent;
        cursor: pointer;
        border: none;
        padding: 0;
        align-items: center;
        justify-content: center;
    }
    .zn-tile.editing:hover .zn-remove-btn {
        display: flex;
    }
    .zn-tile.editing:hover .zn-tile-dot {
        display: none;
    }
</style>
