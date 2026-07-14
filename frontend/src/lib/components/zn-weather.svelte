<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { apiFetch } from "$lib/api.js";

    type ForecastDay = {
        day: string;
        code: number;
        description: string;
        maxC: number;
        minC: number;
    };

    type Weather = {
        city: string;
        tempC: number;
        description: string;
        code: number;
        forecast: ForecastDay[];
    };

    let weather = $state<Weather | null>(null);
    let pollInterval: ReturnType<typeof setInterval>;

    async function refresh() {
        try {
            const { data } = await apiFetch("/weather/status");
            weather = data;
        } catch (err) {
            console.error("Failed to fetch weather:", err);
        }
    }

    onMount(async () => {
        await refresh();
        pollInterval = setInterval(refresh, 10 * 60 * 1000); // every 10 minutes
    });

    onDestroy(() => {
        clearInterval(pollInterval);
    });

    function iconFor(code: number) {
        if (code === 0 || code === 1) return "sun";
        if (code === 2 || code === 3) return "cloud";
        if (code === 45 || code === 48) return "fog";
        if (code >= 51 && code <= 65) return "rain";
        if (code >= 71 && code <= 75) return "snow";
        if (code >= 80 && code <= 82) return "rain";
        if (code >= 95) return "storm";
        return "cloud";
    }
</script>

{#snippet weatherIcon(code: number)}
    {#if iconFor(code) === "sun"}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4.5" stroke="var(--accent)" stroke-width="1.5" />
            <path
                d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                stroke="var(--accent)"
                stroke-width="1.5"
                stroke-linecap="round"
            />
        </svg>
    {:else if iconFor(code) === "cloud"}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.7A3.5 3.5 0 0117 18H6.5z"
                stroke="var(--comment)"
                stroke-width="1.5"
            />
        </svg>
    {:else if iconFor(code) === "rain"}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5 14a4 4 0 010-8 5.5 5.5 0 0110.6 1.7A3.5 3.5 0 0117 14H6.5z"
                stroke="var(--comment)"
                stroke-width="1.5"
            />
            <path
                d="M8 17.5l-1 2.5M12 17.5l-1 2.5M16 17.5l-1 2.5"
                stroke="var(--accent)"
                stroke-width="1.5"
                stroke-linecap="round"
            />
        </svg>
    {:else if iconFor(code) === "snow"}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5 14a4 4 0 010-8 5.5 5.5 0 0110.6 1.7A3.5 3.5 0 0117 14H6.5z"
                stroke="var(--comment)"
                stroke-width="1.5"
            />
            <circle cx="8" cy="19" r="1" fill="var(--foreground)" />
            <circle cx="12" cy="19" r="1" fill="var(--foreground)" />
            <circle cx="16" cy="19" r="1" fill="var(--foreground)" />
        </svg>
    {:else if iconFor(code) === "storm"}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5 13a4 4 0 010-8 5.5 5.5 0 0110.6 1.7A3.5 3.5 0 0117 13H6.5z"
                stroke="var(--comment)"
                stroke-width="1.5"
            />
            <path
                d="M13 13l-3 5h3l-2 4"
                stroke="var(--error)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    {:else}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.7A3.5 3.5 0 0117 18H6.5z"
                stroke="var(--comment)"
                stroke-width="1.5"
            />
        </svg>
    {/if}
{/snippet}

<div class="zn-card">
    <div class="zn-card-label">weather</div>
    {#if weather}
        <div class="zn-weather">
            <div class="zn-weather-icon">
                {@render weatherIcon(weather.code)}
            </div>
            <div>
                <div class="zn-weather-temp">
                    {weather.tempC}<span class="zn-weather-unit">°C</span>
                </div>
                <div class="zn-weather-desc">{weather.description}</div>
            </div>
            <div class="zn-weather-city">{weather.city}</div>
        </div>
        {#if weather.forecast}
            <div class="zn-forecast">
                {#each weather.forecast as day}
                    <div class="zn-forecast-day">
                        <div class="zn-forecast-label">{day.day}</div>
                        <div class="zn-forecast-icon">
                            {@render weatherIcon(day.code)}
                        </div>
                        <div class="zn-forecast-temps">
                            <span class="zn-forecast-max">{day.maxC}°</span>
                            <span class="zn-forecast-min">{day.minC}°</span>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    {:else}
        <div class="zn-weather-loading">Loading...</div>
    {/if}
</div>
<style>
    .zn-weather {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .zn-weather-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
    }

    .zn-weather-icon svg {
        width: 100%;
        height: 100%;
    }

    .zn-weather-temp {
        font-size: 22px;
        font-weight: 500;
        color: var(--foreground);
        font-family: "JetBrains Mono", monospace;
        line-height: 1;
    }

    .zn-weather-unit {
        font-size: 13px;
        color: var(--comment);
    }

    .zn-weather-desc {
        font-size: 11px;
        color: var(--comment);
        margin-top: 4px;
    }

    .zn-weather-city {
        margin-left: auto;
        font-size: 10px;
        color: var(--comment);
        font-family: "JetBrains Mono", monospace;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .zn-weather-loading {
        font-size: 12px;
        color: var(--comment);
    }

    .zn-forecast {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.zn-forecast-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.zn-forecast-label {
    font-size: 9px;
    color: var(--comment);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: "JetBrains Mono", monospace;
}

.zn-forecast-icon {
    width: 18px;
    height: 18px;
}

.zn-forecast-icon svg {
    width: 100%;
    height: 100%;
}

.zn-forecast-temps {
    display: flex;
    gap: 4px;
    font-size: 10px;
    font-family: "JetBrains Mono", monospace;
}

.zn-forecast-max {
    color: var(--foreground);
}

.zn-forecast-min {
    color: var(--comment);
}
</style>
