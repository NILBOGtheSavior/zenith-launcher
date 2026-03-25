<div class="zn-card">
    <div class="zn-card-label">now playing</div>
    <div class="zn-now">
        <div class="zn-album">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#444" stroke-width="1" />
                <circle cx="9" cy="9" r="2" fill="#333" />
            </svg>
        </div>
        <div>
            <div class="zn-track">Midnight City</div>
            <div class="zn-artist">M83</div>
        </div>
        <div class="zn-controls">
            <button class="zn-btn" title="previous">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 3L4 7L9 11V3Z" fill="currentColor" />
                    <rect
                        x="2"
                        y="3"
                        width="1.5"
                        height="8"
                        rx="0.75"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <button class="zn-btn play" title="pause">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect
                        x="2"
                        y="2"
                        width="3.5"
                        height="10"
                        rx="1"
                        fill="currentColor"
                    />
                    <rect
                        x="8.5"
                        y="2"
                        width="3.5"
                        height="10"
                        rx="1"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <button class="zn-btn" title="next">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3L10 7L5 11V3Z" fill="currentColor" />
                    <rect
                        x="10.5"
                        y="3"
                        width="1.5"
                        height="8"
                        rx="0.75"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    </div>
    <div class="zn-progress">
        <div class="zn-progress-fill" id="progress-fill"></div>
    </div>
    <div class="zn-times">
        <span class="zn-time-txt" id="elapsed">1:52</span>
        <span class="zn-time-txt">4:48</span>
    </div>
</div>

<style>
    .zn-now {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .zn-album {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        background: #222;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .zn-track {
        font-size: 13px;
        color: var(--foreground);
        font-weight: 500;
    }

    .zn-artist {
        font-size: 11px;
        color: var(--accent);
        margin-top: 2px;
    }

    .zn-controls {
        margin-left: auto;
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .zn-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        color: var(--comment);
        transition: color 0.15s;
        display: flex;
    }

    .zn-btn:hover {
        color: var(--foreground);
    }

    .zn-btn.play {
        color: var(--accent);
    }

    .zn-progress {
        height: 2px;
        background: #222;
        border-radius: 2px;
        margin-top: 14px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    .zn-progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 38%;
        background: var(--foreground);
        border-radius: 2px;
    }

    .zn-times {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }

    .zn-time-txt {
        font-size: 10px;
        color: var(--comment);
        font-family: "JetBrains Mono", monospace;
    }
</style>
