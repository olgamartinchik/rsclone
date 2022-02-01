import WorkoutPageModel from './workoutPageModel';
import WorkoutPageView from './workoutPageView';

class WorkoutPageController {
    private view: WorkoutPageView;
    private model: WorkoutPageModel;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
    }

    public createPage(idArr: string[]): void {
        const [id] = idArr;
        this.view.render(id);
    }
}

export default WorkoutPageController;
