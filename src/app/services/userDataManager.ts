import MealPageModel from '../pages/mealPage/mealPageModel';
import CalculationCalories from './calculationCalories';
import DateManager from './datesManager';
import WorkoutManager from './workoutManager';
import { TSettings } from './types';

class UserDataManager {
    userSettings: TSettings;
    wrManager: WorkoutManager;

    constructor(userSettings: TSettings) {
        this.userSettings = userSettings;
        this.wrManager = new WorkoutManager();
    }

    async createUserData() {
        await new CalculationCalories(this.userSettings).getRecipeDate();
        await new MealPageModel().getSearchingData('brownie');
        new DateManager().getArrayDate(this.userSettings);
        const numWeek = new DateManager().getNumWeek(this.userSettings);
        await new MealPageModel().getUserMealData();
        this.wrManager.getProgram(this.userSettings);
    }
}
export default UserDataManager;
