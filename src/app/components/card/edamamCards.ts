import { exploreCardTemplate, searchingCardTemplate, userMealCardTemplate } from './templateMealCard';
import { IDataExplore } from '../../services/types';
class MealCard {
    private rootNodeExplore: HTMLElement;

    private rootNodeSearching: HTMLElement;

    private rootNodeMeal: HTMLElement;

    private data: IDataExplore;

    constructor(data: IDataExplore) {
        this.data = data;
        // this.position=0
        this.rootNodeExplore = document.createElement('a');
        // this.rootNodeExplore.className = '';
        this.rootNodeExplore.setAttribute('href', '#/explore');
        this.rootNodeSearching = document.createElement('a');
        this.rootNodeSearching.setAttribute('href', '#/recipe');
        this.rootNodeMeal = document.createElement('a');
        this.rootNodeMeal.setAttribute('href', '#/recipe');
    }

    public getMealTemplate(onclick: (e: Event) => void, position: number): HTMLElement {
        this.rootNodeMeal.onclick = (e: Event) => onclick(e);
        this.rootNodeMeal.insertAdjacentHTML('afterbegin', userMealCardTemplate(this.data, position));
        return this.rootNodeMeal;
    }

    public getExploreTemplate(onclick: (e: Event) => void, position: number): HTMLElement {
        this.rootNodeExplore.onclick = (e: Event) => onclick(e);
        this.rootNodeExplore.insertAdjacentHTML('afterbegin', exploreCardTemplate(this.data, position));
        return this.rootNodeExplore;
    }

    public getSearchingTemplate(onclick: (e: Event) => void, position: number): HTMLElement {
        this.rootNodeSearching.onclick = (e: Event) => onclick(e);
        this.rootNodeSearching.insertAdjacentHTML('afterbegin', searchingCardTemplate(this.data, position));
        return this.rootNodeSearching;
    }
}
export default MealCard;
