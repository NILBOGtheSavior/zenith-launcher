<script lang="ts">
    type Option = { id: string; label: string; icon?: unknown };

    let {
        options = [],
        value = $bindable(""),
        onchange = undefined,
        icon = undefined,
    }: {
        options: Option[];
        value: string;
        onchange?: (id: string) => void;
        icon?: (option: Option) => any;
    } = $props();

    let open = $state(false);

    function select(id: string) {
        value = id;
        open = false;
        onchange?.(id);
    }

    function selected() {
        return options.find((o) => o.id === value);
    }
</script>

<div class="zn-dropdown">
    <button class="zn-dropdown-btn" onclick={() => (open = !open)}>
        {#if icon && selected()}
            <span class="zn-dropdown-icon">{@render icon(selected())}</span>
        {/if}
        {selected()?.label ?? "Select"}
    </button>
    {#if open}
        <ul class="zn-dropdown-menu">
            {#each options as opt}
                <li>
                    <button
                        class="zn-dropdown-option"
                        class:active={opt.id === value}
                        onclick={() => select(opt.id)}
                    >
                        {#if icon}
                            <span class="zn-dropdown-icon">{@render icon(opt)}</span>
                        {/if}
                        {opt.label}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .zn-dropdown {
        position: relative;
        flex-shrink: 0;
    }

    .zn-dropdown-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        background: var(--background);
        color: var(--comment);
        border: 1px solid transparent;
        border-radius: 6px;
        font-family: "JetBrains Mono", monospace;
        font-size: 11px;
        padding: 4px 10px;
        cursor: pointer;
        transition: border-color 0.15s;
    }

    .zn-dropdown-btn:hover {
        border-color: var(--comment);
    }

    .zn-dropdown-menu {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        background: var(--background);
        border-radius: 8px;
        padding: 4px;
        list-style: none;
        min-width: 120px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 10;
    }

    .zn-dropdown-option {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        text-align: left;
        background: transparent;
        border: none;
        color: var(--comment);
        font-family: "JetBrains Mono", monospace;
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
    }

    .zn-dropdown-option:hover {
        background: var(--panel);
        color: var(--foreground);
    }

    .zn-dropdown-option.active {
        color: var(--accent);
    }

    .zn-dropdown-icon {
        display: flex;
        align-items: center;
        width: 14px;
        height: 14px;
        flex-shrink: 0;
    }
</style>
