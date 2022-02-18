import MealPageModel from '../pages/mealPage/mealPageModel';
import CalculationCalories from './calculationCalories';
import ClientManager from './clientManager';
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
        }
        await this.caloriesCalculator.getRecipeDate();
        await this.mealModel.getSearchingData('brownie');
        await this.mealModel.getUserMealData();

        this.dateMr.getArrayDate(this.userSettings);
        this.dateMr.getNumWeek(this.userSettings);
        const program = await this.workoutManager.getProgram(this.userSettings);
        console.log(this.userSettings, program)

        storageManager.addItem('workout-program', program, 'local');
    }

    async getUserSettings(): Promise<TSettings | void> {
        let settings = storageManager.getItem<TSettings>('userSettings', 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');

        if(!settings && userData) {
            settings = await this.client.getUserSettings(userData.userID);
        }

        return settings;
    }
}
export default UserDataManager;
