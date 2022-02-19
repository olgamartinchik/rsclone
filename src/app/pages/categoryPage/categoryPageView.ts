import Card from '../../components/card/card';
import Node from '../../components/Node';
import NavBar from '../../components/header/navbar';
import header from '../../components/header/header';
import footer from '../../components/footer/footer';
import storageManager from '../../services/storageManager';

export default class CategoryPageView {
    private rootNode: HTMLElement;
    private mainLayout: Node<HTMLElement> | null;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.mainLayout = null;
    }

    public render(
        isLogin: boolean,
        title: string,
        data: Card[],
        onCardClick: (e: Event) => void,
        signUpHandler: () => void
    ): void {
        if (isLogin) {
            this.createAuthorizedHeader();
        } else {
            this.createNotAuthorizedHeader(signUpHandler);
        }
        this.mainLayout = new Node(this.rootNode, 'main', 'main-layout category');
        this.renderTitle(title);
        this.addBackButton();
        this.renderFiltersBlock();
        this.renderFilteredWorkouts(data, onCardClick);
        this.rootNode.append(footer.getTemplate());
    }

    private createAuthorizedHeader(): void {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());
        const user = <string>storageManager.getItem('user', 'local');
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('Browse');
        navbar.addProfileLink(user);
    }

    private createNotAuthorizedHeader(signUpHandler: () => void): void {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Team', 'Browse', 'Login'], true);
        navbar.generateMenu();
        if (navbar.button) {
            navbar.button.button.node.onclick = () => signUpHandler();
        }
    }

    private renderTitle(text: string): void {
      const title = new Node(this.mainLayout!.node, 'h2', 'category-title', text);
    }

    private addBackButton(): void {
      const backButton = Node.setChild(this.mainLayout!.node, 'a', 'back-btn category');
      backButton.setAttribute('href', '#/browse');
      Node.setChild(backButton, 'i', 'icon arrow-left');
    }

    private renderFiltersBlock(): void {
      const filtersWrapper = Node.setChild(this.mainLayout!.node, 'div')
    }

    private renderFilteredWorkouts(data: Card[], onclick: (e: Event) => void): void {
        const cardElems = data.map((card: Card, index: number) => card.getTemplate(onclick, index));

        const cardsWrapper = Node.setChild(this.mainLayout!.node, 'div', 'workouts-wrapper category');
        cardsWrapper.append(...cardElems);
    }
}
