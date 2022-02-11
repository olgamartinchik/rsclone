import { IDataExplore } from '../../services/types';
import Utils from '../../services/utils';
import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';
import Preloader from '../../components/preloader/preloader';
import StorageApiManager from '../../services/storageManager';


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

        if (StorageApiManager.getItem('mealData', 'local')) {
            const mealData = StorageApiManager.getItem('mealData', 'local') as IDataExplore[];
            // if (mealData !== undefined || (mealData as IDataExplore[]).length !== 0) {
                this.mealData! = mealData;
            // }
        }

        if (StorageApiManager.getItem('searchingData', 'local')) {
            const searchingData = StorageApiManager.getItem('searchingData', 'local') as IDataExplore[];
            if (searchingData !== undefined || (searchingData as IDataExplore[]).length !== 0) {
                this.searchingData = searchingData;
            }
        }
    }

    public async createPage() {
        this.view.render(
            this.model.dishType,
            this.handlerExploreCard.bind(this),
            this.handlerChange.bind(this),
            this.handlerBtn.bind(this)
        );
        // await this.getMealDataWithDay();
       
        this.view.getLoaderSearchingContainer();
        this.view.getLoaderMealContainer();
        

        // if (!this.mealData) {
            // this.mealData = await this.model.getUserMealData(this.numFrom.toString(), (this.numFrom + 1).toString());
            this.mealData= await this.model.getUserMealData()
            // if (this.mealData) {
                // StorageApiManager.addItem('mealData', this.mealData, 'local');
            // }
        // }

        if (!this.searchingData || this.searchingData.length === 0) {
            this.searchingData = await this.model.getSearchingData('brownie');
            if (this.searchingData) {
                StorageApiManager.addItem('searchingData', this.searchingData, 'local');
            }
        }

        this.view.loadMealCard(this.mealData!, this.handlerMealCard.bind(this));

        this.view.loadSearchingData(this.searchingData!, this.handlerSearchingCard.bind(this));
    }

    async handlerChange(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        this.inputValue = value.toLowerCase().trim();
    }

    handlerMealCard(e:Event) {      
        if((e.target as HTMLElement).closest('.meal-card')){
            const cardNum=(e.target as HTMLElement).closest('.meal-card')!.getAttribute('data-num')
            const recipePageData=(StorageApiManager.getItem('mealData','local')as Array<IDataExplore>)[Number(cardNum)]
            StorageApiManager.addItem('recipePageData', recipePageData,'local')
        }
    }
 

    handlerExploreCard(e:Event) {
        let dietCard=(e.target as HTMLElement).closest('.explore-card')
        if(dietCard){            
            StorageApiManager.addItem('diet', dietCard.getAttribute('data-edamam'), 'local');
           
        }

    }

    handlerSearchingCard(e:Event) {
        if((e.target as HTMLElement).closest('.meal-card')){
            const cardNum=(e.target as HTMLElement).closest('.meal-card')!.getAttribute('data-num')
            const recipePageData=(StorageApiManager.getItem('searchingData','local')as Array<IDataExplore>)[Number(cardNum)]
            StorageApiManager.addItem('recipePageData', recipePageData,'local')
        }
    }

    async handlerBtn() {
        if (this.inputValue) {
            const searchingMeals = document.querySelector('.searching-meals') as HTMLElement;
            searchingMeals!.innerHTML = '';
            searchingMeals.append(Preloader.getTemplate());

            this.searchingData = await this.model.getSearchingData(this.inputValue);

            if (this.searchingData) {
                if (this.searchingData.length === 0) {
                    searchingMeals!.innerHTML = 'No matches';
                } else {
                    searchingMeals!.innerHTML = '';
                    const searchingCards = this.view.getSearchingCards(this.searchingData, this.handlerSearchingCard);
                    searchingMeals.append(...searchingCards);
                    StorageApiManager.addItem('searchingData', this.searchingData, 'local');
                }
            }
        }
    }

    // async getMealDataWithDay() {
    //     const day = JSON.stringify(this.model.rememberDateToday());
    //     if (StorageApiManager.getItem('today', 'local')) {
    //         if (day !== localStorage.getItem('today')) {
    //             this.numFrom = Utils.randomInteger(0, 100);
    //             this.mealData = await this.model.getUserMealData(
    //                 this.numFrom.toString(),
    //                 (this.numFrom + 1).toString()
    //             );
    //             StorageApiManager.addItem('mealData', this.mealData, 'local');
    //             StorageApiManager.addItem('today', day, 'local');
    //         }
    //     }
    // }
}

export default MealPageController;
