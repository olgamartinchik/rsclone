import WorkoutPageModel from './progressPageModel';
import WorkoutPageView from './progressPageView';
import authManager from '../../services/authManager';
import Utils from '../../services/utils';
import { TSettings } from '../../services/types';
import storageManager from '../../services/storageManager';

class ProgressPageController {
    private view: WorkoutPageView;

    private model: WorkoutPageModel;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
    }

    public async createPage(): Promise<void> {
        const settings = await this.model.getSettings();
        if (settings) {
            this.view.render(settings, this.handleClick.bind(this));
            this.createCharts(settings);
        } else {
            authManager.navigate('');
        }
    }

    public async createCharts(set?: TSettings) {
        const settings = set || (await this.model.getSettings());
        const weekIndex = storageManager.getItem<number>('numWeek', 'local');
        if (settings && weekIndex !== undefined) {
            const currentProgressData = settings.progress[weekIndex];
            const minutes = currentProgressData ? currentProgressData.minutes : [];
            const calories = currentProgressData ? currentProgressData.calories : [];

            const [weekKeys, datesKeys] = Utils.getWeekDays(settings.startDate, weekIndex);
            const valuesMinutes = Utils.getWeekValues(weekKeys, minutes);
            const valuesCalories = Utils.getWeekValues(weekKeys, calories);
            this.view.renderCharts(datesKeys, valuesMinutes, valuesCalories, settings.weekProgress);
        }
    }

    private handleClick(): void {
        authManager.navigate(' ');
    }
}

export default ProgressPageController;
