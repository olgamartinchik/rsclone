import Button from '../../components/Button';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import workoutHeaderTemplate from '../../components/workout/template';
import workoutDesc from '../../components/workout/workoutDescription';

class WorkoutPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(id: string): void {
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
        this.createMainBlockLayout();
        
        this.rootNode.append(footer.getTemplate());
    }

    private createMainBlockLayout(): void {
        const mainPage = new Node(this.rootNode, 'main', 'main-page');
        mainPage.node.insertAdjacentHTML('afterbegin', workoutHeaderTemplate('', '', 23, ''));
        mainPage.node.append(this.getWorkoutDetailsLayout());
    }

    private getWorkoutDetailsLayout(): HTMLElement {
        const workoutDetails = new Node(null, 'div', 'workout-details');
        const workoutContainer = new Node(workoutDetails.node, 'div', 'workout-container');
        const workoutContainerSm = new Node(workoutDetails.node, 'div', 'workout-container workout-container-sm');
        const controls = new Node(workoutContainer.node, 'div', 'workout-controls');
        const buttonFav = new Node(controls.node, 'button', 'workout-fav');
        buttonFav.node.insertAdjacentHTML(
            'afterbegin',
            `<span>favourite</span>
            <i class="far fa-heart"></i>`
        );
        const buttonStart = new Button(controls.node, 'Start');
        buttonStart.button.node.className = 'waves-effect waves-light btn-large';
        workoutContainerSm.node.insertAdjacentHTML('afterbegin', workoutDesc('', ''));

        return workoutDetails.node;
    }

}

export default WorkoutPageView;
