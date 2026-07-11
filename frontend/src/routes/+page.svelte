<script lang="ts">
    import ZnClock from "$lib/components/zn-clock.svelte";
    import ZnNowPlaying from "$lib/components/zn-now-playing.svelte";
    import ZnSystemInfo from "$lib/components/zn-system-info.svelte";
    import ZnSearch from "$lib/components/zn-search.svelte";

    import ZnService from "$lib/sections/zn-service.section.svelte";
    import ZnBookmark from "$lib/sections/zn-bookmark.section.svelte";

    import ZnToggle from "$lib/widgets/zn-toggle.svelte";
    import { editMode } from "$lib/stores.js";

</script>

<div class="zn">
    <div class="zn-header">
        <div class="zn-wordmark">zenith</div>
        <div class="zn-settings">
            <div class="zn-settings-tray">
                <span class="zn-lbl">Edit Mode</span>
                <ZnToggle bind:active={$editMode} />
            </div>
            <svg
                class="zn-settings-icon"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke="var(--comment)"
                    stroke-width="2"
                    d="m39.2 26 .1-2-.1-2 4.3-3.4a1 1 0 00.3-1.3l-4.1-7.1a1 1 0 00-1.3-.4l-5.1 2.1a16 16 0 00-3.5-2L29 4.5a1 1 0 00-1-.9h-8.1a1 1 0 00-1 .9l-.8 5.4a15 15 0 00-3.5 2L9.5 9.8a1 1 0 00-1.3.4l-4 7.1a1 1 0 00.3 1.3L8.8 22l-.1 2 .1 2-4.4 3.4a1 1 0 00-.3 1.3l4.1 7.1a1 1 0 001.3.4l5.1-2.1a16 16 0 003.5 2l.8 5.4a1 1 0 001 .9h8.2a1 1 0 001-.9l.8-5.4a15 15 0 003.5-2l5.1 2.1a1 1 0 001.3-.4l4.1-7.1a1 1 0 00-.3-1.3ZM24 31.2a7.2 7.2 0 117.2-7.2 7 7 0 01-7.2 7.2"
                /></svg
            >
        </div>
    </div>

    <ZnSearch />
    <ZnService />
    <ZnBookmark />

    <div class="zn-row">
        <ZnNowPlaying />
        <div class="zn-col">
            <ZnSystemInfo />
            <ZnClock />
        </div>
    </div>

    <div class="zn-footer">
        <div class="zn-footer-group">
            <span class="zn-footer-lbl">matrix</span>
            <ZnToggle />
        </div>
        <div class="zn-footer-group">
            <span class="zn-footer-lbl">brightness</span>
            <div class="zn-slider-wrap">
                <input
                    class="zn-slider"
                    type="range"
                    min="0"
                    max="100"
                    value="65"
                    id="brightness"
                />
            </div>
        </div>
        <span class="zn-footer-id">zenith · local</span>
    </div>
</div>
