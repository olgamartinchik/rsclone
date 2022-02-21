import Utils from '../../services/utils';
import videoControls from './templateControls';
import Timer from '../timer/timer';
import preloader from '../preloader/preloader';
import Card from '../card/card';
import { TSettings, TStatData } from '../../services/types';
import StatTracker from '../../services/statTracker';

class VideoHandler {
    private video: HTMLVideoElement | null;

    private readonly timer: Timer;

    private readonly videoWrapper: HTMLElement;

    private src: HTMLSourceElement | null;

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

    private preloader: HTMLElement;

    private tracker: StatTracker;

    private onEndVideo: (id?: string, time?: TStatData) => void;

    constructor() {
        this.timer = new Timer();
        this.tracker = new StatTracker();
        this.preloader = preloader.getTemplate();
        this.videoWrapper = document.createElement('div');
        this.videoWrapper.className = 'video-wrapper';
        this.video = null;
        this.src = null;
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
        this.onEndVideo = () => {};
    }

    public createVideo(
        parentElement: HTMLElement,
        src: string,
        card: Card,
        callback: (id?: string, time?: TStatData) => void,
        settings?: TSettings
    ): void {
        this.onEndVideo = callback;
        this.removeInnerContext();
        this.initVideo(parentElement, src, card.id);
        this.tracker.reset();
        if (settings) {
            this.tracker.startTracking(card.data.caloriesPerMinute, settings);
        }
        this.video?.removeEventListener('canplay', this.onCanPlay.bind(this));
        this.video?.removeEventListener('ended', this.onVideoEnded.bind(this));
        this.video?.addEventListener('canplay', this.onCanPlay.bind(this));
        this.video?.addEventListener('ended', this.onVideoEnded.bind(this));
    }

    private onCanPlay(e: Event) {
        e.stopPropagation();
        this.setFullTime();

        if (this.currentTime > 0 && this.video!.paused) {
            this.video!.pause();
        } else {
            this.play();
            this.playBtn?.classList.remove('paused');
        }
        this.preloader.remove();
    }

    private onVideoEnded(e: Event): void {
        e.stopPropagation();
        this.stopVideo();
    }

    private stopVideo(): void {
        this.tracker.stopTracking();
        if (this.onEndVideo) {
            this.onEndVideo(this.video!.id, this.tracker.getTrackData());
        }
    }

    private initVideo(parentElement: HTMLElement, src: string, id: string | void): void {
        this.video = document.createElement('video');
        this.video.className = 'video-player';
        if (id) {
            this.video.id = id;
        }

        this.src = document.createElement('source');
        this.src.setAttribute('type', 'video/mp4');
        this.src.setAttribute('src', src);
        this.video.append(this.src);
        this.videoWrapper.append(this.video);
        this.videoWrapper.append(this.preloader);
        parentElement.append(this.videoWrapper);
        this.isVideoInstalled = true;
        this.controls.className = 'video-controls masked';

        this.renderControls();
        this.video.currentTime = 0;
        this.video.volume = this.currentVolumeValue;
        this.changeTimelineBg();
        this.timer.createTimer(this.videoWrapper, 0);
        this.timer.createCaloriesTimer(this.videoWrapper);
    }

    private removeInnerContext(): void {
        this.videoWrapper.textContent = '';
        if (this.src) this.src.remove();
        this.controls.textContent = '';
        this.playBtn = null;
        this.backBtn = null;
    }

    private play(): void {
        if (this.timeline) {
            this.timeline.setAttribute('max', String(this.fullTime));
        }
        this.video!.play();
    }

    private togglePlayIcon(): void {
        if (this.playBtn?.classList.contains('paused')) {
            this.playBtn?.classList.remove('paused');
        } else {
            this.playBtn?.classList.add('paused');
        }
    }

    public toggle(): void {
        if (!this.video!.paused) {
            this.video!.pause();
            this.tracker.stopTracking();
        } else {
            this.play();
            this.tracker.continueTracking();
        }

        this.togglePlayIcon();
    }

    public get currentTime(): number {
        return this.video!.currentTime;
    }

    private set currentTime(num: number) {
        if (num <= this.fullTime) {
            this.video!.currentTime = num;
        }
    }

    public get fullTime(): number {
        return this.video!.duration;
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
        if (this.video) {
            this.video.ontimeupdate = (e: Event): void => {
                e.stopPropagation();
                this.timer.setTime(this.fullTime - this.currentTime, this.fullTime);
                this.timer.updateCaloriesTimer(this.tracker.getCalories());

                if (this.timeline) {
                    this.timeline.value = String(this.currentTime);
                    this.changeTimelineBg();
                    this.setCurrentTime();

                    if (this.video!.ended) {
                        this.playBtn?.classList.add('paused');
                    }
                }
            };
        }

        if (this.timeline) {
            this.timeline.addEventListener('click', this.stopPropClick.bind(this));

            this.timeline.oninput = (e: Event): void => {
                this.videoWrapper.append(this.preloader);
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
                if (this.video!.volume > 0) {
                    this.video!.volume = 0;
                    this.volumeRange!.value = String(0);
                } else {
                    this.video!.volume = this.currentVolumeValue;
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
        this.currentVolumeValue = this.video!.volume;
        const currVolVal = parseFloat(this.volumeRange!.value);
        this.video!.volume = currVolVal;
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
        this.video!.currentTime += 15;
    }

    private goBackward(e: Event): void {
        e.stopPropagation();
        this.video!.currentTime -= 15;
    }

    private initKeyEvents() {
        document.onkeydown = (e: KeyboardEvent) => this.toggleKeyEvent(e);
    }

    private toggleKeyEvent(e: KeyboardEvent): boolean | void {
        e.stopPropagation();
        if (!this.isVideoInstalled) return;

        if (e.code === 'Space') {
            e.preventDefault();
            this.video!.focus();
            this.toggle();
            return false;
        }

        if (e.code === 'KeyM') {
            this.video!.focus();
            if (this.video!.volume === 0) {
                this.video!.volume = this.currentVolumeValue;
                this.volumeRange!.value = `${this.currentVolumeValue}`;
            } else {
                this.video!.volume = 0;
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
        if (this.video) {
            this.video.pause();
            this.video.volume = 0;
        }

        this.removeInnerContext();
        this.preloader.remove();
        this.videoWrapper.remove();
        this.isVideoInstalled = false;
        this.volumeRange?.removeEventListener('click', this.stopPropClick.bind(this));
        this.timeline?.removeEventListener('click', this.stopPropClick.bind(this));
    }
}

export default new VideoHandler();
