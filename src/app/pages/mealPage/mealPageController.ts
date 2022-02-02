import { IDataExplore } from '../../services/types';
import Utils from '../../services/utils';
import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';

class MealPageController {
    private view: MealPageView;

    private model: MealPageModel;

    inputValue: string;

    mealData: IDataExplore[] | null;

    exploreData: IDataExplore[] | null;

    searchingData: IDataExplore[] | null;

    numFrom: number;

    constructor() {
        this.view = new MealPageView();
        this.model = new MealPageModel();
        this.numFrom = 0;
        this.inputValue = '';
        this.mealData = null;
        this.exploreData = null;
        this.searchingData = null;
        if (localStorage.getItem('mealData')) {
            this.mealData = JSON.parse(localStorage.getItem('mealData')!);
        }
        if (localStorage.getItem('exploreData')) {
            this.exploreData = JSON.parse(localStorage.getItem('exploreData')!);
        }
        if (localStorage.getItem('searchingData')) {
            this.searchingData = JSON.parse(localStorage.getItem('searchingData')!);
        }
    }

    public async createPage() {
        await this.getMealDataWithDay();

        if (!this.mealData || this.mealData.length === 0) {
            this.mealData = await this.model.getUserMealData(this.numFrom.toString(), (this.numFrom + 1).toString());
            localStorage.setItem('mealData', JSON.stringify(this.mealData));
        }
        if (!this.exploreData || this.exploreData.length === 0) {
            this.exploreData = await this.model.getExploreData();
            localStorage.setItem('exploreData', JSON.stringify(this.exploreData));
        }
        if (!this.searchingData || this.searchingData.length === 0) {
            this.searchingData = await this.model.getSearchingData('brownie');
            localStorage.setItem('searchingData', JSON.stringify(this.searchingData));
        }

        this.view.render(
            this.mealData!,
            this.handlerMealCard.bind(this),
            this.exploreData!,
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
            localStorage.setItem('searchingData', JSON.stringify(this.searchingData));
            if (this.searchingData) {
                if (this.searchingData.length === 0) {
                    searchingMeals!.innerHTML = 'No matches';
                } else {
                    const searchingCards = this.view.getSearchingCards(this.searchingData, this.handlerSearchingCard);
                    searchingMeals.append(...searchingCards);
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
