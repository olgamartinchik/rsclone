import LoginPageView from './loginPageView';

class LoginPageController {
    private view: LoginPageView;

    constructor() {
        this.view = new LoginPageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default LoginPageController;
