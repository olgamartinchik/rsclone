import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import profile from '../../components/profile/profile';
import storageManager from '../../services/storageManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import avatarManager from '../../services/avatarManager';
import Utils from '../../services/utils';
import { TBadge, TToken, TSettings, TUser } from '../../services/types';

class ProfilePageView {
    private rootNode: HTMLElement;

    private materializeHandler: MaterializeHandler;

    private badges: Array<TBadge>;

    private userName: string;

    private completedWorkouts: number;

    private caloriesBurned: number;

    private badgesActivated: Array<string>;

    private avatar: string | undefined;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.badges = Utils.getBadges();
        this.badgesActivated = [];
        this.userName = '';
        this.completedWorkouts = 0;
        this.caloriesBurned = 0;
        this.avatar = '';
    }

    public async render(badges: string[], onchange: (e: Event) => void, onclick: (e: Event) => void) {
        this.rootNode.textContent = '';
        this.badgesActivated = badges;
        this.getData();
        const src = avatarManager.formAvatarSrc();

        this.createHeader();
        this.createProfileHeader(src);

        const avatar = (<TUser>storageManager.getItem('user', 'local')).avatar;
        if (avatar) avatarManager.setDeleteIcon();

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
        this.rootNode.append(
            profile.getTemplate(
                this.userName,
                src,
                this.badges,
                this.badgesActivated,
                this.completedWorkouts,
                this.caloriesBurned
            )
        );
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
        this.userName = (<TUser>storageManager.getItem('user', 'local')).name;
        this.avatar = (<TToken>storageManager.getItem('token', 'local')).avatar;
        this.completedWorkouts = (<TSettings>storageManager.getItem('userSettings', 'local')).completedWorkouts;
        this.caloriesBurned = (<TSettings>storageManager.getItem('userSettings', 'local')).caloriesBurned;
        this.badgesActivated = (<TSettings>storageManager.getItem('userSettings', 'local')).badges;
    }

    private addEvents(onchange: (e: Event) => void, onclick: (e: Event) => void): void {
        const fileInput = <HTMLInputElement>this.rootNode.querySelector('#avatar');
        if (fileInput) fileInput.onchange = (e: Event) => onchange(e);

        const agreeToDeleteBtn = <HTMLElement>document.querySelector('#deleteAvatar');
        if (agreeToDeleteBtn) {
            agreeToDeleteBtn.onclick = (e: Event) => onclick(e);
        }
    }
}

export default ProfilePageView;
