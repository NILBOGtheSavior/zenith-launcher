<script lang="ts">
    import ZnClock from "$lib/components/zn-clock.svelte";
    import ZnWeather from "$lib/components/zn-weather.svelte";
    import ZnSystemInfo from "$lib/components/zn-system-info.svelte";
    import ZnSearch from "$lib/components/zn-search.svelte";
    import ZnSettings from "$lib/components/zn-settings.svelte";

    import ZnService from "$lib/sections/zn-service.section.svelte";
    import ZnBookmark from "$lib/sections/zn-bookmark.section.svelte";

    import ZnToggle from "$lib/widgets/zn-toggle.svelte";
    import ZnSlider from "$lib/widgets/zn-slider.svelte";

    let servicesSection: ReturnType<typeof ZnService>;
    let brightness = $state(65);

    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api.js";

    onMount(async () => {
        try {
            const { data } = await apiFetch("/wallpapers/active");
            if (data.length > 0) {
                const random = data[Math.floor(Math.random() * data.length)];
                document.body.style.backgroundImage = `url(/api/wallpaper-files/${random.filename})`;
            }
        } catch (err) {
            console.error("Failed to load wallpaper:", err);
        }
    });
</script>

<div class="zn">
    <div class="zn-header">
        <div class="zn-wordmark">zenith</div>
        <ZnSettings />
    </div>

    <ZnSearch />
    <ZnService bind:this={servicesSection} />
    <ZnBookmark />

    <div class="zn-row">
        <ZnWeather />
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
            <ZnSlider bind:value={brightness} />
        </div>
        <span class="zn-footer-id">zenith · local</span>
    </div>
</div>
