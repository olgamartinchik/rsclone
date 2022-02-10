import WorkoutPageModel from './statisticPageModel';
import WorkoutPageView from './statisticPageView';
import videoHandler from '../../components/videoHandler/videoHandler';

class StatisticPageController {
    private view: WorkoutPageView;

    private model: WorkoutPageModel;

    private videoHandler: typeof videoHandler;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
        this.videoHandler = videoHandler;
    }

    public createPage(args: string[]): void {
        this.view.render();
    }

    private startWorkout(e: Event) {
        const id = (<HTMLElement>e.currentTarget).id;
        const link = this.model.getVideoLink(id);
        if (link) {
            this.videoHandler.createVideo(this.view.rootNode, link, id, this.sendStatistics.bind(this));
        }
    }

    private async sendStatistics(id: string): Promise<void> {
        const workout = this.model.getCardById(id);
        if (workout) {
            workout.completed = true;
            await this.model.updateWorkoutData(workout);
        }

        console.log(this.model.getCardById(id));
    }
}

export default StatisticPageController;
