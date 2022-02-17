import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Card from '../../components/card/card';
import Node from '../../components/Node';
import Button from '../../components/Button';
import workoutHeaderTemplate from '../../components/workout/template';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import storageManager from '../../services/storageManager';

class BrowsePageView {
    public rootNode: HTMLElement;
    
    private materializeHandler: MaterializeHandler;
    angle: number;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.angle = 0;
    }

    public render(isLogin: boolean, card: Card, signUpHandler: () => void, startVideo: (e: Event) => void) {
        if (isLogin) {
            this.createAuthorizedHeader()
        } else {
            this.createNotAuthorizedHeader(signUpHandler);
        }
        this.createContent(isLogin, card, startVideo);
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

    private createContent(isLogin: boolean, card: Card, startVideo: (e: Event) => void): void {
        const mainPage = new Node(this.rootNode, 'main', 'main-layout browse');
        mainPage.node.insertAdjacentHTML('afterbegin', workoutHeaderTemplate(card));
        mainPage.node.append(this.getWorkoutDetailsLayout(card, startVideo));

        const buttonFav = <HTMLElement>document.querySelector('.workout-fav');
        if (!isLogin && buttonFav) {
            buttonFav.style.opacity = '0';
        }
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

    private initMaterialize(): void {
        this.materializeHandler.initModal();
    }
}

export default BrowsePageView;
