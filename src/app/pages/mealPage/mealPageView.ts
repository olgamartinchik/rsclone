import MealCard from '../../components/card/edamamCards';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import { IDataExplore } from '../../services/types';

class MealPageView {
    private rootNode: HTMLElement;

    private rootNodeInput: HTMLElement;

    cardsWrapper!: Node<HTMLElement>;

    contentBlock!: Node<HTMLElement>;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.rootNodeInput = <HTMLElement>document.createElement('input');
        this.rootNodeInput.className = 'search-meals';
    }

    render(
        exploreData: Array<IDataExplore>,
        onclick: (e: Event) => void,
        searchingData: Array<IDataExplore>,
        onclickSearching: (e: Event) => void,
        oninput: (e: Event) => void
    ) {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu();
        navbar.addProfileLink('O');
        // this.rootNode.insertAdjacentHTML('beforeend', this.getSectionForDayMeals() );
        // `<main class="main-page"><span>This is Meal Page!</span></main>`
        this.createContentMeal(exploreData, onclick, searchingData, onclickSearching, oninput);

        this.rootNode.append(footer.getTemplate());
    }

    createContentMeal(
        exploreData: Array<IDataExplore>,
        onclick: (e: Event) => void,
        searchingData: Array<IDataExplore>,
        onclickSearching: (e: Event) => void,
        oninput: (e: Event) => void
    ) {
        const main = new Node(this.rootNode, 'main', 'main-page');
        const sectionUserMeal = new Node(main.node, 'section', 'section meal-section');
        const cardsUserMealContainer = new Node(sectionUserMeal.node, 'div', 'meal-card-container');
        Node.setChild(cardsUserMealContainer.node, 'h5', 'title-meal', 'YOUR MEALS');
        Node.setChild(cardsUserMealContainer.node, 'div', 'divider', '');
        const dayMealContainer = new Node(cardsUserMealContainer.node, 'div', 'day-meals');

        const sectionExplore = new Node(main.node, 'section', 'section meal-section');
        const mealExploreContainer = new Node(sectionExplore.node, 'div', 'meal-explore-container');
        const exploreContainer = new Node(mealExploreContainer.node, 'div', 'meal-explore');
        Node.setChild(exploreContainer.node, 'h5', 'title-meal', 'EXPLORE');
        const cardsExploreContainer = new Node(exploreContainer.node, 'div', 'explore-container');

        const exploreCards = this.getExploreCards(exploreData, onclick);
        cardsExploreContainer.node.append(...exploreCards);

        const sectionSearch = new Node(main.node, 'section', 'section meal-section');
        const searchContainer = new Node(sectionSearch.node, 'div', 'meal-card-container searching-container');
        Node.setChild(searchContainer.node, 'h5', 'title-meal', 'Find the recipe');
        const inputWrapper = new Node(searchContainer.node, 'div', 'input-wrapper');

        inputWrapper.node.append(this.getInputNode(oninput));

        const searchingCardsContainer = new Node(searchContainer.node, 'div', 'searching-meals');

        const searchingCards = this.getSearchingCards(searchingData, onclickSearching);
        searchingCardsContainer.node.append(...searchingCards);
    }

    getInputNode(oninput: (e: Event) => void) {
        this.rootNodeInput.setAttribute('placeholder', 'For example: brownie');
        this.rootNodeInput.oninput = (e: Event) => oninput(e);
        return this.rootNodeInput;
    }

    getExploreCards(exploreData: Array<IDataExplore>, onclick: (e: Event) => void) {
        console.log('exploreData', exploreData);
        const cards = exploreData.map((data) => new MealCard(data).getExploreTemplate(onclick));
        console.log('cards', cards);

        return cards;
    }

    getMealCards() {}

    getSearchingCards(searchingData: Array<IDataExplore>, onclick: (e: Event) => void) {
        // console.log('searchingData',searchingData)
        const cards = searchingData.map((data) => new MealCard(data).getMealTemplate(onclick));
        return cards;
    }
}

export default MealPageView;
