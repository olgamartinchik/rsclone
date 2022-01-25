import router from '../../router/router';
import MainPageView from './mainPageView';

class MainPageController {
    private view: MainPageView;

    constructor() {
        this.view = new MainPageView();
    }

    public createPage() {
        this.view.render(this.authHandler.bind(this));
    }

    private authHandler(): void {
        router.navigate('/auth');
    }
}

export default MainPageController;
