<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { apiFetch } from "$lib/api.js";

    type SystemStatus = {
        cpu: number;
        memory: { totalMb: number; usedMb: number; percent: number };
        temperature: number | null;
    };

    let status = $state<SystemStatus | null>(null);
    let pollInterval: ReturnType<typeof setInterval>;

    async function refresh() {
        try {
            const { data } = await apiFetch("/system/status");
            status = data;
        } catch (err) {
            console.error("Failed to fetch system status:", err);
        }
    }

    onMount(async () => {
        await refresh();
        pollInterval = setInterval(refresh, 5000);
    });

    onDestroy(() => {
        clearInterval(pollInterval);
    });

    function ramGb(mb: number) {
        return (mb / 1024).toFixed(1);
    }
</script>

<div class="zn-card">
    <div class="zn-card-label">system</div>
    <div class="zn-stat-row">
        <div class="zn-stat">
            <div class="zn-stat-val" class:warn={(status?.cpu ?? 0) > 80}>
                {status?.cpu ?? "--"}<span class="zn-stat-unit">%</span>
            </div>
            <div class="zn-stat-lbl">cpu</div>
        </div>
        <div class="zn-stat">
            <div
                class="zn-stat-val"
                class:warn={(status?.memory.percent ?? 0) > 80}
            >
                {status ? ramGb(status.memory.usedMb) : "--"}<span
                    class="zn-stat-unit">G</span
                >
            </div>
            <div class="zn-stat-lbl">ram</div>
        </div>
        <div class="zn-stat">
            {#if status?.temperature != null}
                <div class="zn-stat-val" class:warn={status.temperature > 70}>
                    {status.temperature}<span class="zn-stat-unit">°</span>
                </div>
            {:else}
                <div class="zn-stat-val">--</div>
            {/if}
            <div class="zn-stat-lbl">temp</div>
        </div>
    </div>
</div>

<style>
    .zn-stat-row {
        display: flex;
        gap: 10px;
    }
    .zn-stat {
        flex: 1;
    }
    .zn-stat-val {
        font-size: 22px;
        font-weight: 500;
        color: var(--accent);
        font-family: "JetBrains Mono", monospace;
        line-height: 1;
    }
    .zn-stat-val.warn {
        color: var(--error);
    }
    .zn-stat-unit {
        font-size: 13px;
        color: var(--comment);
    }
    .zn-stat-lbl {
        font-size: 10px;
        color: var(--comment);
        margin-top: 4px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-family: "JetBrains Mono", monospace;
    }
</style>
