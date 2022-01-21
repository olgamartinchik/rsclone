import MainPageController from './pages/mainPage/mainPageController';

class App {
    private mainPageController: MainPageController;

    constructor() {
        this.mainPageController = new MainPageController();
    }

    start() {
        this.mainPageController.createPage();
    }
}

export default App;
