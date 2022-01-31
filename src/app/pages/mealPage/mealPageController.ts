import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';

let search=''
class MealPageController {
    private view: MealPageView;

    private modal: MealPageModel;

    valueData: string;

    searchingData: any;

    constructor() {
        this.view = new MealPageView();
        this.modal = new MealPageModel();
        this.valueData = '';
       
    }

    public async createPage() {
        const mealData=await this.modal.getUserMealData()
        const exploreData = await this.modal.getExploreData();
        this.searchingData = await this.modal.getSearchingData(this.valueData ? this.valueData : 'brownie');

        // this.handlerInput(e)

        this.view.render(
            mealData,
            this.handlerMealCard,
            exploreData,
            this.handlerExploreCard,
            this.searchingData,
            this.handlerSearchingCard,
            this.handlerInput
        );
    }
   
    handlerMealCard(e) {
        console.log('click');
    }

    handlerExploreCard(e) {
        console.log('click');
    }

    handlerSearchingCard(e) {
        console.log('click');
    }

    async handlerInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        const searchingMeals=document.querySelector('.searching-meals') as HTMLElement
        searchingMeals!.innerHTML=''
        search=value.toLowerCase().trim()
        // this.searchingData = await this.modal.getSearchingData(search ? search : 'brownie');
        // const searchingCards = this.view.getSearchingCards(this.searchingData, this.handlerSearchingCard);
        // searchingMeals.append(...searchingCards);
        // this.valueData=value

        //    this.searchingData=await this.modal.getSearchingData(value)
        console.log('value', value,search);
        // this.createPage()
    }
 
}

export default MealPageController;
