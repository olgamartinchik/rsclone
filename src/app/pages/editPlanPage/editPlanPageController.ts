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
        this.view.render(this.userSettings, this.handleSettingsChoice.bind(this));
    }

    private getUserSettings(): TSettings | void {
        return storageManager.getItem('userSettings', 'local');
    }

    private handleSettingsChoice(e: Event): void {
        console.log((<HTMLElement>e.target).dataset);
    }
}

export default EditPlanPageController;
