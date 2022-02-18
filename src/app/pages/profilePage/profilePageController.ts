import ProfilePageModel from './profilePageModel';
import ProfilePageView from './profilePageView';

class ProfilePageController {
    private model: ProfilePageModel;

    private view: ProfilePageView;

    constructor() {
        this.model = new ProfilePageModel();
        this.view = new ProfilePageView();
    }

    public createPage() {
        const settings = this.model.getSettingsData();
        if(settings) {
            this.view.render(settings.badges);
        }
    }
}

export default ProfilePageController;
