import WorkoutPageModel from './workoutPageModel';
import WorkoutPageView from './workoutPageView';
import youTubeApiManager from '../../services/youTubeApiManager';
import WorkoutTimer from './timer/workoutTimer';
class WorkoutPageController {
    private view: WorkoutPageView;

    private model: WorkoutPageModel;

    private workoutTimer: WorkoutTimer;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
        this.workoutTimer = new WorkoutTimer();
    }

    public createPage(idArr: string[]): void {
        const [id] = idArr;
        this.model.getData();
        const card = this.model.getCardById(id);
        if (card) {
            this.view.render(card, this.startWorkout.bind(this));
        }
    }

    private startWorkout(e: Event) {
        const id = (<HTMLElement>e.currentTarget).id;
        const card = this.model.getCardById(id);
        if (card) {
            const iframe = youTubeApiManager.createIFrame(card.data.link);
            this.view.renderVideo(iframe);
            this.workoutTimer.createTimer(this.view.rootNode, card.data.duration);
        }
    }
}

export default WorkoutPageController;
