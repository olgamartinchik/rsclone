import router from '../../router/router';
import MainPageView from './mainPageView';

class MainPageController {
    private view: MainPageView;

    constructor() {
        this.view = new MainPageView();
    }

    public createPage() {
        this.view.render(this.signUpHandler.bind(this));
    }

    private signUpHandler(): void {
        router.navigate('/register');
    }
}

export default MainPageController;
