<script>
    let { active = $bindable(false) } = $props();

    function toggle() {
        active = !active;
    }
</script>

<button
    class="zn-toggle"
    class:on={active}
    onclick={toggle}
    title="Toggle {active ? 'off' : 'on'}"
>
    <div class="zn-toggle-thumb"></div>
</button>

<style>
    .zn-toggle {
        position: relative;
        width: 32px;
        height: 17px;
        background: transparent;
        border: 1px solid var(--comment);
        border-radius: 9px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .zn-toggle-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: var(--comment);
        transition:
            transform 0.2s,
            background 0.2s;
    }

    .zn-toggle.on .zn-toggle-thumb {
        transform: translateX(15px);
        background: var(--foreground);
    }
</style>
