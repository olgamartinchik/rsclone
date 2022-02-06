import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import settings from '../../components/settings/settings';
import Node from '../../components/Node';
import Button from '../../components/Button';

class SettingsPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(onclick: (e: Event) => void, onclickButton: (e: Event) => void): void {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('Settings');
        navbar.addProfileLink('O');

        this.createMainLayout(onclick, onclickButton);

        this.rootNode.append(footer.getTemplate());
    }

    private createMainLayout(onclick: (e: Event) => void, onclickButton: (e: Event) => void): void {
        const main = new Node(this.rootNode, 'main', 'main-layout');
        const settingsWrapper = Node.setChild(main.node, 'div', 'settings-wrapper');
        Node.setChild(settingsWrapper, 'h2', 'title settings-title', 'Settings');

        this.createSettingsBlock(settingsWrapper, 'Account', ['Edit Profile', 'Edit Plan'], false, onclick);
        this.createSettingsBlock(settingsWrapper, 'Unit', ['Weight', 'Height'], true, onclick);

        const buttonWrapper = Node.setChild(settingsWrapper, 'div', 'btn-wrapper settings');
        const logoutButton = new Button(buttonWrapper, 'Log out');
        logoutButton.onclick(onclickButton);
    }

    private createSettingsBlock(
        parentNode: HTMLElement,
        title: string,
        subtitles: Array<string>,
        hasChips: boolean,
        onclick: (e: Event) => void
    ): void {
        const settingsBlockWrapper = Node.setChild(parentNode, 'div', 'settings-block');
        Node.setChild(settingsBlockWrapper, 'h3', 'title settings-subtitle', `${title}`);

        settingsBlockWrapper.append(settings.getTemplate(subtitles, hasChips, onclick));
    }
}

export default SettingsPageView;
