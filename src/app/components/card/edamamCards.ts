import { exploreCardTemplate, mealCardTemplate, userMealCardTemplate } from './templateMealCard';
import { IDataExplore } from '../../services/types';
class MealCard {
    private rootNodeExplore: HTMLElement;

    private rootNodeSearching: HTMLElement;

    private rootNodeMeal: HTMLElement;
    // private rootNodeSearching: HTMLElement;

    private data: IDataExplore;

    constructor(data: IDataExplore) {
        this.data = data;
        this.rootNodeExplore = document.createElement('div');
        this.rootNodeExplore.className = 'explore-card';
        this.rootNodeExplore.setAttribute('data-edamam', data.recipe.dishType);
        this.rootNodeSearching = document.createElement('div');
        this.rootNodeSearching.className = 'meal-card';
        this.rootNodeMeal = document.createElement('div');
        this.rootNodeMeal.className = 'meal-card';
    }

    public getExploreTemplate(onclick: (e: Event) => void): HTMLElement {
        this.rootNodeExplore.onclick = (e: Event) => onclick(e);
        this.rootNodeExplore.insertAdjacentHTML('afterbegin', exploreCardTemplate(this.data));
        return this.rootNodeExplore;
    }

    public getSearchingTemplate(onclick: (e: Event) => void): HTMLElement {
        this.rootNodeSearching.onclick = (e: Event) => onclick(e);
        this.rootNodeSearching.insertAdjacentHTML('afterbegin', mealCardTemplate(this.data));
        return this.rootNodeSearching;
    }

    public getMealTemplate(onclick: (e: Event) => void): HTMLElement {
        this.rootNodeMeal.onclick = (e: Event) => onclick(e);
        this.rootNodeMeal.insertAdjacentHTML('afterbegin', userMealCardTemplate(this.data));
        return this.rootNodeMeal;
    }
}
export default MealCard;
