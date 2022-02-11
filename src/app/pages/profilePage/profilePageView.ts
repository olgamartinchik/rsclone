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

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.badges = Utils.getBadges();
        this.userName = '';
        this.gender = '';
    }

    public render() {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());
        this.getData();
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu();
        navbar.addProfileLink(this.userName.split('')[0], true);

        this.rootNode.append(profile.getTemplate(this.userName, this.formAvatarSrc(), this.badges));

        this.rootNode.append(footer.getTemplate());
        this.materializeHandler.initModal();
    }

    private getData(): void {
        this.userName = <string>storageManager.getItem('user', 'local');
        this.gender = (<TSettings>storageManager.getItem('userSettings', 'local')).gender;
    }

    private formAvatarSrc(): string {
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
        }
        return src;
    }
}

export default ProfilePageView;
