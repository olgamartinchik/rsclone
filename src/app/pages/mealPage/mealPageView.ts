import MealCard from '../../components/card/edamamCards';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import { IDataExplore } from '../../services/types';
import Preloader from '../../components/preloader/preloader';

class MealPageView {
    private rootNode: HTMLElement;

    private rootNodeInput: HTMLElement;

    private rootNodeBtn: HTMLElement;

    cardsWrapper!: Node<HTMLElement>;

    contentBlock!: Node<HTMLElement>;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.rootNodeInput = <HTMLElement>document.createElement('input');
        this.rootNodeInput.className = 'search-meals';
        this.rootNodeBtn = <HTMLElement>document.createElement('button');
    }

    render(
        exploreData: Array<IDataExplore>,
        onclick: (e: Event) => void,
        onchange: (e: Event) => void,
        onclickBtn: (e: Event) => void
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
        navbar.generateMenu('Meal');
        navbar.addProfileLink('O');
        this.createContentMeal(exploreData, onclick, onchange, onclickBtn);

        this.rootNode.append(footer.getTemplate());
    }

    createContentMeal(
        exploreData: Array<IDataExplore>,
        onclick: (e: Event) => void,
        onchange: (e: Event) => void,
        onclickBtn: (e: Event) => void
    ) {
        const main = new Node(this.rootNode, 'main', 'main-layout');
        const sectionUserMeal = new Node(main.node, 'section', 'section meal-section');
        const cardsUserMealContainer = new Node(sectionUserMeal.node, 'div', 'meal-card-container');
        Node.setChild(cardsUserMealContainer.node, 'h5', 'title-meal', 'YOUR MEALS');
        Node.setChild(cardsUserMealContainer.node, 'div', 'divider', '');

        new Node(cardsUserMealContainer.node, 'div', 'day-meals');

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

        inputWrapper.node.append(this.getInputNode(onchange));
        inputWrapper.node.append(this.getSearchingBtn(onclickBtn));

        new Node(searchContainer.node, 'div', 'searching-meals');
    }

    getInputNode(onchange: (e: Event) => void) {
        this.rootNodeInput.setAttribute('placeholder', 'For example: brownie');
        this.rootNodeInput.onchange = (e: Event) => onchange(e);
        return this.rootNodeInput;
    }

    getExploreCards(exploreData: Array<IDataExplore>, onclick: (e: Event) => void) {
        const cards = exploreData.map((data, ind) => new MealCard(data,ind).getExploreTemplate(onclick));
        return cards;
    }

    getMealCards(mealData: Array<IDataExplore>, onclick: (e: Event) => void) {
        const cards = mealData.map((data, ind) => new MealCard(data, ind).getMealTemplate(onclick));
        return cards;
    }

    loadMealCard(mealData: Array<IDataExplore>, onclick: (e: Event) => void) {
        const mealContainer = document.getElementsByClassName('day-meals') as HTMLCollectionOf<Element>;
        mealContainer[0].innerHTML = '';
        const mealCards = this.getMealCards(mealData, onclick);
        mealContainer[0].append(...mealCards);
    }

    getLoaderMealContainer() {
        const mealContainer = document.getElementsByClassName('day-meals') as HTMLCollectionOf<Element>;
        mealContainer[0].innerHTML = '';
        mealContainer[0].append(Preloader.getTemplate());
    }

    getSearchingCards(searchingData: Array<IDataExplore>, onclick: (e: Event) => void) {
        const cards = searchingData.map((data, ind) => new MealCard(data, ind).getSearchingTemplate(onclick));
        return cards;
    }

    loadSearchingData(searchingData: Array<IDataExplore>, onclick: (e: Event) => void) {
        const searchingMealsContainer = document.getElementsByClassName('searching-meals') as HTMLCollectionOf<Element>;
        const searchingCards = this.getSearchingCards(searchingData, onclick);
        searchingMealsContainer[0].innerHTML = '';
        searchingMealsContainer[0].append(...searchingCards);
    }

    getLoaderSearchingContainer() {
        const searchingMealsContainer = document.getElementsByClassName('searching-meals') as HTMLCollectionOf<Element>;
        searchingMealsContainer[0]!.innerHTML = '';
        searchingMealsContainer[0]!.append(Preloader.getTemplate());
        console.log(Preloader.getTemplate())
    }

    getSearchingBtn(onclick: (e: Event) => void) {
        this.rootNodeBtn.onclick = (e: Event) => onclick(e);
        this.rootNodeBtn.className = 'search-btn';
        this.rootNodeBtn.textContent = 'search';
        return this.rootNodeBtn;
    }
}

export default MealPageView;
