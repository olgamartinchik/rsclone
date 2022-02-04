import BrowsePageController from '../pages/browsePage/browsePageController';
import AuthPageController from '../pages/authPage/authPageController';
import OnboardingPageController from '../pages/onboardingPage/onboardingPageController';
import MainPageController from '../pages/mainPage/mainPageController';
import MealPageController from '../pages/mealPage/mealPageController';
import ProfilePageController from '../pages/profilePage/profilePageController';
import ProgramPageController from '../pages/programPage/programPageController';
import SettingsPageController from '../pages/settingsPage/settingsPageController';
import WorkoutPageController from '../pages/workoutPage/workoutPageController';
import EditPlanPageController from '../pages/editPlanPage/editPlanPageController';
import EditProfilePageController from '../pages/editProfilePage/editProfilePageController';
import { RouteOption } from '../services/types';

class Config {
    public programPageController: ProgramPageController;

    public mainPageController: MainPageController;

    public browsePageController: BrowsePageController;

    public authPageController: AuthPageController;

    public onboardingPageController: OnboardingPageController;

    public profilePageController: ProfilePageController;

    public settingsPageController: SettingsPageController;

    public mealPageController: MealPageController;

    public workoutPageController: WorkoutPageController;
    
    public editPlanPageController: EditPlanPageController;

    public editProfilePageController: EditProfilePageController;

    constructor() {
        this.programPageController = new ProgramPageController();
        this.mainPageController = new MainPageController();
        this.browsePageController = new BrowsePageController();
        this.authPageController = new AuthPageController();
        this.onboardingPageController = new OnboardingPageController();
        this.profilePageController = new ProfilePageController();
        this.settingsPageController = new SettingsPageController();
        this.mealPageController = new MealPageController();
        this.workoutPageController = new WorkoutPageController();
        this.editPlanPageController = new EditPlanPageController();
        this.editProfilePageController = new EditProfilePageController();
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
                path: /onboarding/,
                callback: () => this.onboardingPageController.createPage(),
            },
            {
                path: /login/,
                callback: () => this.authPageController.createPage(true),
            },
            {
                path: /program/,
                callback: async () => this.programPageController.createPage(),
            },
            {
                path: /editprofile/,
                callback: () => this.editProfilePageController.createPage(),
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
                path: /workout\/([\deabcdf]{24})/,
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
                path: /editplan/,
                callback: () => this.editPlanPageController.createPage(),
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
