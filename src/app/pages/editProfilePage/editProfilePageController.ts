import EditProfilePageView from './editProfilePageView';

class EditProfilePageController {
    private view: EditProfilePageView;

    constructor() {
        this.view = new EditProfilePageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default EditProfilePageController;
