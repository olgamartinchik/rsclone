export default function videoControls(): string {
    return `
        <div class="controls-top">
                <button class="btn-video btn-back btn-back-js">
                    <i class="material-icons">arrow_back</i>
                </button>
                <div class="controls-right">
                    <button class="btn-video volume-btn volume-js">
                        <i class="material-icons volume-up">volume_up</i>
                        <i class="material-icons volume-off">volume_off</i>
                    </button>
                    <input class="volume-range volume-range-js" type="range" value="1" step="0.01" max="1" data-action="volume">
                    <button class="btn-video fullscreen" data-action="fullscreen">
                        <i class="material-icons fullscreen-on">fullscreen</i>
                        <i class="material-icons fullscreen-off">fullscreen_exit</i>
                    </button>
                </div>
                
            </div>
            <div class="controls-center">
                <button class="btn-video backward" data-action="backward">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="btn-video btn-play btn-play-js paused">
                    <i class="large material-icons play">play_circle_outline</i>
                    <i class="large material-icons pause">pause_circle_outline</i>
                </button>
                <button class="btn-video forward" data-action="forward">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
            <div class="controls-bottom">
                <span class="time start-time" data-action="start-time">00:00</span>
                <input class="timeline timeline-js" type="range" value="0" step="0.01" data-action="timeline">
                <span class="time end-time" data-action="end-time">24:35</span>
            </div>
    `;
}
