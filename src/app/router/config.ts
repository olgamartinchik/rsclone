import BrowsePageController from '../pages/browsePage/browsePageController';
import { AuthPageController } from '../pages/authPage/authPageController';
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
import StatisticPageController from '../pages/statistic/statisticPageController';
import ExploreController from '../pages/explorePage/explorePageController';
import RecipePageController from '../pages/recipePage/recipePageController';
import ProgressPageController from '../pages/weeklyProgressPage/progressPageController';

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

    public statisticPageController: StatisticPageController;

    public exploreController: ExploreController;

    public recipePageController: RecipePageController;

    public progressPageController: ProgressPageController;

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
        this.statisticPageController = new StatisticPageController();
        this.exploreController = new ExploreController();
        this.recipePageController = new RecipePageController();
        this.progressPageController = new ProgressPageController();
    }

    public getRoutes(): RouteOption[] {
        const currRoutes: RouteOption[] = [
            {
                path: / /,
                callback: () => this.mainPageController.createPage(),
                isAuth: false,
            },
            {
                path: /register/,
                callback: () => this.authPageController.createPage(false),
                isAuth: false,
            },
            {
                path: /onboarding/,
                callback: () => this.onboardingPageController.createPage(),
                isAuth: false,
            },
            {
                path: /login/,
                callback: () => this.authPageController.createPage(true),
                isAuth: false,
            },
            {
                path: /program/,
                callback: async () => this.programPageController.createPage(),
                isAuth: true,
            },
            {
                path: /editprofile/,
                callback: () => this.editProfilePageController.createPage(),
                isAuth: true,
            },
            {
                path: /profile/,
                callback: () => this.profilePageController.createPage(),
                isAuth: true,
            },
            {
                path: /settings/,
                callback: () => this.settingsPageController.createPage(),
                isAuth: true,
            },
            {
                path: /workout\/([\deabcdf]{24})/,
                callback: (...args) => this.workoutPageController.createPage(args),
                isAuth: true,
            },
            {
                path: /browse/,
                callback: () => this.browsePageController.createPage(),
                isAuth: null,
            },
            {
                path: /meal\/(\d{1,2})/,
                callback: (...args) => console.log('meal page', args),
                isAuth: true,
            },
            {
                path: /meal/,
                callback: () => this.mealPageController.createPage(),
                isAuth: true,
            },
            {
                path: /editplan/,
                callback: () => this.editPlanPageController.createPage(),
                isAuth: true,
            },
            {
                path: /inprogress\/(\d{1,2})/,
                callback: (...args) => console.log('progress page', args),
                isAuth: true,
            },
            {
                path: /workoutsummary\/([\deabcdf]{24})/,
                callback: (...args) => this.statisticPageController.createPage(args),
                isAuth: true,
            },
            {
                path: /explore/,
                callback: () => this.exploreController.createPage(),
                isAuth: true,
            },
            {
                path: /recipe/,
                callback: () => this.recipePageController.createPage(),
                isAuth: true,
            },
            {
                path: /weeklyprogress/,
                callback: () => this.progressPageController.createPage(),
                isAuth: true,
            },
        ];

        return currRoutes;
    }
}

export default Config;
