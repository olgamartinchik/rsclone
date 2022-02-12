import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import profile from '../../components/profile/profile';
import storageManager from '../../services/storageManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import Utils from '../../services/utils';
import { TBadge, TSettings } from '../../services/types';

class ProfilePageView {
    private rootNode: HTMLElement;

    private materializeHandler: MaterializeHandler;
    
    private badges: Array<TBadge>
    
    private userName: string;
    
    private gender: string;
    
    private completedWorkouts: number;
    
    private caloriesBurned: number;
    
    private badgesActivated: Array<string>;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.badges = Utils.getBadges();
        this.badgesActivated = [];
        this.userName = '';
        this.gender = '';
        this.completedWorkouts = 0;
        this.caloriesBurned = 0;
    }

    public render(onchange: (e: Event) => void) {
        this.rootNode.textContent = '';
        this.getData();
        const src = this.formAvatarSrc();

        this.createHeader();
        this.createProfileHeader(src);
        this.createFooter();

        this.addEvents(onchange);
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
        this.rootNode.append(profile.getTemplate(this.userName, src, this.badges, this.badgesActivated ,this.completedWorkouts, this.caloriesBurned));
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
        this.gender = (<TSettings>storageManager.getItem('userSettings', 'local')).gender;
        this.completedWorkouts = (<TSettings>storageManager.getItem('userSettings', 'local')).completedWorkouts;
        this.caloriesBurned = (<TSettings>storageManager.getItem('userSettings', 'local')).caloriesBurned;
        this.badgesActivated = (<TSettings>storageManager.getItem('userSettings', 'local')).badges;
    }

    public formAvatarSrc(): string {
        let src = '';

        // const avatar = (<TSettings>storageManager.getItem('userSettings', 'local')).avatar;
        // const src = (avatar) ? avatar : {
            // if (this.gender === 'female') {
            //     src = '../../../assets/img/avatar/female-avatar.png';
            // } else if (this.gender === 'male') {
            //     src = '../../../assets/img/avatar/male-avatar.png';
            // }   
        // }

        if (this.gender === 'female') {
            src = '../../../assets/img/avatar/female-avatar.png';
        } else if (this.gender === 'male') {
            src = '../../../assets/img/avatar/male-avatar.png';
        } else if (this.gender === 'other') {
            src = '../../../assets/img/avatar/other-avatar.png';
        }
        return src;
    }

    private addEvents(onchange: (e: Event) => void): void {
        const fileInput = <HTMLInputElement>this.rootNode.querySelector('#avatar');
        if (fileInput) fileInput.onchange = (e: Event) => onchange(e);
    }
}

export default ProfilePageView;
