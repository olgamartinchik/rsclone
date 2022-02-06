import WorkoutPageModel from './workoutPageModel';
import WorkoutPageView from './workoutPageView';
import videoHandler from '../../components/videoHandler/videoHandler';
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
        }
    }

    private startWorkout(e: Event) {
        const id = (<HTMLElement>e.currentTarget).id;
        const link = this.model.getVideoLink(id);
        if (link) {
            this.videoHandler.createVideo(this.view.rootNode, link);
            // this.view.renderVideoPreloader();
        }
    }
}

export default WorkoutPageController;
