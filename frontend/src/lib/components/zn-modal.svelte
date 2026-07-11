<script lang="ts">
    import { portal } from "$lib/actions/portal.js";
    let { open = false, onclose, title, children } = $props();
</script>

{#if open}
    <div class="zn-overlay" use:portal>
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <div
            class="zn-modal"
            onclick={(e) => e.stopPropagation()}
            onkeydown={(e) => e.stopPropagation()}
            role="document"
            tabindex="-1"
        >
            <button
                class="zn-modal-close"
                onclick={onclose}
                aria-label="Close"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="var(--comment)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </button>
            <p class="zn-card-label">{title}</p>
            {@render children()}
        </div>
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
    .zn-modal-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 20px;
        height: 20px;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.15s;
    }
    .zn-modal-close:hover {
        opacity: 0.7;
    }
    .zn-modal-close svg {
        width: 100%;
        height: 100%;
    }
</style>
