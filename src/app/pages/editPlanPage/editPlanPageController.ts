import EditPlanPageView from './editPlanPageVew';

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