import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import storageManager from '../../services/storageManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import badgesActiveTemp from '../../components/achievement/templateActive';
import { BadgesAmount } from '../../services/constants';

class ProfilePageView {
    private rootNode: HTMLElement;

    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
    }

    public render(badges: string[]): void {
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
        navbar.generateMenu();
        navbar.addProfileLink(user, true);

        this.rootNode.insertAdjacentHTML('beforeend', this.template(badges));

        this.rootNode.append(footer.getTemplate());
        this.materializeHandler.initModal();
    }

    private template(badges: string[]): string {
        let badgesTemplate = '';
        let index = 0;
        while (index < BadgesAmount.amount) {
            badgesTemplate += badgesActiveTemp(index, badges[index]);
            index += 1;
        }
        return `
        <main class="main-layout">
            <div class="profile-header">
                <div class="profile-decorative"></div>
                <div class="profile-decorative narrow"></div>
                <div class="profile-header_info z-depth-1">
                    <div class="avatar">
                        <canvas class="profile-avatar"></canvas>
                        <span class="icon-upload"><i class="icon pencil"></i></span>
                    </div>
                    <p class="profile-name title">Olga</p>
                    <div class="profile-workout-info">
                        <div class="profile-stats-block">
                            <div class="profile-stats-icon"><i class="icon medal"></i></div>
                            <div class="profile-stats-info">
                                <p>0</p>
                                <p>Workouts</p>
                            </div>
                        </div>
                        <div class="profile-stats-block">
                        <div class="profile-stats-icon"><i class="icon calories"></i></div>
                        <div class="profile-stats-info">
                            <p>0</p>
                            <p>Calories</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="profile-content-block">
                <h2 class="title">Achievements</h2>
                <div class="profile-content item">
                    ${badgesTemplate}                                                                                
                </div>
            </div>
        </main>
        `;
    }
}

export default ProfilePageView;
