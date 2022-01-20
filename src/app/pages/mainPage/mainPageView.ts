import Card from '../../components/card/card';
import footer from '../../components/footer/footer';
import menu from '../../components/menu/menu';
import Node from '../../components/Node';

class MainPageView {
    private rootNode: HTMLElement;
    contentBlock!: Node<HTMLElement>;
    cardsWrapper!: Node<HTMLElement>;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(data: Card[], onclick: (e: Event) => void): void {
        this.rootNode.textContent = '';
        this.rootNode.append(menu.getTemplate());
        this.setContents(data, onclick);
        this.rootNode.append(footer.getTemplate());
    }

    setContents(data: Card[], onclick: (e: Event) => void): void {
        const main = new Node(this.rootNode, 'main', 'main-page');
        new Node(main.node, 'div', 'decorative');
        const contentWrapper = new Node(main.node, 'div', 'main-content');
        const mainContent = new Node(contentWrapper.node, 'div','left-block');
        this.contentBlock = new Node(mainContent.node, 'div', 'content-block z-depth-1');
        
        
        this.contentBlock.node.insertAdjacentHTML('afterbegin', this.getContentBlockTitle());
        this.getCards(data, onclick);
        this.cardsWrapper.node.insertAdjacentHTML('beforeend', this.getAddWorkoutBlock());
    }

    getContentBlockTitle(): string {
        return `
        <div class="title-block">   
            <div>
              <p class="title card-title gradient-text">Kick start</p>
              <p class="subtitle">Week 1</p> 
            </div>
            <span>See all</span>
        </div>
        `;
    }

    getCards(data: Card[], onclick: (e: Event) => void): void {
        const cardElems = data.map((card) => card.getTemplate(onclick));
        
        this.cardsWrapper = new Node(this.contentBlock.node, 'div', 'workout-list'); 
        this.cardsWrapper.node.append(...cardElems);
    }

    getAddWorkoutBlock(): string {
        return `
        <div class="program-card z-depth-1">
            <div class="image-container">
            <div class="image lighthen"></div>
            <div class="add-block">
                <img class="red-plus" src="./assets/img/svg/add.svg" alt="" />
            </div>
            </div>
            <div class="card-info">
            <div class="title card-title">Add Workout</div>
            <ol class="subtitle list">
                <li>Tap on any workout card</li>
                <li>Tap <span class="bold-text">•••</span> in the top right</li>
                <li>Select <span class="bold-text">Add to Program</span></li>
            </ol>
            </div>
        </div>
        `;
    }
}

export default MainPageView;
