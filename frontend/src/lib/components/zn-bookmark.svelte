<script lang="ts">
    let { name, url = undefined, onclick = undefined } = $props();
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
                    stroke="var(--foreground)"
                    stroke-width="1.2"
                    stroke-linecap="round"
                />
            </svg>
        </span>
        <div class="zn-bookmark-name">{name}</div>
    </button>
{:else}
    <a class="zn-bookmark" href="https://{url}/">
        <span class="zn-bookmark-icon">
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
</style>
