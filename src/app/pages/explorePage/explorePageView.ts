import MealCard from '../../components/card/edamamCards';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import storageManager from '../../services/storageManager';
import { IDataExplore, TUser } from '../../services/types';

class ExplorePageView {
    private rootNode: HTMLElement;

    private tabsData: string[];

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.tabsData = ['balanced', 'high-fiber', 'low-carb', 'low-fat', 'low-sodium'];
    }

    render(diet: string) {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());
        const user = <TUser>storageManager.getItem('user', 'local');

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu(true);
        navbar.addProfileLink(user.name.split('')[0]);

        this.createContentExplore(diet);
        this.rootNode.append(footer.getTemplate());
    }

    createContentExplore(diet: string) {
        const main = new Node(this.rootNode, 'main', 'main-layout main-diet');
        const mealTypeSection = new Node(main.node, 'section', 'meal-type-section');
        const linkBack = new Node(mealTypeSection.node, 'a', 'arrow-back');
        linkBack.setAttribute('href', '#meal');
        Node.setChild(linkBack.node, 'i', 'fas fa-long-arrow-alt-left');

        Node.setChild(mealTypeSection.node, 'h1', 'title-type', `${diet}`);
        const mealSection = new Node(main.node, 'section', 'meal-section diet-menu-section');
        const pageContainer = new Node(mealSection.node, 'div', 'row');
        const tabsContainer = new Node(pageContainer.node, 'div', 'col s12');
        const ul = new Node(tabsContainer.node, 'ul', 'tabs');
        ul.setAttribute('id', 'tabs-swipe-demo');

        this.tabsData.forEach((tab, ind) => {
            const li = new Node(ul.node, 'li', 'tab col s3');
            const a = new Node(li.node, 'a', 'tab-explore', tab);
            a.setAttribute('data-diet', tab);
            a.setAttribute('href', `#tab-${ind}`);
        });
        this.tabsData.forEach((el, ind) => {
            const exploreWrapper = new Node(tabsContainer.node, 'div', 'col s12');
            exploreWrapper.setAttribute('id', `tab-${ind}`);
            const exploreContainer = new Node(exploreWrapper.node, 'div', 'explore-container diet-container', el);
            exploreContainer.setAttribute('data-diet', el);
        });
    }

    getCardsDiet(dietData: Array<IDataExplore>, onclick: (e: Event) => void) {
        const cards = dietData.map((data, ind) => new MealCard(data).getMealTemplate(onclick, ind));
        return cards;
    }
}

export default ExplorePageView;
