import SettingsPageView from './settingsPageView';

class SettingsPageController {
    private view: SettingsPageView;

    constructor() {
        this.view = new SettingsPageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default SettingsPageController;
