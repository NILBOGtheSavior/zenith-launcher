<script lang="ts">
    import ZnBookmark from "$lib/components/zn-bookmark.svelte";
    import ZnClock from "$lib/components/zn-clock.svelte";
    import ZnNowPlaying from "$lib/components/zn-now-playing.svelte";
    import ZnSystemInfo from "$lib/components/zn-system-info.svelte";
    import ZnTile from "$lib/components/zn-tile.svelte";
</script>

<div class="zn">
    <div class="zn-wordmark">zenith</div>
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
        <input placeholder="search or type a command..." id="search-input" />
        <span class="zn-search-tag">/ cmd</span>
    </div>

    <div class="zn-grid">
        <ZnTile icon="HA" name="Home Assistant" url="#" />
        <ZnTile icon="ND" name="Navidrome" url="#" />
        <ZnTile icon="PH" name="PiHole" url="#" />
        <ZnTile icon="IM" name="Immich" url="#" />
        <ZnTile icon="BK" name="Booklore" url="#" />
        <ZnTile icon="MS" name="Mainsail" url="#" />
    </div>

    <div class="zn-grid">
        <ZnBookmark name="GitHub" url="github.com" />
        <ZnBookmark name="GitLab" url="gitlab.com" />
        <ZnBookmark name="Stack Overflow" url="stackoverflow.com" />
        <ZnBookmark name="YouTube" url="youtube.com" />
        <ZnBookmark name="Reddit" url="reddit.com" />
        <ZnBookmark name="Hacker News" url="news.ycombinator.com" />
        <ZnBookmark name="Mozilla Developer" url="developer.mozilla.org" />
        <ZnBookmark name="Crunchyroll" url="crunchyroll.com" />
    </div>

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
            <div class="zn-toggle on" id="matrix-toggle">
                <div class="zn-toggle-thumb"></div>
            </div>
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
