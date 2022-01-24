import MealPageView from './mealPageView';

class MealPageController {
    private view: MealPageView;

    constructor() {
        this.view = new MealPageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default MealPageController;
