import ProfilePageView from './profilePageView';

class ProfilePageController {
    private view: ProfilePageView;

    constructor() {
        this.view = new ProfilePageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default ProfilePageController;
