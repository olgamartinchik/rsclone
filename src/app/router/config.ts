import BrowsePageController from '../pages/browsePage/browsePageController';
import AuthPageController from '../pages/authPage/authPageController';
import RegisterPageController from '../pages/registerPage/registerPageController';
import MainPageController from '../pages/mainPage/mainPageController';
import MealPageController from '../pages/mealPage/mealPageController';
import ProfilePageController from '../pages/profilePage/profilePageController';
import ProgramPageController from '../pages/programPage/programPageController';
import SettingsPageController from '../pages/settingsPage/settingsPageController';
import WorkoutPageController from '../pages/workoutPage/workoutPageController';
import { RouteOption } from '../services/types';

class Config {
    public programPageController: ProgramPageController;

    public mainPageController: MainPageController;

    public browsePageController: BrowsePageController;

    public authPageController: AuthPageController;

    public registerPageController: RegisterPageController;

    public profilePageController: ProfilePageController;

    public settingsPageController: SettingsPageController;

    public mealPageController: MealPageController;

    public workoutPageController: WorkoutPageController;

    constructor() {
        this.programPageController = new ProgramPageController();
        this.mainPageController = new MainPageController();
        this.browsePageController = new BrowsePageController();
        this.authPageController = new AuthPageController();
        this.registerPageController = new RegisterPageController();
        this.profilePageController = new ProfilePageController();
        this.settingsPageController = new SettingsPageController();
        this.mealPageController = new MealPageController();
        this.workoutPageController = new WorkoutPageController();
    }

    public getRoutes(): RouteOption[] {
        const currRoutes: RouteOption[] = [
            {
                path: / /,
                callback: () => this.mainPageController.createPage(),
            },
            {
                path: /register/,
                callback: () => this.authPageController.createPage(false),
            },
            {
                path: /goals/,
                callback: () => this.registerPageController.createPage(),
            },
            {
                path: /login/,
                callback: () => this.authPageController.createPage(true),
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

export default Config;
