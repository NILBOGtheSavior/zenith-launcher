<script lang="ts">
    import { editMode } from "$lib/stores.js";
    let {
        name,
        url = undefined,
        onclick = undefined,
        onedit = undefined,
    } = $props();
</script>

{#if onclick}
    <button class="zn-bookmark" {onclick}>
        <span class="zn-bookmark-icon">
            <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 3v10M3 8h10"
                    stroke="var(--comment)"
                    stroke-width="1.2"
                    stroke-linecap="round"
                />
            </svg>
        </span>
        <div class="zn-bookmark-name">{name}</div>
    </button>
{:else}
    <a class="zn-bookmark" href="https://{url}/" class:editing={$editMode}>
        <span class="zn-bookmark-icon">
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
            <img
                src="https://icons.duckduckgo.com/ip3/{url}.ico"
                alt="{name} icon"
            />
        </span>
        <div class="zn-bookmark-name">{name}</div>
    </a>
{/if}

<style>
    .zn-bookmark {
        background: var(--panel);
        border: 1px solid transparent;
        border-radius: 10px;
        padding: 14px;
        cursor: pointer;
        transition:
            border-color 0.15s,
            background 0.15s;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .zn-bookmark:hover {
        border-color: var(--comment);
        background: var(--background);
    }

    .zn-bookmark-icon {
        color: var(--comment);
        width: 15px;
        height: 15px;
        font-size: 10px;
    }

    .zn-bookmark-icon img {
        width: 100%;
        height: 100%;
    }

    .zn-bookmark-name {
        font-size: 11px;
        color: var(--comment);
        font-weight: 400;
    }

    .zn-edit-btn {
        display: none;
    }

    .zn-edit-btn {
        display: none;
        background: transparent;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .zn-bookmark.editing:hover .zn-edit-btn {
        display: flex;
    }

    .zn-bookmark.editing:hover img {
        display: none;
    }
</style>
