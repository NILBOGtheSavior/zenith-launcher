<script lang="ts">
    let { open = false, onclose, title, children } = $props();
</script>

{#if open}
    <div class="zn-overlay">
        <button class="zn-modal" onclick={(e) => e.stopPropagation()}>
            <p class="zn-card-label">{title}</p>
            {@render children()}
        </button>
    </div>
{/if}

<style>
    .zn-overlay {
        all: unset;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        cursor: default;
    }

    .zn-modal {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 400px;
        background-color: var(--background);
        padding: 16px;
        border-radius: 20px;
        backdrop-filter: blur(30px);
    }
</style>
