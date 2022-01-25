import WorkoutPageView from './workoutPageView';

class WorkoutPageController {
    private view: WorkoutPageView;

    constructor() {
        this.view = new WorkoutPageView();
    }

    public createPage(idArr: string[]): void {
        const [id] = idArr;
        this.view.render(id);
    }
}

export default WorkoutPageController;
