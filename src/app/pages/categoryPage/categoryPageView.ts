import Card from '../../components/card/card';
import checkbox from '../../components/checkbox/checkbox';
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
        signUpHandler: () => void,
        checkboxHandler: (e: Event) => void
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

        this.addEvents(checkboxHandler);
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
        navbar.generateMenu(true, 'Browse');
        navbar.addProfileLink(user);
    }

    private createNotAuthorizedHeader(signUpHandler: () => void): void {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Team', 'Browse', 'Login'], true);
        navbar.generateMenu(false);
        if (navbar.button) {
            navbar.button.button.node.onclick = () => signUpHandler();
        }
    }

    private renderTitle(text: string): void {
      new Node(this.mainLayout!.node, 'h2', 'category-title', text);
    }

    private addBackButton(): void {
      const backButton = Node.setChild(this.mainLayout!.node, 'a', 'back-btn category');
      backButton.setAttribute('href', '#/browse');
      Node.setChild(backButton, 'i', 'icon arrow-left');
    }

    private renderFiltersBlock(): void {
      const filtersWrapper = Node.setChild(this.mainLayout!.node, 'div', 'filters-block');
      this.renderFiltersSubBlock(filtersWrapper, 'equipment', 'Choose equipment needed', ['dumbbells', 'towel', 'mat', 'none', 'all equipment'], ['ALL']);
    }

    private renderFiltersSubBlock(parentNode: HTMLElement, type: string, text: string, options: Array<string>, selectedOptions: Array<string>): void {
        const filtersSubBlockWrapper = Node.setChild(parentNode, 'fieldset', 'checkbox z-depth-1');
        filtersSubBlockWrapper.setAttribute('data-type', type);
        Node.setChild(filtersSubBlockWrapper, 'legend', '', text); 
        filtersSubBlockWrapper.append(checkbox.getTemplate('', options, selectedOptions));
    }

    public renderFilteredWorkouts(data: Card[], onclick: (e: Event) => void): void {
        const cardElems = data.map((card: Card, index: number) => card.getTemplate(onclick, index));
        let cardsWrapper = <HTMLElement>this.rootNode.querySelector('.workouts-wrapper.category');
        
        if (!cardsWrapper) {
            cardsWrapper = Node.setChild(this.mainLayout!.node, 'div', 'workouts-wrapper category');
        } else {
            cardsWrapper.textContent = '';
        }
        
        cardsWrapper.append(...cardElems);
    }
    
    public renderMessage(text: string) {
        let cardsWrapper = <HTMLElement>this.rootNode.querySelector('.workouts-wrapper.category');
        if (cardsWrapper) {
            cardsWrapper.textContent = text;
        }
    }

    private addEvents(checkboxHandler: (e: Event) => void): void {
        const checkboxFieldset = <HTMLElement>this.rootNode.querySelector('fieldset.checkbox');
        checkboxFieldset.onclick = (e: Event) => checkboxHandler(e);
        const spans = checkboxFieldset.querySelectorAll('span');
        spans.forEach((span) => {
            span.onclick = (e: Event) => e.stopPropagation();
        })
    }
}
