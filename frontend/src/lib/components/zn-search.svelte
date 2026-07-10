<script lang="ts">
    import { onMount } from "svelte";

    let searchInput: HTMLInputElement;

    onMount(() => {
        searchInput?.focus();
    });

    function handleSearch(e: KeyboardEvent) {
        if (e.key === "Enter") {
            const query = (e.currentTarget as HTMLInputElement).value.trim();
            if (query) {
                window.location.href = `https://www.duckduckgo.com/search?q=${encodeURIComponent(query)}`;
            }
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
    <input placeholder="search or type a command..." id="search-input"
        bind:this={searchInput}
        onkeydown={handleSearch}
    />
    <span class="zn-search-tag">/ cmd</span>
</div>
