<script lang="ts">
    import { editMode } from "$lib/stores.js";
    let {
        name,
        url = undefined,
        onclick = undefined,
        onremove = undefined,
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
                class="zn-remove-btn"
                onclick={(e) => {
                    e.preventDefault();
                    onremove?.();
                }}
                title="remove-btn"
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

    .zn-remove-btn {
        display: none;
    }

    .zn-bookmark.editing:hover .zn-remove-icon {
        display: block;
    }

    .zn-remove-btn {
        display: none;
        background: transparent;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .zn-bookmark.editing:hover .zn-remove-btn {
        display: flex;
    }

    .zn-bookmark.editing:hover img {
        display: none;
    }
</style>
