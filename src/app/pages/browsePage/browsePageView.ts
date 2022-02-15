import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import storageManager from '../../services/storageManager';
import { TUser } from '../../services/types';

class BrowsePageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render() {
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
        navbar.generateMenu(true, 'Browse');
        navbar.addProfileLink(user.name.split('')[0]);
        this.rootNode.insertAdjacentHTML(
            'beforeend',
            `<main class="main-layout"><span>This is Browse Page!</span></main>`
        );

        this.rootNode.append(footer.getTemplate());
    }
}

export default BrowsePageView;
