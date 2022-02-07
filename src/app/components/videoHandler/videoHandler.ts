import Utils from '../../services/utils';
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

    private volumeBtn: HTMLInputElement | null;

    private volumeRange: HTMLInputElement | null;

    private backward: HTMLInputElement | null;

    private forward: HTMLInputElement | null;

    private isFullScreen: boolean;

    private currentVolumeValue: number;

    private isVideoInstalled: boolean;

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
        this.volumeBtn = null;
        this.volumeRange = null;
        this.backward = null;
        this.forward = null;
        this.currentVolumeValue = 1;
        this.isVideoInstalled = false;
    }

    public createVideo(parentElement: HTMLElement, src: string): void {
        this.removeInnerContext();
        this.src.setAttribute('src', src);
        this.video.append(this.src);
        this.videoWrapper.append(this.video);
        parentElement.append(this.videoWrapper);
        this.isVideoInstalled = true;
        document.body.style.overflow = 'hidden';
        this.controls.className = 'video-controls masked';

        this.renderControls();
        this.video.currentTime = 0;
        this.video.volume = this.currentVolumeValue;
        this.changeTimelineBg();
        this.video.oncanplay = (e: Event): void => {
            e.stopPropagation();
            this.setFullTime();

            if (this.currentTime > 0 && this.video.paused) {
                this.video.pause();
            } else {
                this.play();
                this.playBtn?.classList.remove('paused');
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

    private togglePlayIcon(): void {
        if (this.playBtn?.classList.contains('paused')) {
            this.playBtn?.classList.remove('paused');
        } else {
            this.playBtn?.classList.add('paused');
        }
    }

    public toggle(): void {
        if (!this.video.paused) {
            this.video.pause();
        } else {
            this.play();
        }

        this.togglePlayIcon();
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
        this.volumeBtn = this.controls.querySelector('.volume-js');
        this.volumeRange = this.controls.querySelector('[data-action=volume]');
        this.backward = this.controls.querySelector('[data-action=backward]');
        this.forward = this.controls.querySelector('[data-action=forward]');

        this.controls.onclick = (e: Event): void => {
            e.stopPropagation();
            this.controls.classList.toggle('masked');
        };
        this.initPlayBtn();
        this.initBackBtn();
        this.initTimeline();
        this.initFullscreenBtn();
        this.initVolume();
        this.initBackward();
        this.initForward();
        this.initKeyEvents();
    }

    private initPlayBtn(): void {
        this.playBtn = this.controls.querySelector('.btn-play-js');
        if (this.playBtn) {
            this.playBtn.onclick = (e: Event): void => {
                e.stopPropagation();
                this.toggle();
            };
        }
    }

    private initBackBtn(): void {
        this.backBtn = this.controls.querySelector('.btn-back-js');
        if (this.backBtn) {
            this.backBtn.onclick = (e: Event): void => {
                e.stopPropagation();
                this.destroy();
            };
        }
    }

    private initTimeline(): void {
        this.timeline = this.controls.querySelector('.timeline-js');
        this.video.ontimeupdate = (e: Event): void => {
            e.stopPropagation();
            if (this.timeline) {
                this.timeline.value = String(this.currentTime);
                this.changeTimelineBg();
                this.setCurrentTime();

                if (this.video.ended) {
                    this.playBtn?.classList.add('paused');
                }
            }
        };

        if (this.timeline) {
            this.timeline.addEventListener('click', this.stopPropClick.bind(this));

            this.timeline.oninput = (e: Event): void => {
                e.stopPropagation();
                if (this.timeline) {
                    this.currentTime = parseFloat(this.timeline.value);
                    this.timeline.blur();
                    this.changeTimelineBg();
                }
            };
        }
    }

    private initFullscreenBtn(): void {
        if (this.fullscreenBtn) {
            this.fullscreenBtn.onclick = (e: Event): void => this.handleFullScreen(e);
        }
    }

    private handleFullScreen(e: Event): void {
        e.stopPropagation();
        if (!this.isFullScreen) {
            this.goFullScreen();
        } else {
            this.exitFullScreen();
        }
        this.controls.classList.add('masked');
    }

    private goFullScreen(): void {
        this.videoWrapper.requestFullscreen();
        this.isFullScreen = true;
        this.fullscreenBtn?.classList.add('full');
    }

    private exitFullScreen(): void {
        document.exitFullscreen();
        this.isFullScreen = false;
        this.fullscreenBtn?.classList.remove('full');
    }

    private initVolume(): void {
        if (this.volumeBtn && this.volumeRange) {
            this.changeVolumeBg();
            this.volumeBtn.onclick = (e: MouseEvent): void => {
                e.stopPropagation();
                if (this.video.volume > 0) {
                    this.video.volume = 0;
                    this.volumeRange!.value = String(0);
                } else {
                    this.video.volume = this.currentVolumeValue;
                    this.volumeRange!.value = String(this.currentVolumeValue);
                }

                this.toggleMute();
                this.changeVolumeBg();
            };
            this.volumeRange.addEventListener('click', this.stopPropClick.bind(this));
            this.volumeRange.oninput = (ev: Event): void => {
                ev.stopPropagation();
                ev.preventDefault();
                this.changeVolumeLevel();
            };
        }
    }

    private stopPropClick(e: Event): void {
        e.stopPropagation();
    }

    private changeVolumeLevel(): void {
        this.currentVolumeValue = this.video.volume;
        const currVolVal = parseFloat(this.volumeRange!.value);
        this.video.volume = currVolVal;
        this.changeVolumeBg();

        if (currVolVal === 0) {
            this.volumeBtn?.classList.add('mute');
        } else {
            this.volumeBtn?.classList.remove('mute');
        }
    }

    private changeVolumeBg(): void {
        if (this.volumeRange) {
            const currVolVal = parseFloat(this.volumeRange.value);

            this.volumeRange.style.background = `linear-gradient(to right, #ff8a80 0%, #ff8a80 ${
                currVolVal * 100
            }%, #fff ${currVolVal * 100}%, #fff 100%)`;
        }
    }

    private toggleMute(): void {
        this.volumeBtn?.classList.toggle('mute');
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
            const time = Utils.getTime(this.currentTime);
            this.timeSpent.textContent = time;
        }
    }

    private setFullTime(): void {
        if (this.timeLeft) {
            const time = Utils.getTime(this.fullTime);
            this.timeLeft.textContent = time;
        }
    }

    private initBackward(): void {
        if (this.backward) {
            this.backward.onclick = (e: Event) => this.goBackward(e);
        }
    }

    private initForward(): void {
        if (this.forward) {
            this.forward.onclick = (e: Event) => this.goForward(e);
        }
    }

    private goForward(e: Event): void {
        e.stopPropagation();
        this.video.currentTime += 15;
    }

    private goBackward(e: Event): void {
        e.stopPropagation();
        this.video.currentTime -= 15;
    }

    private initKeyEvents() {
        document.onkeydown = (e: KeyboardEvent) => this.toggleKeyEvent(e);
    }

    private toggleKeyEvent(e: KeyboardEvent): boolean | void {
        e.stopPropagation();
        if (!this.isVideoInstalled) return;

        if (e.code === 'Space') {
            e.preventDefault();
            this.video.focus();
            this.toggle();
            return false;
        }

        if (e.code === 'KeyM') {
            this.video.focus();
            if (this.video.volume === 0) {
                this.video.volume = this.currentVolumeValue;
                this.volumeRange!.value = `${this.currentVolumeValue}`;
            } else {
                this.video.volume = 0;
                this.volumeRange!.value = String(0);
            }
            this.toggleMute();
            this.changeVolumeBg();
        }

        if (e.code === 'KeyF') {
            this.handleFullScreen(e);
        }

        if (e.code === 'ArrowRight') {
            this.goForward(e);
        }

        if (e.code === 'ArrowLeft') {
            this.goBackward(e);
        }
    }

    public destroy(): void {
        this.video.currentTime = 0;
        this.video.pause();
        this.video.volume = 0;
        this.removeInnerContext();
        this.videoWrapper.remove();
        this.isVideoInstalled = false;
        this.volumeRange?.removeEventListener('click', this.stopPropClick.bind(this));
        this.timeline?.removeEventListener('click', this.stopPropClick.bind(this));

        document.body.style.overflow = 'auto';
    }
}

export default new VideoHandler();
