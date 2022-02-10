import WorkoutPageModel from './workoutPageModel';
import WorkoutPageView from './workoutPageView';
import videoHandler from '../../components/videoHandler/videoHandler';
import authManager from '../../services/authManager';
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

    private startWorkout(e: Event) {
        const id = (<HTMLElement>e.currentTarget).id;
        const link = this.model.getVideoLink(id);
        if (link) {
            this.videoHandler.createVideo(this.view.rootNode, link, id, this.sendStatistics.bind(this));
        }
    }

    private async sendStatistics(id: string, time: number): Promise<void> {
        const workout = this.model.getCardById(id);
        if(workout) {
            await this.model.updateSettingsData(time, workout);
            workout.completed = true;
            await this.model.updateWorkoutData(workout);

        }
        authManager.navigate(`workoutsummary/${id}`);
    }
}

export default WorkoutPageController;
