import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';

class MealPageController {
    private view: MealPageView;
    private modal: MealPageModel

    constructor() {
        this.view = new MealPageView();
        this.modal= new MealPageModel()
    }

    public async createPage() {
        const exploreData= await this.modal.getExploreData()
        
        this.view.render(exploreData, this.handlerExploreCard);
    }
    handlerExploreCard(e){
        console.log('click')
    }
}

export default MealPageController;
