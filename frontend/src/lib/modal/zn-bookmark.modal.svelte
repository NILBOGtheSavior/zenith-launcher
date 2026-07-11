<script lang="ts">
    import ZnModal from "$lib/components/zn-modal.svelte";

    let {
        open = false,
        editing = null,
        onclose,
        onsubmit,
        ondelete
    } = $props();

    let url = $state("");
    let name = $state("");

    $effect(() => {
        if (open) {
            url = editing?.url ?? "";
            name = editing?.title ?? "";
        }
    });

    function handleSubmit() {
        if (!url) return;
        onsubmit({ url, name, id: editing?.id });
        onclose();
    }

    function handleDelete() {
        ondelete?.(editing.id);
        onclose();
    }
</script>

<ZnModal {open} {onclose} title={editing ? "Edit Bookmark" : "Add Bookmark"}>
    <input class="zn-input" placeholder="URL" bind:value={url} />
    <input class="zn-input" placeholder="Name (optional)" bind:value={name} />
    <div class="zn-modal-actions">
        {#if editing}
            <button class="zn-btn-danger" onclick={handleDelete}>Delete</button>
        {/if}
        <button class="zn-btn-accent" onclick={handleSubmit}>{editing ? "Save" : "Add"}</button>
    </div>
</ZnModal>

<style>
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

    .zn-btn-danger {
        background: transparent;
        color: var(--error);
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: opacity 0.15s;
    }

    .zn-btn-danger:hover {
        opacity: 0.7;
    }
</style>
