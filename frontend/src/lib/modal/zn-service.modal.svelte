<script lang="ts">
    import ZnModal from "$lib/components/zn-modal.svelte";
    import { apiFetch } from "$lib/api.js";

    let { open = false, onclose, onsubmit } = $props();

    type Container = {
        id: string;
        name: string;
        image: string;
        state: string;
        status: string;
        ports: { privatePort: number; publicPort?: number; type: string }[];
    };

    let containers = $state<Container[]>([]);
    let loading = $state(false);
    let selectedContainer = $state<Container | null>(null);
    let name = $state("");
    let url = $state("");

    async function loadContainers() {
        loading = true;
        try {
            const { data } = await apiFetch("/docker/containers");
            containers = data;
        } catch (err) {
            console.error("Failed to load containers:", err);
            containers = [];
        }
        loading = false;
    }

    $effect(() => {
        if (open) {
            loadContainers();
            selectedContainer = null;
            name = "";
            url = "";
        }
    });

    function selectContainer(container: Container) {
        selectedContainer = container;
        name = container.name;

        const publicPort = container.ports.find((p) => p.publicPort)?.publicPort;
        url = publicPort
            ? `http://${window.location.hostname}:${publicPort}`
            : "";
    }

    function handleSubmit() {
        if (!selectedContainer || !name) return;
        onsubmit({
            containerName: selectedContainer.name,
            name,
            url,
        });
        onclose();
    }
</script>

<ZnModal {open} {onclose} title="Add Service">
    {#if loading}
        <p class="zn-hint">Loading containers...</p>
    {:else if containers.length === 0}
        <p class="zn-hint">No running containers found.</p>
    {:else if !selectedContainer}
        <ul class="zn-container-list">
            {#each containers as container}
                <li>
                    <button
                        class="zn-container-item"
                        onclick={() => selectContainer(container)}
                    >
                        <span class="zn-container-name">{container.name}</span>
                        <span class="zn-container-image">{container.image}</span>
                    </button>
                </li>
            {/each}
        </ul>
    {:else}
        <input class="zn-input" placeholder="Name" bind:value={name} />
        <input
            class="zn-input"
            placeholder="URL (fill in manually if blank)"
            bind:value={url}
        />
        <div class="zn-modal-actions">
            <button class="zn-btn-ghost" onclick={() => (selectedContainer = null)}>
                Back
            </button>
            <button class="zn-btn-accent" onclick={handleSubmit}>Add</button>
        </div>
    {/if}
</ZnModal>

<style>
    .zn-hint {
        color: var(--comment);
        font-size: 13px;
        text-align: center;
        padding: 12px 0;
    }
    .zn-container-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: 240px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .zn-container-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--panel);
        border: 1px solid transparent;
        border-radius: 8px;
        padding: 10px 14px;
        font-family: inherit;
        font-size: 13px;
        color: var(--foreground);
        cursor: pointer;
        transition: border-color 0.15s;
        text-align: left;
    }
    .zn-container-item:hover {
        border-color: var(--comment);
    }
    .zn-container-image {
        color: var(--comment);
        font-size: 11px;
    }
    .zn-input {
        background: var(--panel);
        border: 1px solid transparent;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 13px;
        color: var(--foreground);
        font-family: inherit;
        transition: border-color 0.15s;
        width: 100%;
        margin-bottom: 8px;
    }
    .zn-input:focus {
        border-color: var(--comment);
    }
    .zn-input::placeholder {
        color: var(--comment);
    }
    .zn-modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 4px;
    }
    .zn-btn-ghost {
        background: transparent;
        color: var(--comment);
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: color 0.15s;
    }
    .zn-btn-ghost:hover {
        color: var(--foreground);
    }
    .zn-btn-accent {
        background: var(--accent);
        color: var(--background);
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: opacity 0.15s;
    }
    .zn-btn-accent:hover {
        opacity: 0.85;
    }
</style>
