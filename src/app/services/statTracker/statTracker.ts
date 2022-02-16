import { TSettings, TStatData } from '../types';
import Utils from '../utils';

class StatTracker {
    private caloriesTimerId: ReturnType<typeof setInterval> | null;

    private startTime: number;

    private calories: number;

    private time: number;

    private weight: number;

    private caloriesPerMinute: number;

    constructor() {
        this.caloriesTimerId = null;
        this.startTime = 0;
        this.calories = 0;
        this.time = 0;
        this.weight = 0;
        this.caloriesPerMinute = 0;
    }

    public reset() {
        if (this.caloriesTimerId) {
            clearInterval(this.caloriesTimerId);
            this.caloriesTimerId = null;
        }
        this.startTime = 0;
        this.calories = 0;
        this.time = 0;
        this.weight = 0;
        this.caloriesPerMinute = 0;
    }

    public startTracking(caloriesPerMinute: number, settings: TSettings) {
        this.weight = settings.weight;
        this.caloriesPerMinute = caloriesPerMinute;
        this.caloriesTimerId = setInterval(() => {
            this.calories += Utils.getCaloriesPerSecond(this.weight, this.caloriesPerMinute);
        }, 1000);
        this.startTime = Date.now();
    }

    public getCalories(): number {
        return Math.trunc(this.calories);
    }

    public continueTracking(): void {
        this.caloriesTimerId = setInterval(() => {
            this.calories += Utils.getCaloriesPerSecond(this.weight, this.caloriesPerMinute);
        }, 1000);
        this.startTime = Date.now();
    }

    public stopTracking(): void {
        if (this.caloriesTimerId) {
            clearInterval(this.caloriesTimerId);
            this.caloriesTimerId = null;
        }

        this.time += Utils.getTimeDiffInSeconds(this.startTime);
    }

    public getTrackData(): TStatData {
        return {
            calories: this.getCalories(),
            time: this.time || 1,
        };
    }
}

export default StatTracker;
