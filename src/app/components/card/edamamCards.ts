import { exploreCardTemplate, mealCardTemplate } from './templateMealCard';
import { IDataExplore } from '../../services/types';
class MealCard {
    private rootNodeExplore: HTMLElement;

    private rootNodeMeal: HTMLElement;
    // private rootNodeSearching: HTMLElement;

    private data: IDataExplore;

    constructor(data: IDataExplore) {
        this.data = data;
        this.rootNodeExplore = document.createElement('div');
        this.rootNodeExplore.className = 'explore-card';
        this.rootNodeExplore.setAttribute('data-edamam', data.recipe.dishType);
        this.rootNodeMeal = document.createElement('div');
        this.rootNodeMeal.className = 'meal-card';
    }

    public getExploreTemplate(onclick: (e: Event) => void): HTMLElement {
        this.rootNodeExplore.onclick = (e: Event) => onclick(e);
        this.rootNodeExplore.insertAdjacentHTML('afterbegin', exploreCardTemplate(this.data));
        // console.log('this.rootNode',this.rootNodeExplore)
        return this.rootNodeExplore;
    }

    public getMealTemplate(onclick: (e: Event) => void): HTMLElement {
        this.rootNodeMeal.onclick = (e: Event) => onclick(e);
        this.rootNodeMeal.insertAdjacentHTML('afterbegin', mealCardTemplate(this.data));
        // console.log('this.rootNode',this.rootNodeMeal)
        return this.rootNodeMeal;
    }

    public getSearchTemplate() {}
}
export default MealCard;
