import MealPageModel from '../pages/mealPage/mealPageModel';
import CalculationCalories from './calculationCalories';
import ClientManager from './clientManager';
import { Endpoints } from './constants';
import DateManager from './datesManager';
import storageManager from './storageManager';
import { TSettings, TToken } from './types';
import WorkoutManager from './workoutManager';

class UserDataManager {
    private readonly client: ClientManager;

    private readonly caloriesCalculator: CalculationCalories;

    private readonly mealModel: MealPageModel;

    private readonly dateMr: DateManager;

    private readonly workoutManager: WorkoutManager;

    private userSettings: TSettings;

    constructor(userSettings: TSettings) {
        this.userSettings = userSettings;
        this.client = new ClientManager();
        this.caloriesCalculator = new CalculationCalories(this.userSettings);
        this.mealModel = new MealPageModel();
        this.dateMr = new DateManager();
        this.workoutManager = new WorkoutManager();
    }

    async createUserData(): Promise<void> {
        const settingsUpdated = await this.getUserSettings();
        if(settingsUpdated) {
            this.userSettings = settingsUpdated;
            this.resetStatData();
        }
        await this.caloriesCalculator.getRecipeDate();
        await this.mealModel.getSearchingData('brownie');
        await this.mealModel.getUserMealData();

        this.dateMr.getArrayDate(this.userSettings);
        this.dateMr.getNumWeek(this.userSettings);
        const program = await this.workoutManager.getProgram(this.userSettings);

        storageManager.addItem('workout-program', program, 'local');
        await this.saveUserSettings();

    }

    async getUserSettings(): Promise<TSettings | void> {
        let settings = storageManager.getItem<TSettings>('userSettings', 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');

        if(!settings && userData) {
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
        this.userSettings.liked = [];
    }

    private async saveUserSettings(): Promise<void> {
        storageManager.addItem('userSettings', this.userSettings, 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');

        if(userData) {
            await this.client.changeData(Endpoints.userSettings, userData.userID, this.userSettings);
        }
    }
}
export default UserDataManager;
