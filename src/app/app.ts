import MainPageController from './pages/mainPage/mainPageController';
import AuthController from './pages/authPage/authPageController';

class App {
    private mainPageController: MainPageController;

    private authController: AuthController;

    constructor() {
        this.mainPageController = new MainPageController();
        this.authController = new AuthController();
    }

    start() {
        // this.mainPageController.createPage();
        this.authController.createPage();
    }
}

export default App;
