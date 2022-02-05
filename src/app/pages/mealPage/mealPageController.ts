import { IDataExplore } from '../../services/types';
import Utils from '../../services/utils';
import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';

class MealPageController {
    private view: MealPageView;

    private model: MealPageModel;

    inputValue: string;

    mealData: IDataExplore[] | null;

    searchingData: IDataExplore[] | null;

    numFrom: number;

    constructor() {
        this.view = new MealPageView();
        this.model = new MealPageModel();
        this.numFrom = 0;
        this.inputValue = '';
        this.mealData = null;
        this.searchingData = null;
        if (localStorage.getItem('mealData')) {
            const mealData = JSON.parse(localStorage.getItem('mealData')!);
            if (mealData !== undefined || mealData.length !== 0) {
                this.mealData = mealData;
            }
        }

        if (localStorage.getItem('searchingData')) {
            const searchingData = JSON.parse(localStorage.getItem('searchingData')!);
            if (searchingData !== undefined || searchingData.length !== 0) {
                this.searchingData = searchingData;
            }
        }
    }

    public async createPage() {
        await this.getMealDataWithDay();

        if (!this.mealData || this.mealData.length === 0) {
            this.mealData = await this.model.getUserMealData(this.numFrom.toString(), (this.numFrom + 1).toString());
            if (this.mealData) {
                localStorage.setItem('mealData', JSON.stringify(this.mealData));
            }
            console.log('this.mealData', this.mealData);
        }

        if (!this.searchingData || this.searchingData.length === 0) {
            this.searchingData = await this.model.getSearchingData('brownie');
            if (this.searchingData) {
                localStorage.setItem('searchingData', JSON.stringify(this.searchingData));
            }
        }

        this.view.render(
            this.mealData!,
            this.handlerMealCard.bind(this),
            this.model.dishType,
            this.handlerExploreCard.bind(this),
            this.searchingData!,
            this.handlerSearchingCard.bind(this),
            this.handlerChange.bind(this),
            this.handlerBtn.bind(this)
        );
    }

    async handlerChange(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        this.inputValue = value.toLowerCase().trim();
    }

    handlerMealCard() {}

    handlerExploreCard() {}

    handlerSearchingCard() {}

    async handlerBtn() {
        if (this.inputValue) {
            const searchingMeals = document.querySelector('.searching-meals') as HTMLElement;
            searchingMeals!.innerHTML = '';
            this.searchingData = await this.model.getSearchingData(this.inputValue);

            if (this.searchingData) {
                if (this.searchingData.length === 0) {
                    searchingMeals!.innerHTML = 'No matches';
                } else {
                    const searchingCards = this.view.getSearchingCards(this.searchingData, this.handlerSearchingCard);
                    searchingMeals.append(...searchingCards);
                    localStorage.setItem('searchingData', JSON.stringify(this.searchingData));
                }
            }
        }
    }

    async getMealDataWithDay() {
        const day = JSON.stringify(this.model.rememberDateToday());
        if (localStorage.getItem('today')) {
            if (day !== localStorage.getItem('today')) {
                this.numFrom = Utils.randomInteger(0, 100);
                this.mealData = await this.model.getUserMealData(
                    this.numFrom.toString(),
                    (this.numFrom + 1).toString()
                );
                localStorage.setItem('mealData', JSON.stringify(this.mealData));
                localStorage.setItem('today', JSON.stringify(day));
            }
        }
    }
}

export default MealPageController;
