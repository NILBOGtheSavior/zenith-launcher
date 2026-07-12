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
    <div class="zn-search-bar">
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
    </div>

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
        align-items: center;
        background: var(--panel);
        border: 1px solid transparent;
        border-radius: 12px;
        padding: 0 16px;
        min-height: 52px;
        gap: 12px;
        margin-bottom: 28px;
        transition: border-color 0.15s;
    }

    .zn-search:focus-within {
        border-color: var(--comment);
    }

    .zn-search-bar {
        width: 100%;
        height: 52px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .zn-search-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }

    .zn-search input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-size: 15px;
        color: var(--foreground);
    }

    .zn-search input::placeholder {
        color: var(--comment);
    }

    .zn-search-tag {
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        color: var(--comment);
        background: var(--background);
        border: 1px solid rgba(93, 202, 165, 0.2);
        border-radius: 6px;
        padding: 3px 8px;
        flex-shrink: 0;
    }

    .zn-search-dropdown {
        border-radius: 12px;
        list-style: none;
        z-index: 10;
        /* max-height: 100px; */
        /* overflow-y: scroll; */
    }

    .zn-suggestion {
        width: 100%;
        text-align: left;
        background: transparent;
        border-top: solid 1px var(--comment);
        color: var(--comment);
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        font-family: inherit;
    }

    .zn-suggestion.active,
    .zn-suggestion:hover {
        background: var(--background);
    }
</style>
