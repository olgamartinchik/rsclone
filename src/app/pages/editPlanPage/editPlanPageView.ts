import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';

class EditPlanPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    public render(): void {
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
        
        this.createMainLayout();

        this.rootNode.append(footer.getTemplate());
    }

    private createMainLayout(): void {
        const main = new Node(this.rootNode, 'main', 'main-layout');
        const decorativeBlock = Node.setChild(main.node, 'div', 'decorative-editplan');
        Node.setChild(decorativeBlock, 'h2', 'title editplan-title', 'Edit plan');
    }
}

export default EditPlanPageView;
