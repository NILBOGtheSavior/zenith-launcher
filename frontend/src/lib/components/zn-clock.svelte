<script>
    import { SvelteDate } from "svelte/reactivity";

    const date = new SvelteDate();

    const time_f = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "numeric",
    }).format(date);

    const date_f = new Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
    }).format(date);

    $effect(() => {
        const interval = setInterval(() => {
            date.setTime(Date.now());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<div class="zn-card">
    <div class="zn-clock" id="clock">{time_f}</div>
    <div class="zn-date-str" id="date-str">{date_f}</div>
</div>

<style>
    .zn-clock {
        font-family: "JetBrains Mono", monospace;
        font-size: 32px;
        font-weight: 300;
        color: var(--foreground);
        letter-spacing: -0.02em;
        line-height: 1;
    }

    .zn-date-str {
        font-size: 11px;
        color: var(--comment);
        margin-top: 6px;
        font-family: "JetBrains Mono", monospace;
    }
</style>
