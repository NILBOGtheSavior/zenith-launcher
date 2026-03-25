<div class="zn-card">
    <div class="zn-card-label">system</div>
    <div class="zn-stat-row">
        <div class="zn-stat">
            <div class="zn-stat-val">
                42<span class="zn-stat-unit">%</span>
            </div>
            <div class="zn-stat-lbl">cpu</div>
        </div>
        <div class="zn-stat">
            <div class="zn-stat-val warn">
                5.2<span class="zn-stat-unit">G</span>
            </div>
            <div class="zn-stat-lbl">ram</div>
        </div>
        <div class="zn-stat">
            <div class="zn-stat-val good">
                67<span class="zn-stat-unit">°</span>
            </div>
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
        color: var(--foreground);
        font-family: "JetBrains Mono", monospace;
        line-height: 1;
    }

    .zn-stat-val.good {
        color: var(--accent);
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
