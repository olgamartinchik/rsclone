import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import profile from '../../components/profile/profile';
import storageManager from '../../services/storageManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import Utils from '../../services/utils';
import { TBadge } from '../../services/types';

class ProfilePageView {
    private rootNode: HTMLElement;
    
    private materializeHandler: MaterializeHandler;
    
    private badges: Array<TBadge>

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.badges = Utils.getBadges();
    }

    render() {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());
        const userName = <string>storageManager.getItem('user', 'local');
        const userLetter = userName.split('')[0];
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu();
        navbar.addProfileLink(userLetter, true);

        this.rootNode.append(profile.getTemplate(userName, this.badges));

        this.rootNode.append(footer.getTemplate());
        this.materializeHandler.initModal();
    }
}

export default ProfilePageView;
