import Utils from '../../services/utils';

export default class Timer {
    private readonly root: HTMLCanvasElement;

    private ctx: CanvasRenderingContext2D | null;

    private timeFull: number;

    private timerElement: HTMLElement;

    private id: ReturnType<typeof setTimeout> | null;

    private isTimerRun: boolean;

    private timeCurrent: number;

    private startTime: number;

    constructor() {
        this.root = document.createElement('canvas');
        this.root.id = 'count-down';
        this.root.className = 'count-down-timer';
        this.ctx = this.root.getContext('2d');
        this.timeFull = 0;
        this.timerElement = document.createElement('p');
        this.timerElement.className = 'count-down-time';
        this.id = null;
        this.timeCurrent = 0;
        this.isTimerRun = true;
        this.startTime = 0;
    }

    createTimer(parentNode: HTMLElement, time: number): void {
        this.clearCtx();
        parentNode.append(this.root, this.timerElement);
        this.timeFull = time;

        this.setTrack();
        this.startTime = Date.now();
        this.drawLine();
    }

    startTimer(time: number) {
        this.timeCurrent = time;

        if (this.isTimerRun) {
            if (this.timeCurrent >= 0) {
                this.drawTime(this.timeCurrent);
                this.timeCurrent -= 1;

                this.id = setTimeout(() => {
                    this.startTimer(this.timeCurrent);
                }, 1000);
            } else {
                if (this.id) {
                    clearTimeout(this.id);
                }
            }
        }
    }

    private drawLine(): void {
        const now = Date.now();
        const time = this.timeFull - (now - this.startTime) / 1000;

        if (this.isTimerRun) {
            if (time > 0) {
                this.setTime(time, this.timeFull);
                this.setTrack();
                setTimeout(() => this.drawLine(), 20);
            }
        }
    }

    private clearCtx(): void {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, 300, 300);
        }
    }

    private setTrack(): void {
        if (this.ctx) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 8;
            this.ctx.beginPath();
            this.ctx.arc(100, 75, 40, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    setTime(until: number, total: number): void {
        if (this.ctx) {
            const start = Math.PI * 2 - (Math.PI * 2) / 4;
            const end = (until / total) * Math.PI * 2;
            this.clearCtx();
            this.setTrack();
            this.drawTime(until);
            const gradient = this.ctx.createLinearGradient(0, 0, 200, 0);
            gradient.addColorStop(0.1, 'rgb(255, 100, 162)');
            gradient.addColorStop(1, 'rgb(255, 134, 102)');
            this.ctx.strokeStyle = gradient;
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = 8;
            this.ctx.beginPath();
            this.ctx.arc(100, 75, 40, start, end + start, false);
            this.ctx.stroke();
        }
    }

    drawTime(time: number) {
        this.timerElement.innerText = Utils.getTime(time);
    }

    destroy(): void {
        this.root.remove();
    }

    pause() {
        this.isTimerRun = false;
    }
}
