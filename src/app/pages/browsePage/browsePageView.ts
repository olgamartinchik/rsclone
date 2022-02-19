import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Card from '../../components/card/card';
import Node from '../../components/Node';
import Button from '../../components/Button';
import workoutHeaderTemplate from '../../components/workout/template';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import storageManager from '../../services/storageManager';
import { WorkoutType } from '../../services/constants';
import { TUser } from '../../services/types';

class BrowsePageView {
    public rootNode: HTMLElement;
    
    private materializeHandler: MaterializeHandler;
    private angle: number;
    private cardsWrapper!: Node<HTMLElement>;
    private mainLayout: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.mainLayout = <HTMLElement>document.getElementById('browse');
        this.materializeHandler = new MaterializeHandler();
        this.angle = 0;
    }

    public render(isLogin: boolean, card: Card, signUpHandler: () => void, startVideo: (e: Event) => void, onParameterClick: (e: Event) => void) {
        if (isLogin) {
            this.createAuthorizedHeader()
        } else {
            this.createNotAuthorizedHeader(signUpHandler);
        }
        this.createContent(isLogin, card, startVideo, onParameterClick);
        this.rootNode.append(footer.getTemplate());
        this.initMaterialize();
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

    private createContent(isLogin: boolean, card: Card, startVideo: (e: Event) => void, onParameterClick: (e: Event) => void): void {
        const mainLayout = new Node(this.rootNode, 'main', 'main-layout browse');
        mainLayout.setAttribute('id', 'browse');
        mainLayout.node.insertAdjacentHTML('afterbegin', workoutHeaderTemplate(card));
        mainLayout.node.append(this.getWorkoutDetailsLayout(card, startVideo));

        const buttonFav = <HTMLElement>document.querySelector('.workout-fav');
        if (!isLogin && buttonFav) {
            buttonFav.style.opacity = '0';
        }

        this.createParamBlock(mainLayout.node, 'Classes', onParameterClick);
    }

    private getWorkoutDetailsLayout(card: Card, startVideo: (e: Event) => void): HTMLElement {
        const workoutDetails = new Node(null, 'div', 'workout-details');
        const workoutContainer = new Node(workoutDetails.node, 'div', 'workout-container buttons');
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

        return workoutDetails.node;
    }

    private createParamBlock(parentNode: HTMLElement, title: string, onParameterClick: (e: Event) => void): void {
        const blockWrapper = new Node(parentNode, 'div', 'browse-block');
        Node.setChild(blockWrapper.node, 'h2', 'browse-block-title', title);
        this.setContent(title, blockWrapper.node, onParameterClick);
    }

    private setContent(title: string, parentNode: HTMLElement, onParameterClick: (e: Event) => void) {
        switch(title) {
            case 'Classes':
                this.createClassesBlock(parentNode, onParameterClick);
                break;
        }
    }

    private createClassesBlock(parentNode: HTMLElement, onParameterClick: (e: Event) => void): void {
        const classesWrapper = new Node(parentNode, 'div', 'classes-block');
        const classes = [
            WorkoutType.yoga, 
            WorkoutType.stretch, 
            WorkoutType.strength, 
            WorkoutType.pilates,
            WorkoutType.meditation,
            WorkoutType.dance,
            WorkoutType.cardio,
            WorkoutType.boxing,
            WorkoutType.HIIT
        ];
        classes.forEach((item) => {
            const classesCard = Node.setChild(classesWrapper.node, 'div', 'type-card');
            classesCard.style.backgroundImage =  `linear-gradient(0deg, rgba(129, 131, 132, 0.7), rgba(129, 131, 132, 0.7)), url("../../../assets/img/classes/${item}.jpg")`;
            classesCard.setAttribute('data-type', 'type');
            classesCard.setAttribute('data-value', item);
            classesCard.onclick = (e: Event) => onParameterClick(e);

            Node.setChild(classesCard, 'span', '', item.toUpperCase());
        });
    }

    private initMaterialize(): void {
        this.materializeHandler.initModal();
    }
}

export default BrowsePageView;
