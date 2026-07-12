<script lang="ts">
    import ZnDropdown from "$lib/widgets/zn-dropdown.svelte";
    import ZnToggle from "$lib/widgets/zn-toggle.svelte";
    import ZnSlider from "$lib/widgets/zn-slider.svelte";

    import { editMode } from "$lib/stores.js";
    import { searchEngine } from "$lib/stores.js";
    import { ENGINES, saveSearchEngine, loadSearchEngine } from "$lib/search-engines.js"

    let settingsOpen = $state(false);
    let overflowVisible = $state(false);

    function handleTrayTransitionEnd(e: TransitionEvent) {
        if (e.propertyName === "max-width" && settingsOpen) {
            overflowVisible = true;
        }
    }

    $effect(() => {
        if (!settingsOpen) {
            overflowVisible = false;
        }
    });
</script>

<div class="zn-settings">
    <button
        class="zn-refresh-icon"
        onclick={() => servicesSection.refresh()}
        title="Refresh service status"
    >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 12a8 8 0 10-2.34 5.66M20 12v-5m0 5h-5"
                stroke="var(--comment)"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </button>
    <div
        class="zn-settings-tray"
        class:open={settingsOpen}
        class:overflow-visible={overflowVisible}
        ontransitionend={handleTrayTransitionEnd}
    >
        <span class="zn-lbl">Search Engine</span>
        <ZnDropdown
            options={ENGINES}
            value={$searchEngine}
            onchange={saveSearchEngine}
        />
        <span class="zn-lbl">Edit Mode</span>
        <ZnToggle bind:active={$editMode} />
    </div>
    <button
        class="zn-gear-icon"
        onclick={() => (settingsOpen = !settingsOpen)}
        aria-label="Settings"
    >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
            ><path
                stroke="var(--comment)"
                stroke-width="2"
                d="m39.2 26 .1-2-.1-2 4.3-3.4a1 1 0 00.3-1.3l-4.1-7.1a1 1 0 00-1.3-.4l-5.1 2.1a16 16 0 00-3.5-2L29 4.5a1 1 0 00-1-.9h-8.1a1 1 0 00-1 .9l-.8 5.4a15 15 0 00-3.5 2L9.5 9.8a1 1 0 00-1.3.4l-4 7.1a1 1 0 00.3 1.3L8.8 22l-.1 2 .1 2-4.4 3.4a1 1 0 00-.3 1.3l4.1 7.1a1 1 0 001.3.4l5.1-2.1a16 16 0 003.5 2l.8 5.4a1 1 0 001 .9h8.2a1 1 0 001-.9l.8-5.4a15 15 0 003.5-2l5.1 2.1a1 1 0 001.3-.4l4.1-7.1a1 1 0 00-.3-1.3ZM24 31.2a7.2 7.2 0 117.2-7.2 7 7 0 01-7.2 7.2"
            /></svg
        >
    </button>
</div>

<style>
    .zn-settings {
        display: flex;
        gap: 10px;
        align-items: center;
        border-radius: 20px;
        transition:
            border-color 0.3s ease;
    }

    .zn-refresh-icon {
        width: 16px;
        height: 16px;
        cursor: pointer;
        background: transparent;
        padding: 0;
        display: flex;
    }

    .zn-refresh-icon svg {
        width: 100%;
        height: 100%;
    }

    .zn-gear-icon {
        all: unset;
        width: 16px;
        height: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .zn-gear-icon svg {
        width: 100%;
        height: 100%;
    }

    .zn-settings-tray {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 10px;
        max-width: 0;
        overflow: hidden;
        transition:
            max-width 0.3s ease,
            opacity 0.3s ease;
        opacity: 0;
    }

    .zn-settings-tray > * {
        flex-shrink: 0;
    }

    .zn-settings-tray.open {
        max-width: 500px;
        opacity: 1;
    }

    .zn-settings-tray.overflow-visible {
        overflow: visible;
    }
</style>
