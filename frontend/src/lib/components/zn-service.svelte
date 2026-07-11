<script lang="ts">
    import { editMode } from "$lib/stores.js";

    let {
        icon,
        name,
        url = undefined,
        status = "online",
        onclick = undefined,
        onedit = undefined,
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
                    class="zn-edit-btn"
                    onclick={(e) => {
                        e.preventDefault();
                        onedit?.();
                    }}
                    title="Edit {name}"
                >
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z" fill=var(--comment)></path> <path d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z" fill=var(--comment)></path> </g></svg>
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
    .zn-edit-btn {
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
    .zn-tile.editing:hover .zn-edit-btn {
        display: flex;
    }
    .zn-tile.editing:hover .zn-tile-dot {
        display: none;
    }
</style>
