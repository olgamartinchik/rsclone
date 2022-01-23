import BrowsePageController from './pages/browsePage/browsePageController';
import ProgramPageController from './pages/programPage/programPageController';
import MainPageController from './pages/mainPage/mainPageController';
import router, { Router } from './router/router';
import { RouteOption } from './services/types';
import LoginPageController from './pages/loginPage/loginPageController';
import RegisterPageController from './pages/registerPage/registerPageController';
import ProfilePageController from './pages/profilePage/profilePageController';
import SettingsPageController from './pages/settingsPage/settingsPageController';
import MealPageController from './pages/mealPage/mealPageController';
import WorkoutPageController from './pages/workoutPage/workoutPageController';

class App {
    private programPageController: ProgramPageController;

    private mainPageController: MainPageController;

    private browsePageController: BrowsePageController;

    private loginPageController: LoginPageController;

    private registerPageController: RegisterPageController;

    private profilePageController: ProfilePageController;

    private settingsPageController: SettingsPageController;

    private mealPageController: MealPageController;

    private router: Router;

    private workoutPageController: WorkoutPageController;

    constructor() {
        this.programPageController = new ProgramPageController();
        this.mainPageController = new MainPageController();
        this.browsePageController = new BrowsePageController();
        this.loginPageController = new LoginPageController();
        this.registerPageController = new RegisterPageController();
        this.profilePageController = new ProfilePageController();
        this.settingsPageController = new SettingsPageController();
        this.mealPageController = new MealPageController();
        this.workoutPageController = new WorkoutPageController();
        this.router = router;
    }

    public start(): void {
        const routes = this.getRoutes();

        this.router.addAllPath(routes);
    }

    private getRoutes(): RouteOption[] {
        const currRoutes: RouteOption[] = [
            {
                path: /main/,
                callback: () => this.mainPageController.createPage(),
            },
            {
                path: /login/,
                callback: () => this.loginPageController.createPage(),
            },
            {
                path: /register/,
                callback: () => this.registerPageController.createPage(),
            },
            {
                path: /program/,
                callback: () => this.programPageController.createPage(),
            },
            {
                path: /profile/,
                callback: () => this.profilePageController.createPage(),
            },
            {
                path: /settings/,
                callback: () => this.settingsPageController.createPage(),
            },
            {
                path: /workout\/(\d{1,2})/,
                callback: (...args) => this.workoutPageController.createPage(args),
            },
            {
                path: /browse/,
                callback: () => this.browsePageController.createPage(),
            },
            {
                path: /meal\/(\d{1,2})/,
                callback: (...args) => console.log('meal page', args),
            },
            {
                path: /meal/,
                callback: () => this.mealPageController.createPage(),
            },
            {
                path: /inprogress\/(\d{1,2})/,
                callback: (...args) => console.log('progress page', args),
            },
        ];

        return currRoutes;
    }
}

export default App;
