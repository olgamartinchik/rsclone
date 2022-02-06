import videoControls from './templateControls';

class VideoHandler {
    private readonly video: HTMLVideoElement;

    private readonly videoWrapper: HTMLElement;

    private readonly src: HTMLSourceElement;

    private controls: HTMLElement;

    private playBtn: HTMLElement | null;

    private backBtn: HTMLElement | null;

    private timeline: HTMLInputElement | null;

    private timeLeft: HTMLInputElement | null;

    private timeSpent: HTMLInputElement | null;

    private fullscreenBtn: HTMLInputElement | null;

    private isFullScreen: boolean;

    constructor() {
        this.videoWrapper = document.createElement('div');
        this.videoWrapper.className = 'video-wrapper';
        this.video = document.createElement('video');
        this.video.className = 'video-player';
        this.src = document.createElement('source');
        this.src.setAttribute('type', 'video/mp4');
        this.controls = document.createElement('div');
        this.controls.className = 'video-controls masked';
        this.playBtn = null;
        this.backBtn = null;
        this.timeline = null;
        this.timeLeft = null;
        this.timeSpent = null;
        this.fullscreenBtn = null;
        this.isFullScreen = false;
    }

    public createVideo(parentElement: HTMLElement, src: string): void {
        this.removeInnerContext();
        this.src.setAttribute('src', src);
        this.video.append(this.src);
        this.videoWrapper.append(this.video);
        parentElement.append(this.videoWrapper);
        document.body.style.overflow = 'hidden';

        this.renderControls();
        this.video.currentTime = 0;
        this.changeTimelineBg();
        this.video.oncanplay = (e: Event): void => {
            e.stopPropagation();
            this.setFullTime();

            if (this.currentTime > 0 && this.video.paused) {
                this.video.pause();
            } else {
                this.play();
            }
        };
    }

    private removeInnerContext(): void {
        this.videoWrapper.textContent = '';
        this.video.textContent = '';
        this.src.textContent = '';
        this.controls.textContent = '';
        this.playBtn = null;
        this.backBtn = null;
    }

    private play(): void {
        if (this.timeline) {
            this.timeline.setAttribute('max', String(this.fullTime));
        }
        this.video.play();
    }

    public toggle(): void {
        if (!this.video.paused) {
            this.video.pause();
        } else {
            this.play();
        }

        if (this.playBtn?.classList.contains('paused')) {
            this.playBtn?.classList.remove('paused');
        } else {
            this.playBtn?.classList.add('paused');
        }
    }

    public get currentTime(): number {
        return this.video.currentTime;
    }

    private set currentTime(num: number) {
        if (num <= this.fullTime) {
            this.video.currentTime = num;
        }
    }

    public get fullTime(): number {
        return this.video.duration;
    }

    public renderControls(): void {
        this.controls.textContent = '';
        this.controls.insertAdjacentHTML('afterbegin', videoControls());
        this.videoWrapper.append(this.controls);
        this.initControls();
    }

    private initControls(): void {
        this.timeSpent = this.controls.querySelector('[data-action=start-time]');
        this.timeLeft = this.controls.querySelector('[data-action=end-time]');
        this.fullscreenBtn = this.controls.querySelector('[data-action=fullscreen]');

        this.controls.onclick = (e: Event): void => {
            e.stopPropagation();
            this.controls.classList.toggle('masked');
        };
        this.playBtn = this.controls.querySelector('.btn-play-js');
        if (this.playBtn) {
            this.playBtn.onclick = (e: Event): void => {
                e.stopPropagation();
                this.toggle();
            };
        }

        this.backBtn = this.controls.querySelector('.btn-back-js');
        if (this.backBtn) {
            this.backBtn.onclick = (e: Event): void => {
                e.stopPropagation();
                this.destroy();
            };
        }

        this.timeline = this.controls.querySelector('.timeline-js');
        this.video.ontimeupdate = (e: Event): void => {
            e.stopPropagation();
            if (this.timeline) {
                this.timeline.value = String(this.currentTime);
                this.changeTimelineBg();
                this.setCurrentTime();
            }
        };

        if (this.timeline) {
            this.timeline.onchange = (e: Event): void => {
                e.stopPropagation();
                if (this.timeline) {
                    this.currentTime = parseFloat(this.timeline.value);
                    this.changeTimelineBg();
                    this.controls.classList.add('masked');
                }
            };
        }

        if (this.fullscreenBtn) {
            this.fullscreenBtn.onclick = (e: Event): void => {
                e.stopPropagation();
                if(!this.isFullScreen) {
                    this.videoWrapper.requestFullscreen();
                    this.controls.classList.add('masked');
                    this.isFullScreen = true;
                } else {
                    document.exitFullscreen();
                    this.isFullScreen = false;
                }
                
            };
        }
    }

    private changeTimelineBg(): void {
        if (this.timeline) {
            this.timeline.style.background = `linear-gradient(to right, #ff8a80 0%, #ff8a80 ${
                (this.currentTime * 100) / this.fullTime
            }%, #fff ${(this.currentTime * 100) / this.fullTime}%, #fff 100%)`;
        }
    }

    private setCurrentTime(): void {
        if (this.timeSpent) {
            let minutes = Math.floor(this.currentTime / 60);
            let seconds = Math.round(this.currentTime % 60);
            if (seconds === 60) {
                seconds = 0;
                minutes += 1;
            }

            this.timeSpent.textContent = `${minutes > 9 ? minutes : '0' + minutes}:${
                seconds > 9 ? seconds : '0' + seconds
            }`;
        }
    }

    private setFullTime(): void {
        if (this.timeLeft) {
            let minutes = Math.floor(this.fullTime / 60);
            let seconds = Math.round(this.fullTime % 60);
            if (seconds === 60) {
                seconds = 0;
                minutes += 1;
            }
            this.timeLeft.textContent = `${minutes > 9 ? minutes : '0' + minutes}:${
                seconds > 9 ? seconds : '0' + seconds
            }`;
        }
    }

    public destroy(): void {
        this.video.pause();
        this.video.currentTime = 0;
        this.removeInnerContext();
        this.videoWrapper.remove();

        document.body.style.overflow = 'auto';
    }
}

export default new VideoHandler();