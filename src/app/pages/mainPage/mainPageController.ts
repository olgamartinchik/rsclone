import MainPageView from './mainPageView';
import authManager from '../../services/authManager';

class MainPageController {
    private view: MainPageView;

    constructor() {
        this.view = new MainPageView();
    }

    public createPage() {
        this.view.render(this.signUpHandler.bind(this));
    }

    private signUpHandler(): void {
        authManager.navigate('/register');
    }
}

export default MainPageController;
