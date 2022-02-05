import EditPlanPageView from './editPlanPageView';

class EditPlanPageController {
    private view: EditPlanPageView;

    constructor() {
        this.view = new EditPlanPageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default EditPlanPageController;
