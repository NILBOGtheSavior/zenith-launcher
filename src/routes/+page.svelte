<div class="zn">
    <div class="zn-wordmark">zenith</div>

    <div class="nx-search">
        <svg
            class="nx-search-icon"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="6.5"
                cy="6.5"
                r="4.5"
                stroke="#e8e6e0"
                stroke-width="1.2"
            />
            <path
                d="M10.5 10.5L14 14"
                stroke="#e8e6e0"
                stroke-width="1.2"
                stroke-linecap="round"
            />
        </svg>
        <input placeholder="search or type a command..." id="search-input" />
        <span class="nx-search-tag">/ cmd</span>
    </div>

    <div class="nx-grid">
        <a class="nx-tile" href="#">
            <div class="nx-tile-head">
                <span class="nx-tile-icon">HA</span>
                <span class="nx-tile-dot dot-online"></span>
            </div>
            <div class="nx-tile-name">Home Assistant</div>
        </a>
        <a class="nx-tile" href="#">
            <div class="nx-tile-head">
                <span class="nx-tile-icon">ND</span>
                <span class="nx-tile-dot dot-online"></span>
            </div>
            <div class="nx-tile-name">Navidrome</div>
        </a>
        <a class="nx-tile" href="#">
            <div class="nx-tile-head">
                <span class="nx-tile-icon">IM</span>
                <span class="nx-tile-dot dot-online"></span>
            </div>
            <div class="nx-tile-name">Immich</div>
        </a>
        <a class="nx-tile" href="#">
            <div class="nx-tile-head">
                <span class="nx-tile-icon">BK</span>
                <span class="nx-tile-dot dot-warn"></span>
            </div>
            <div class="nx-tile-name">Booklore</div>
        </a>
    </div>

    <div class="nx-row">
        <div class="nx-card">
            <div class="nx-card-label">now playing</div>
            <div class="nx-now">
                <div class="nx-album">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle
                            cx="9"
                            cy="9"
                            r="7"
                            stroke="#444"
                            stroke-width="1"
                        />
                        <circle cx="9" cy="9" r="2" fill="#333" />
                    </svg>
                </div>
                <div>
                    <div class="nx-track">Midnight City</div>
                    <div class="nx-artist">M83</div>
                </div>
                <div class="nx-controls">
                    <button class="nx-btn" title="previous">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
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
                    <button class="nx-btn play" title="pause">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
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
                    <button class="nx-btn" title="next">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
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
            <div class="nx-progress">
                <div class="nx-progress-fill" id="progress-fill"></div>
            </div>
            <div class="nx-times">
                <span class="nx-time-txt" id="elapsed">1:52</span>
                <span class="nx-time-txt">4:48</span>
            </div>
        </div>

        <div class="nx-right-col">
            <div class="nx-card">
                <div class="nx-card-label">system</div>
                <div class="nx-stat-row">
                    <div class="nx-stat">
                        <div class="nx-stat-val">
                            42<span class="nx-stat-unit">%</span>
                        </div>
                        <div class="nx-stat-lbl">cpu</div>
                    </div>
                    <div class="nx-stat">
                        <div class="nx-stat-val">
                            5.2<span class="nx-stat-unit">G</span>
                        </div>
                        <div class="nx-stat-lbl">ram</div>
                    </div>
                    <div class="nx-stat">
                        <div class="nx-stat-val good">
                            67<span class="nx-stat-unit">°</span>
                        </div>
                        <div class="nx-stat-lbl">temp</div>
                    </div>
                </div>
            </div>
            <div class="nx-card nx-time-card">
                <div class="nx-clock" id="clock">--:--</div>
                <div class="nx-date-str" id="date-str">loading...</div>
            </div>
        </div>
    </div>

    <div class="zn-footer">
        <div class="nx-footer-group">
            <span class="nx-footer-lbl">MATRIX</span>
            <div class="nx-toggle on" id="matrix-toggle">
                <div class="nx-toggle-thumb"></div>
            </div>
        </div>
        <div class="nx-footer-group">
            <span class="nx-footer-lbl">BRIGHT</span>
            <div class="nx-slider-wrap">
                <input
                    class="nx-slider"
                    type="range"
                    min="0"
                    max="100"
                    value="65"
                    id="brightness"
                />
            </div>
        </div>
        <span class="zn-footer-id">zenith · local</span>
    </div>
</div>
