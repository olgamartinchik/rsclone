import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import storageManager from '../../services/storageManager';

class ProgramPageView {
    private rootNode: HTMLElement;

    contentBlock!: Node<HTMLElement>;

    cardsWrapper!: Node<HTMLElement>;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(data: Card[], onclick: (e: Event) => void, week: number): void {
        this.rootNode.textContent = '';
        this.rootNode.append(Header.getTemplate());
        const user = <string>storageManager.getItem('user', 'local');
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('Program');
        navbar.addProfileLink(user);

        this.setContents(data, onclick, week);
        this.rootNode.append(Footer.getTemplate());
    }

    setContents(data: Card[], onclick: (e: Event) => void, week: number): void {
        const Program = new Node(this.rootNode, 'main', 'main-layout');
        Node.setChild(Program.node, 'div', 'decorative');
        const contentWrapper = new Node(Program.node, 'div', 'main-content');
        const ProgramContent = new Node(contentWrapper.node, 'div', 'left-block');
        this.contentBlock = new Node(ProgramContent.node, 'section', 'content-block z-depth-1');
        Node.setChild(this.contentBlock.node, 'h2', 'hidden', 'Program');

        this.getContentBlockTitle(week);
        this.getCards(data, onclick);
        this.cardsWrapper.node.insertAdjacentHTML('beforeend', this.getAddWorkoutBlock());
    }

    getContentBlockTitle(week: number): void {
        const titleBlock = new Node(this.contentBlock.node, 'div', 'title-block');
        const titleWrapper = new Node(titleBlock.node, 'div');
        Node.setChild(titleWrapper.node, 'p', 'title card-title gradient-text', 'Kick start');
        Node.setChild(titleWrapper.node, 'p', 'subtitle', `Week ${week + 1}`);
        Node.setChild(titleBlock.node, 'span', '', 'See all');
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

export default ProgramPageView;
