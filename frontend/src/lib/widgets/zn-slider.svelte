<script lang="ts">
    let {
        value = $bindable(50),
        min = 0,
        max = 100,
        step = 1,
        onchange = undefined,
    } = $props();

    function handleInput(e: Event) {
        value = Number((e.currentTarget as HTMLInputElement).value);
        onchange?.(value);
    }
</script>

<div class="zn-slider-wrap">
    <input
        class="zn-slider"
        type="range"
        {min}
        {max}
        {step}
        {value}
        oninput={handleInput}
    />
</div>

<style>
    .zn-slider-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .zn-slider {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        width: 80px;
        height: 3px;
        border-radius: 2px;
        background: var(--comment);
        accent-color: var(--comment);
        outline: none;
        cursor: pointer;
    }

    .zn-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: var(--comment);
        cursor: pointer;
        box-shadow: none;
    }

    .zn-slider::-moz-range-thumb {
        -moz-appearance: none;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: var(--comment);
        border: 1px solid #0d0d0f;
        cursor: pointer;
        box-shadow: none;
    }

    .zn-slider:active::-webkit-slider-thumb {
        background: var(--foreground);
    }

    .zn-slider:active::-moz-range-thumb {
        background: var(--foreground);
    }
</style>
