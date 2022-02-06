import MaterializeHandler from '../../services/materialize/materializeHandler';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import Button from '../../components/Button';
import { GoalTitles } from '../../services/constants';

class EditPlanPageView {
    private rootNode: HTMLElement;
    
    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
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
        const decorativeImg = Node.setChild(decorativeBlock, 'img', 'center-img editplan') as HTMLImageElement;
        decorativeImg.src = '../../../assets/img/svg/kick_start.svg';
        const editPlanWrapper = Node.setChild(main.node, 'div', 'settings-wrapper');

        this.createPlanItem(editPlanWrapper, 'Fitness Goal', 'target');

        const buttonWrapper = Node.setChild(editPlanWrapper, 'div', 'btn-wrapper settings');
        const saveButton = new Button(buttonWrapper, 'Save');
    }

    private createPlanItem (parentNode: HTMLElement, title: string, icon: string): void {
        const planItemWrapper = Node.setChild(parentNode, 'div', 'plan-item wrapper');
        planItemWrapper.insertAdjacentHTML('afterbegin', this.planItemTitle(title, icon));
        this.createSelectBlock(planItemWrapper, [GoalTitles.muscle, GoalTitles.relax, GoalTitles.toned, GoalTitles.weight]);
        
        this.materializeHandler.initSelect();
    }

    private planItemTitle(text: string, icon: string): string {
        return `
        <p class="settings-link">
            <i class="icon ${icon}"></i>
            ${text}
        </p>
        `
    }

    private createSelectBlock(parentNode: HTMLElement, options: Array<string>): void {
        const selectBlockWrapper = Node.setChild(parentNode, 'div', 'input-field col s12');
        const selectTag = Node.setChild(selectBlockWrapper, 'select');
        options.forEach((option, index) => {
            const selectOption = Node.setChild(selectTag, 'option', '', option);
            selectOption.setAttribute('value', (index + 1).toString());
        });
    }
}

export default EditPlanPageView;
