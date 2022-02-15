import Button from '../../components/Button';
import Card from '../../components/card/card';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import workoutHeaderTemplate from '../../components/workout/template';
import workoutDesc from '../../components/workout/workoutDescription';
import storageManager from '../../services/storageManager';
import { TUser } from '../../services/types';

class WorkoutPageView {
    public readonly rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(card: Card, startVideo: (e: Event) => void): void {
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
        this.createMainBlockLayout(card, startVideo);

        this.rootNode.append(footer.getTemplate());
    }

    private createMainBlockLayout(card: Card, startVideo: (e: Event) => void): void {
        const mainPage = new Node(this.rootNode, 'main', 'main-page');
        mainPage.node.insertAdjacentHTML('afterbegin', workoutHeaderTemplate(card));
        mainPage.node.append(this.getWorkoutDetailsLayout(card, startVideo));
    }

    private getWorkoutDetailsLayout(card: Card, startVideo: (e: Event) => void): HTMLElement {
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
        if (card.data._id) buttonStart.button.node.id = card.data._id;
        buttonStart.button.node.onclick = (e: Event) => startVideo(e);
        workoutContainerSm.node.insertAdjacentHTML(
            'afterbegin',
            workoutDesc(card.data.description, card.data.equipment)
        );

        return workoutDetails.node;
    }

    public renderVideo(): void {
        const backButton = new Node(this.rootNode, 'button', '');
        backButton.node.classList.add('btn-back');
        const icon = new Node(backButton.node, 'i', 'large material-icons', 'arrow_back');
        icon.node.onclick = () => {
            icon.destroy();
        };
    }
}

export default WorkoutPageView;
