import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import profile from '../../components/profile/profile';
import storageManager from '../../services/storageManager';
import avatarManager from '../../services/avatarManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';

class EditProfilePageView {
    private rootNode: HTMLElement;
    
    private userName: string;

    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.userName = '';
    }

    render(onchange: (e: Event) => void) {
        this.rootNode.textContent = '';
        this.getData();
        const src = avatarManager.formAvatarSrc();

        this.createHeader();
        this.createContentHeader(src);
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
        navbar.generateMenu(true);
        navbar.addProfileLink(this.userName.split('')[0], false);
    }

    private createContentHeader(src: string): void {
        this.rootNode.append(profile.getEditProfileTemplate(src));
    }

    private createFooter(): void {     
        this.rootNode.append(footer.getTemplate());
    }

    private getData(): void {
        this.userName = <string>storageManager.getItem('user', 'local');
    }

    private addEvents(onchange: (e: Event) => void): void {
        const fileInput = <HTMLInputElement>this.rootNode.querySelector('#avatar');
        if (fileInput) fileInput.onchange = (e: Event) => onchange(e);
    }
}

export default EditProfilePageView;
