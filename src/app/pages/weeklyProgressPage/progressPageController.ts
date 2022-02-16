import WorkoutPageModel from './progressPageModel';
import WorkoutPageView from './progressPageView';
import authManager from '../../services/authManager';
import Utils from '../../services/utils';
import { TSettings } from '../../services/types';

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
        const weekIndex = this.model.getCurrentWeek();
        if (settings) {
            const currentProgressData = settings.progress[weekIndex];

            const [weekKeys, datesKeys] = Utils.getWeekDays(settings.startDate, weekIndex);
            const valuesMinutes = Utils.getWeekValues(weekKeys, currentProgressData.minutes);
            const valuesCalories = Utils.getWeekValues(weekKeys, currentProgressData.calories);

            this.view.renderCharts(datesKeys, valuesMinutes, valuesCalories, settings.weekProgress);
        }
    }

    private handleClick(): void {
        authManager.navigate(' ');
    }
}

export default ProgressPageController;
