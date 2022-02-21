import MealPageModel from '../pages/mealPage/mealPageModel';
import CalculationCalories from './calculationCalories';
import ClientManager from './clientManager';
import { Endpoints } from './constants';
import DateManager from './datesManager';
import storageManager from './storageManager';
import { IDataExplore, TSettings, TToken, TWorkoutProgram } from './types';
import WorkoutManager from './workoutManager';

class UserDataManager {
    private readonly client: ClientManager;

    private readonly caloriesCalculator: CalculationCalories;

    private readonly mealModel: MealPageModel;

    private readonly dateMr: DateManager;

    private readonly workoutManager: WorkoutManager;

    private userSettings: TSettings;

    private program: TWorkoutProgram;

    private menu: IDataExplore[];

    constructor(userSettings: TSettings) {
        this.userSettings = userSettings;
        this.program = [];
        this.menu = [];
        this.client = new ClientManager();
        this.caloriesCalculator = new CalculationCalories(this.userSettings);
        this.mealModel = new MealPageModel();
        this.dateMr = new DateManager();
        this.workoutManager = new WorkoutManager();
    }

    async createMealData(): Promise<void> {
        const action = storageManager.getItem<string>('userAction', 'local');
        await this.caloriesCalculator.getRecipeDate();
        await this.caloriesCalculator.createUserMeal(action!);
        await this.mealModel.getSearchingData('brownie');
        await this.mealModel.getUserMealData();

        this.dateMr.getArrayDate(this.userSettings);
        this.dateMr.getNumWeek(this.userSettings);
    }

    async createWorkoutData(): Promise<void> {
        this.program = await this.workoutManager.getProgram(this.userSettings);
    }

    async updateUserData(): Promise<void> {
        const settingsUpdated = await this.getUserSettings();
        if (settingsUpdated) {
            this.userSettings = settingsUpdated;
            this.resetStatData();
        }
        await this.createMealData();
        await this.createWorkoutData();
        await this.saveUserData(this.userSettings, this.program);
    }

    async getUserSettings(): Promise<TSettings | void> {
        let settings = storageManager.getItem<TSettings>('userSettings', 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');

        if (!settings && userData) {
            settings = await this.client.getUserSettings(userData.userID);
        }

        return settings;
    }

    private resetStatData(): void {
        this.userSettings.weekProgress = {
            currentWeek: 0,
            calories: 0,
            workoutsCompleted: 0,
            minutes: 0,
            workoutsNumber: this.userSettings.workoutsNumber,
        };
        this.userSettings.caloriesBurned = 0;
        this.userSettings.badges = [];
        this.userSettings.completedWorkouts = 0;
        this.userSettings.progress = [];
        this.userSettings.startDate = Date.now().toString();
    }

    private async saveUserData(settings: TSettings, program: TWorkoutProgram): Promise<void> {
        storageManager.addItem('userSettings', this.userSettings, 'local');
        storageManager.addItem('workout-program', program, 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');

        if (userData) {
            await this.client.changeData(Endpoints.userSettings, 'patch', userData.userID, settings);
            await this.client.updateProgram(program, userData.userID);
        }
    }
}
export default UserDataManager;
