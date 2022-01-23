import RegisterPageView from './registerPageView';

class RegisterPageController {
    private view: RegisterPageView;

    constructor() {
        this.view = new RegisterPageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default RegisterPageController;
