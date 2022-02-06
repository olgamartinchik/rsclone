export default function videoControls(): string {
    return `
        <div class="controls-top">
                <button class="btn-video btn-back btn-back-js">
                    <i class="material-icons">arrow_back</i>
                </button>
                <div class="controls-right">
                    <button class="btn-video">
                        <i class="material-icons">volume_up</i>
                    </button>
                    <button class="btn-video" data-action="fullscreen">
                        <i class="material-icons">crop_free</i>
                    </button>
                </div>
                
            </div>
            <div class="controls-center">
                <button class="btn-video">
                    <i class="fas fa-undo"></i>
                </button>
                <button class="btn-video btn-play btn-play-js">
                    <i class="large material-icons play">play_circle_outline</i>
                    <i class="large material-icons pause">pause_circle_outline</i>
                </button>
                <button class="btn-video">
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