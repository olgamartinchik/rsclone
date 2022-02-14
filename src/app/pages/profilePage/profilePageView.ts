import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import profile from '../../components/profile/profile';
import storageManager from '../../services/storageManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import avatarManager from '../../services/avatarManager';
import Utils from '../../services/utils';
import { TBadge, TToken, TSettings } from '../../services/types';

class ProfilePageView {
    private rootNode: HTMLElement;

    private materializeHandler: MaterializeHandler;
    
    private badges: Array<TBadge>
    
    private userName: string;
    
    private completedWorkouts: number;
    
    private caloriesBurned: number;
    
    private badgesActivated: Array<string>;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.badges = Utils.getBadges();
        this.badgesActivated = [];
        this.userName = '';
        this.completedWorkouts = 0;
        this.caloriesBurned = 0;
    }

    public render(onchange: (e: Event) => void, onclick: (e: Event) => void) {
        this.rootNode.textContent = '';
        this.getData();
        const src = avatarManager.formAvatarSrc();

        this.createHeader();
        this.createProfileHeader(src);
        this.createFooter();

        this.addEvents(onchange, onclick);
        this.materializeHandler.initModal();
    }

    private createHeader(): void {
        this.rootNode.append(header.getTemplate());
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu(true, 'Profile');
        navbar.addProfileLink(this.userName.split('')[0], true);
    }

    public createProfileHeader(src: string): void {
        const avatar = (<TToken>storageManager.getItem('token', 'local')).avatar;
        this.rootNode.append(profile.getTemplate(this.userName, src, this.badges, this.badgesActivated ,this.completedWorkouts, this.caloriesBurned));
        if (avatar) avatarManager.toggleEditIcon();
        this.colorStatistics();
    }

    private colorStatistics(): void {
        const statistics = <Array<HTMLElement>>Array.from(this.rootNode.querySelectorAll('[data-statistics]'));
        statistics.forEach((statistic) => {
            if (parseInt(statistic.innerHTML) > 0) {
                (<HTMLElement>statistic.parentElement).className = 'profile-stats-info profile activated';
            } else if (parseInt(statistic.innerHTML) === 0) {
                (<HTMLElement>statistic.parentElement).className = 'profile-stats-info';
            }
        });
    }
         
    private createFooter(): void {     
        this.rootNode.append(footer.getTemplate());
    }

    private getData(): void {
        this.userName = <string>storageManager.getItem('user', 'local');
        this.completedWorkouts = (<TSettings>storageManager.getItem('userSettings', 'local')).completedWorkouts;
        this.caloriesBurned = (<TSettings>storageManager.getItem('userSettings', 'local')).caloriesBurned;
        this.badgesActivated = (<TSettings>storageManager.getItem('userSettings', 'local')).badges;
    }

    private addEvents(onchange: (e: Event) => void, onclick: (e: Event) => void): void {
        const fileInput = <HTMLInputElement>this.rootNode.querySelector('#avatar');
        if (fileInput) fileInput.onchange = (e: Event) => onchange(e);

        const agreeToDeleteBtn = <HTMLElement>document.querySelector('.modal-close');
        if (agreeToDeleteBtn) {
            agreeToDeleteBtn.onclick = (e: Event) => onclick(e);
        }
    }
}

export default ProfilePageView;
