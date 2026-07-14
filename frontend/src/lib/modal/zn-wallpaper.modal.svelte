<script lang="ts">
    import ZnModal from "$lib/components/zn-modal.svelte";
    import { apiFetch } from "$lib/api.js";

    let { open = false, onclose } = $props();

    type Wallpaper = { id: number; filename: string; active: number };

    let wallpapers = $state<Wallpaper[]>([]);
    let uploading = $state(false);
    let fileInput: HTMLInputElement;

    async function loadWallpapers() {
        const { data } = await apiFetch("/wallpapers");
        wallpapers = data;
    }

    $effect(() => {
        if (open) loadWallpapers();
    });

    async function handleFileSelect(e: Event) {
        const file = (e.currentTarget as HTMLInputElement).files?.[0];
        if (!file) return;

        uploading = true;
        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch("/api/wallpapers", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");
            await loadWallpapers();
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            uploading = false;
            if (fileInput) fileInput.value = "";
        }
    }

    async function toggleActive(wallpaper: Wallpaper) {
        await apiFetch(`/wallpapers/${wallpaper.id}/active`, {
            method: "PUT",
            body: JSON.stringify({ active: wallpaper.active ? 0 : 1 }),
        });
        await loadWallpapers();
    }

    async function removeWallpaper(id: number) {
        await apiFetch(`/wallpapers/${id}`, { method: "DELETE" });
        await loadWallpapers();
    }
</script>

<ZnModal {open} {onclose} title="Wallpapers">
    <button
        class="zn-upload-btn"
        onclick={() => fileInput.click()}
        disabled={uploading}
    >
        {uploading ? "Uploading..." : "+ Upload Image"}
    </button>
    <input
        bind:this={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onchange={handleFileSelect}
        hidden
    />

    {#if wallpapers.length === 0}
        <p class="zn-hint">No wallpapers uploaded yet.</p>
    {:else}
        <div class="zn-wallpaper-grid">
            {#each wallpapers as wallpaper}
                <div class="zn-wallpaper-item" class:active={wallpaper.active}>
                    <img
                        src="/api/wallpaper-files/{wallpaper.filename}"
                        alt="wallpaper"
                    />
                    <div class="zn-wallpaper-overlay">
                        <button
                            class="zn-wallpaper-toggle"
                            onclick={() => toggleActive(wallpaper)}
                            title={wallpaper.active
                                ? "Remove from rotation"
                                : "Add to rotation"}
                        >
                            {wallpaper.active ? "✓" : "+"}
                        </button>
                        <button
                            class="zn-wallpaper-delete"
                            onclick={() => removeWallpaper(wallpaper.id)}
                            title="Delete"
                        >
                            ×
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</ZnModal>

<style>
    .zn-upload-btn {
        width: 100%;
        background: var(--panel);
        color: var(--foreground);
        border: 1px dashed var(--comment);
        border-radius: 8px;
        padding: 12px;
        font-family: "JetBrains Mono", monospace;
        font-size: 12px;
        cursor: pointer;
        transition: border-color 0.15s;
        margin-bottom: 12px;
    }
    .zn-upload-btn:hover {
        border-color: var(--accent);
    }
    .zn-upload-btn:disabled {
        opacity: 0.5;
        cursor: default;
    }
    .zn-hint {
        color: var(--comment);
        font-size: 13px;
        text-align: center;
        padding: 12px 0;
    }
    .zn-wallpaper-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        max-height: 280px;
        overflow-y: auto;
    }
    .zn-wallpaper-item {
        position: relative;
        aspect-ratio: 16 / 10;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid transparent;
    }
    .zn-wallpaper-item.active {
        border-color: var(--accent);
    }
    .zn-wallpaper-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .zn-wallpaper-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.15s;
    }
    .zn-wallpaper-item:hover .zn-wallpaper-overlay {
        opacity: 1;
    }
    .zn-wallpaper-toggle,
    .zn-wallpaper-delete {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .zn-wallpaper-toggle {
        background: var(--accent);
        color: var(--background);
    }
    .zn-wallpaper-delete {
        background: var(--error);
        color: var(--background);
    }
</style>
