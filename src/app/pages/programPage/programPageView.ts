import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import storageManager from '../../services/storageManager';
import { TSettings, TWorkout } from '../../services/types';
import StatisticWeekWidget from '../../components/statWeekWidget/statisticWeekWidget';
import MealPageView from '../mealPage/mealPageView';
import { TUser } from '../../services/types';
import templateFav from '../../components/card/templateFav';
import cardFavDecorative from '../../components/card/templateFavDecorative';
import cardFavEmpty from '../../components/card/emptyFavCard';

class ProgramPageView {
    private rootNode: HTMLElement;

    contentBlock!: Node<HTMLElement>;

    cardsWrapper!: Node<HTMLElement>;

    private weekWidget: StatisticWeekWidget;

    private programContent: Node<HTMLElement>;

    private contentWrapper: Node<HTMLElement>;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.programContent = new Node(null, 'div', 'left-block');
        this.contentWrapper = new Node(null, 'div', 'main-content');
        this.weekWidget = new StatisticWeekWidget();
    }

    public render(data: Card[], onclick: (e: Event) => void, week: number): void {
        this.rootNode.textContent = '';
        this.programContent.node.textContent = '';
        this.contentWrapper.node.textContent = '';

        this.rootNode.append(Header.getTemplate());
        const user = <TUser>storageManager.getItem('user', 'local');

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu(true, 'Program');
        navbar.addProfileLink(user.name.split('')[0]);

        this.setContents(data, onclick, week);
        this.rootNode.append(Footer.getTemplate());
    }

    private setContents(data: Card[], onclick: (e: Event) => void, week: number): void {
        const program = new Node(this.rootNode, 'main', 'main-layout');
        Node.setChild(program.node, 'div', 'decorative');
        program.node.append(this.contentWrapper.node);
        this.contentWrapper.node.append(this.programContent.node);
        this.contentBlock = new Node(this.programContent.node, 'section', 'content-block z-depth-1');
        Node.setChild(this.contentBlock.node, 'h2', 'hidden', 'Program');

        this.getContentBlockTitle(week);
        this.getCards(data, onclick);
        this.cardsWrapper.node.insertAdjacentHTML('beforeend', this.getAddWorkoutBlock());
        this.programContent.node.insertAdjacentHTML('beforeend', new MealPageView().getSectionMeal());
    }

    private getContentBlockTitle(week: number): void {
        const titleBlock = new Node(this.contentBlock.node, 'div', 'title-block');
        const titleWrapper = new Node(titleBlock.node, 'div');
        Node.setChild(titleWrapper.node, 'p', 'title card-title gradient-text', 'Kick start');
        Node.setChild(titleWrapper.node, 'p', 'subtitle', `Week ${week + 1}`);
    }

    private getCards(data: Card[], onclick: (e: Event) => void): void {
        const cardElems = data.map((card: Card, index: number) => card.getTemplate(onclick, index));

        this.cardsWrapper = new Node(this.contentBlock.node, 'div', 'workout-list');
        this.cardsWrapper.node.append(...cardElems);
    }

    private getAddWorkoutBlock(): string {
        return `
        <div class="program-card z-depth-1">
            <h3 class="title card-title title-container">Add Workout</h3>
            <div class="image-container">
            <div class="image lighthen"></div>
            <div class="add-block">
                <img class="red-plus" src="./assets/img/svg/add.svg" alt="" />
            </div>
            </div>
            <div class="card-info">
                <ol class="subtitle list">
                    <li>Tap on any workout card</li>
                    <li>Select <span class="bold-text">Add to Program</span></li>
                </ol>
            </div>
        </div>        
        `;
    }

    public renderFavs(favs: TWorkout[], onclick: (e: Event) => void): void {
        const favWrapper = new Node(this.programContent.node, 'div', 'fav-wrapper');
        favWrapper.node.insertAdjacentHTML('afterbegin', cardFavDecorative());
        if(favs.length) {
            const allCards = favs.map((card: TWorkout) => {
                const cardFav = new Node(null, 'div', 'program-card fav-card');
                cardFav.node.id = String(card._id);
                cardFav.node.onclick = (e: Event) => onclick(e);
                cardFav.node.insertAdjacentHTML('beforeend', templateFav(card));
                return cardFav.node;
            });
            favWrapper.node.append(...allCards);
        } else {
            favWrapper.node.insertAdjacentHTML('beforeend', cardFavEmpty())
        }
        
        
    }

    public renderStatBlock(settings: TSettings, clickHandler: () => void) {
        const containerWidget = new Node(null, 'div', 'container-stat');
        const widget = this.weekWidget.getTemplate(settings, true, clickHandler);
        containerWidget.node.append(widget);
        this.contentWrapper.node.append(containerWidget.node);
    }
}

export default ProgramPageView;

