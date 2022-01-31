import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';

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
        const exploreData = await this.modal.getExploreData();
        this.searchingData = await this.modal.getSearchingData(this.valueData ? this.valueData : 'brownie');
        // this.handlerInput(e)

        this.view.render(
            exploreData,
            this.handlerExploreCard,
            this.searchingData,
            this.handlerSearchingCard,
            this.handlerInput
        );
    }

    handlerExploreCard(e) {
        console.log('click');
    }

    handlerSearchingCard(e) {
        console.log('click');
    }

    async handlerInput(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        // this.valueData=value

        //    this.searchingData=await this.modal.getSearchingData(value)
        console.log('value', value);
        // this.createPage()
    }
}

export default MealPageController;
