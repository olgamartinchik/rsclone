import ClientManager from '../../services/clientManager';
import { IDataExplore, TSettings } from '../../services/types';
import Utils from '../../services/utils';
import StorageManager from '../../services/storageManager';
import DateManager from '../../services/datesManager';
import CalculationCalories from '../../services/calculationCalories';

class MealPageModel {
    mealData: ClientManager;

    dishType: IDataExplore[];

    numFrom: number | null;

    numTo: number | null;

    today: DateManager;

    constructor() {
        this.today = new DateManager();
        this.numFrom = this.getNumFrom();
        this.numTo = this.numFrom + 1;
        this.mealData = new ClientManager();
        this.dishType = [
            { recipe!: { diet!: 'balanced', image!: 'balanced' } },
            { recipe: { diet: 'high-fiber', image: 'high-fiber' } },
            { recipe: { diet: 'low-carb', image: 'low-carb' } },
            { recipe: { diet: 'low-fat', image: 'low-fat' } },
            { recipe: { diet: 'low-sodium', image: 'low-sodium' } },
        ];
    }

    async getUserMealData() {
        const userData: Array<IDataExplore> = [];

        const periodUserMeal =
            (StorageManager.getItem('periodUserMeal', 'local') as Array<IDataExplore>) ??
            (await new CalculationCalories(
                StorageManager.getItem('userSettings', 'local') as TSettings
            ).createUserMeal());
        periodUserMeal[this.today.dateToday()].forEach((meal) => {
            if (meal) {
                userData.push(meal);
            }
        });

        StorageManager.addItem('mealData', userData, 'local');
        return userData;
    }

    async getSearchingData(meal = 'Salad') {
        const numTo = this.numFrom! + 6;
        const searchingData = await this.mealData.searchingData(this.numFrom!.toString(), numTo.toString(), meal);
        if (searchingData) {
            StorageManager.addItem('searchingData', searchingData, 'local');
        }

        return searchingData;
    }

    getNumFrom() {
        this.numFrom = Utils.randomInteger(0, 100);
        return this.numFrom;
    }
}

export default MealPageModel;
