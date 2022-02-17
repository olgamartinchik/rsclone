import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import storageManager from '../../services/storageManager';

class BrowsePageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    public render(isLogin: boolean, signUpHandler: () => void) {
        if (isLogin) {
            this.createAuthorizedHeader()
        } else {
            this.createNotAuthorizedHeader(signUpHandler);
        }
        this.createContent();
        this.rootNode.append(footer.getTemplate());
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

    private createContent(): void {
        this.rootNode.insertAdjacentHTML(
            'beforeend',
            `<main class="main-layout"><span>This is Browse Page!</span></main>`
        );
    }
}

export default BrowsePageView;
