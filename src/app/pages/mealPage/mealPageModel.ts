import ClientManager from '../../services/clientManager';
import { IDataExplore } from '../../services/types';
import Utils from '../../services/utils';
class MealPageModel {
    mealData: ClientManager;

    dishType: IDataExplore[];

    numFrom: number | null;

    numTo: number | null;

    mealType: Array<string>;

    today: string;

    constructor() {
        this.today = '';
        this.numFrom = this.getNumFrom();
        this.numTo = this.numFrom + 1;
        this.mealData = new ClientManager();
        this.mealType = ['Breakfast', 'Lunch', 'Snack'];
        this.dishType = [
            { recipe: { dishType: 'Desserts', image: '1' } },
            { recipe: { dishType: 'Main course', image: '2' } },
            { recipe: { dishType: 'Pancake', image: '3' } },
            { recipe: { dishType: 'Salad', image: '4' } },
            { recipe: { dishType: 'Starter', image: '5' } },
            { recipe: { dishType: 'Soup', image: '6' } },
        ];
    }

    async getUserMealData(from = '0', to = '1') {
        const userData: Array<IDataExplore> = [];
        for (const mealType of this.mealType) {
            const userRecipe = await this.mealData.userData(from, to, mealType, '591-722');
            if (userRecipe) {
                userData.push(...userRecipe);
            }
        }

        return userData;
    }

    async getSearchingData(meal = 'Salad') {
        const numTo = this.numFrom! + 6;
        const searchingData = await this.mealData.searchingData(this.numFrom!.toString(), numTo.toString(), meal);

        return searchingData;
    }

    getNumFrom() {
        this.numFrom = Utils.randomInteger(0, 100);
        return this.numFrom;
    }

    rememberDateToday() {
        const day = new Date();
        const dd = String(day.getDate()).padStart(2, '0');
        const mm = String(day.getMonth() + 1).padStart(2, '0');
        const yyyy = day.getFullYear();
        this.today = mm + '/' + dd + '/' + yyyy;
        localStorage.setItem('today', JSON.stringify(this.today));
        return this.today;
    }
}

export default MealPageModel;
