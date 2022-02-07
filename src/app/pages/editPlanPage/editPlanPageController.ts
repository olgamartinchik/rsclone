import EditPlanPageView from './editPlanPageView';
import storageManager from '../../services/storageManager';
import { TSettings } from '../../services/types';

class EditPlanPageController {
    private view: EditPlanPageView;

    private userSettings: TSettings | void;

    constructor() {
        this.view = new EditPlanPageView();
        this.userSettings = this.getUserSettings();
    }

    public createPage() {
        this.view.render(this.userSettings);
    }

    private getUserSettings(): TSettings | void {
        return storageManager.getItem('userSettings', 'local');
    }
}

export default EditPlanPageController;
