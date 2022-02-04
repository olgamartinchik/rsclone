class VideoHandler {
    private readonly video: HTMLVideoElement;

    private readonly videoWrapper: HTMLElement;

    private readonly src: HTMLSourceElement;

    constructor() {
        this.videoWrapper = document.createElement('div');
        this.videoWrapper.className = 'video-wrapper';
        this.video = document.createElement('video');
        this.video.className = 'video-player';
        this.src = document.createElement('source');
        this.src.setAttribute('type', 'video/mp4');
    }

    createVideo(parentElement: HTMLElement, src: string): void {
        this.src.setAttribute('src', src);
        this.video.append(this.src);
        this.videoWrapper.append(this.video);
        parentElement.append(this.videoWrapper);
        this.renderControls();
        document.body.style.overflow = 'hidden';

        this.play();
    }

    play(): void {
        this.video.play();
    }

    toggle(): void {
        if (!this.video.paused) {
            this.video.pause();
        } else {
            this.play();
        }
    }

    get currenTime() {
        return this.video.currentTime;
    }

    get fullTime() {
        return this.video.duration;
    }

    public renderControls() {
        const controls = document.createElement('div');
        controls.className = 'video-controls';
        controls.insertAdjacentHTML(
            'afterbegin',
            `
            <div class="controls-top">
                <button class="btn-video">
                    <i class="material-icons">arrow_back</i>
                </button>
                <div class="controls-right">
                    <button class="btn-video">
                        <i class="material-icons">volume_up</i>
                    </button>
                    <button class="btn-video">
                        <i class="material-icons">crop_free</i>
                    </button>
                </div>
                
            </div>
            <div class="controls-center">
                <button class="btn-video">
                    <i class="medium material-icons">settings_backup_restore</i>
                </button>
                <button class="btn-video">
                    <i class="large material-icons">play_circle_outline</i>
                </button>
                <button class="btn-video">
                    <i class="medium material-icons icon-reverse">settings_backup_restore</i>
                </button>
            </div>
            <div class="controls-bottom">
                <span class="time start-time" data-action="start-time">00:00</span>
                <input class="timeline" type="range" value="0" step="0.01" data-action="timeline">
                <span class="time end-time" data-action="end-time">24:35</span>
            </div>
            

        
        `
        );
        this.videoWrapper.append(controls);
    }

    destroy() {
        this.video.remove();
    }
}

export default new VideoHandler();