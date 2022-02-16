import WorkoutPageModel from './workoutPageModel';
import WorkoutPageView from './workoutPageView';
import videoHandler from '../../components/videoHandler/videoHandler';
import authManager from '../../services/authManager';
import { TStatData } from '../../services/types';
class WorkoutPageController {
    private view: WorkoutPageView;

    private model: WorkoutPageModel;

    private videoHandler: typeof videoHandler;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
        this.videoHandler = videoHandler;
    }

    public createPage(idArr: string[]): void {
        const [id] = idArr;
        this.model.getData();
        const card = this.model.getCardById(id);
        if (card) {
            this.view.render(card, this.startWorkout.bind(this));
        } else {
            authManager.navigate('program');
        }
    }

    private async startWorkout(e: Event) {
        const id = (<HTMLElement>e.currentTarget).id;
        const link = this.model.getVideoLink(id);
        const settings = await this.model.getSettingsData();
        const card = this.model.getCardById(id);
        if (link && card && settings) {
            this.videoHandler.createVideo(this.view.rootNode, link, card, this.sendStatistics.bind(this), settings);
        }
    }

    private async sendStatistics(id: string, statData: TStatData): Promise<void> {
        const workout = this.model.getCardById(id);
        if (workout) {
            this.model.updateSettingsData(statData);
            workout.completed = true;
            this.model.updateWorkoutData(workout);
        }
        authManager.navigate(`workoutsummary/${id}`);
    }
}

export default WorkoutPageController;
