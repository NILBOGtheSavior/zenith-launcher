<script lang="ts">
    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api.js";
    import { searchEngine } from "$lib/stores.js";
    import { SEARCH_URLS, loadSearchEngine } from "$lib/search-engines.js";

    let searchInput: HTMLInputElement;
    let query = $state("");
    let suggestions = $state<string[]>([]);
    let activeIndex = $state(-1);
    let engine = $state("duckduckgo");
    let enginePickerOpen = $state(false);
    let debounceTimer: ReturnType<typeof setTimeout>;

    onMount(async () => {
        searchInput?.focus();
        await loadSearchEngine();
    });

    async function selectEngine(id: string) {
        engine = id;
        enginePickerOpen = false;
        try {
            await apiFetch("/settings/search_engine", {
                method: "PUT",
                body: JSON.stringify({ value: id }),
            });
        } catch (err) {
            console.error("Failed to save search engine setting:", err);
        }
        searchInput?.focus();
    }

    function handleInput(e: Event) {
        query = (e.currentTarget as HTMLInputElement).value;
        clearTimeout(debounceTimer);
        if (!query.trim()) {
            suggestions = [];
            return;
        }
        debounceTimer = setTimeout(async () => {
            try {
                const { data } = await apiFetch(
                    `/search/suggest?q=${encodeURIComponent(query)}`
                );
                suggestions = data;
                activeIndex = -1;
            } catch (err) {
                console.error("Failed to fetch suggestions:", err);
                suggestions = [];
            }
        }, 200);
    }

    function runSearch(q: string) {
        const buildUrl = SEARCH_URLS[$searchEngine] ?? SEARCH_URLS.google;
        window.location.href = buildUrl(q);
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, suggestions.length - 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, -1);
        } else if (e.key === "Enter") {
            const chosen = activeIndex >= 0 ? suggestions[activeIndex] : query;
            if (chosen.trim()) runSearch(chosen);
        } else if (e.key === "Escape") {
            suggestions = [];
        }
    }
</script>

<div class="zn-search">
    <svg
        class="zn-search-icon"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="6.5"
            cy="6.5"
            r="4.5"
            stroke="var(--comment)"
            stroke-width="1.2"
        />
        <path
            d="M10.5 10.5L14 14"
            stroke="var(--comment)"
            stroke-width="1.2"
            stroke-linecap="round"
        />
    </svg>
    <input
        placeholder="search or type a command..."
        id="search-input"
        bind:this={searchInput}
        bind:value={query}
        oninput={handleInput}
        onkeydown={handleKeydown}
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        name="zn-search-{Math.random()}"
    />

    <span class="zn-search-tag">/ cmd</span>

    {#if suggestions.length > 0}
        <ul class="zn-search-dropdown">
            {#each suggestions as suggestion, i}
                <li>
                    <button
                        class="zn-suggestion"
                        class:active={i === activeIndex}
                        onmousedown={() => runSearch(suggestion)}
                    >
                        {suggestion}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .zn-search {
        position: relative;
    }

    .zn-engine-picker {
        position: relative;
        flex-shrink: 0;
    }

    .zn-engine-btn {
        background: var(--background);
        color: var(--comment);
        border: 1px solid transparent;
        border-radius: 6px;
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        padding: 4px 10px;
        cursor: pointer;
        transition: border-color 0.15s;
    }

    .zn-engine-btn:hover {
        border-color: var(--comment);
    }

    .zn-engine-menu {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        background: var(--background);
        border-radius: 8px;
        padding: 4px;
        list-style: none;
        min-width: 120px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 10;
    }

    .zn-engine-option {
        width: 100%;
        text-align: left;
        background: transparent;
        border: none;
        color: var(--comment);
        font-family: "JetBrains Mono", monospace;
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
    }

    .zn-engine-option:hover {
        background: var(--panel);
        color: var(--foreground);
    }

    .zn-engine-option.active {
        color: var(--accent);
    }

    .zn-search-dropdown {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        background: var(--panel);
        border-radius: 12px;
        padding: 6px;
        list-style: none;
        z-index: 10;
        backdrop-filter: blur(15px);
    }

    .zn-suggestion {
        width: 100%;
        text-align: left;
        background: transparent;
        border: none;
        color: var(--foreground);
        font-size: 14px;
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
    }

    .zn-suggestion.active,
    .zn-suggestion:hover {
        background: var(--background);
    }
</style>
