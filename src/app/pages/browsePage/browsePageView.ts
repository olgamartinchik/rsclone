import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import storageManager from '../../services/storageManager';

class BrowsePageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render() {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());
        const user = (<string>storageManager.getItem('user', 'local')).split('')[0];
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('Browse');
        navbar.addProfileLink(user);
        this.rootNode.insertAdjacentHTML(
            'beforeend',
            `<main class="main-page"><span>This is Browse Page!</span></main>`
        );

        this.rootNode.append(footer.getTemplate());
    }
}

export default BrowsePageView;
