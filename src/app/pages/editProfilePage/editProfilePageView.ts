import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import profile from '../../components/profile/profile';
import profileItem from '../../components/profileItem/item';
import calender from '../../components/calender/calender';
import parameters from '../../components/parameters/parameters';
import Node from '../../components/Node';
import Button from '../../components/Button';
import storageManager from '../../services/storageManager';
import avatarManager from '../../services/avatarManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import { Height, Weight, ClassNames } from '../../services/constants';

class EditProfilePageView {
    private rootNode: HTMLElement;
    
    private userName: string;

    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.userName = '';
    }

    render(onchange: (e: Event) => void, onclick: (e: Event) => void, onclickCalender: (e: Event) => void) {
        this.rootNode.textContent = '';
        this.getData();
        const src = avatarManager.formAvatarSrc();

        this.createHeader();
        this.createContentHeader(src);
        this.createContentForm(onclickCalender);
        this.createFooter();

        this.addEvents(onchange, onclick);
        this.initMaterialize();
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

    private createContentForm(onclickCalender: (e: Event) => void): void {
        const main = <HTMLElement>this.rootNode.querySelector('.main-layout');
        const profileInfoWrapper = new Node(main, 'div', 'settings-wrapper');
        profileInfoWrapper.append(profileItem.getTemplate('Name', 'Olga'));
        profileInfoWrapper.append(profileItem.getTemplate('Email', 'olga@mail.ru'));
        profileInfoWrapper.append(calender.getEditTemplate('Jan 01, 1990', onclickCalender));
        profileInfoWrapper.append(
            parameters.getTemplate(
                ClassNames.editProfile,
                Height.title,
                Height.units,
                Height.units2,
                Height.option1,
                Height.option2,
                Height.min,
                Height.max,
                onclickCalender,
                onclickCalender,
                onclickCalender
            )
        );

        profileInfoWrapper.append(
            parameters.getTemplate(
                ClassNames.editProfile,
                Weight.title,
                Weight.units,
                Weight.units2,
                Weight.option1,
                Weight.option2,
                Weight.min,
                Weight.max,
                onclickCalender,
                onclickCalender,
                onclickCalender
            )
        );

        profileInfoWrapper.append(profileItem.getGenderTemplate('Gender'));
        profileInfoWrapper.append(profileItem.getConfirmPasswordTemplate('Password'));

        const buttonWrapper = Node.setChild(profileInfoWrapper.node, 'div', 'btn-wrapper edit-profile');
        const saveButton = new Button(buttonWrapper, 'Save');
        saveButton.onclick(onclickCalender);
        saveButton.setDisabled();

        const deleteButton = new Button(buttonWrapper, 'Delete');
        deleteButton.addAttribute('data-target', 'modal10')
        deleteButton.addClass('modal-trigger');
        deleteButton.onclick(onclickCalender);

        buttonWrapper.insertAdjacentHTML('beforeend', this.addModal());
    }

    private addModal(): string {
        return `
        <div id="modal10" class="modal">
        <div class="modal-content">
          <p>Are you sure you want to delete your profile?</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-red btn-flat">Confirm</a>
        </div>
      </div>
        `
    }

    private createFooter(): void {     
        this.rootNode.append(footer.getTemplate());
    }

    private getData(): void {
        this.userName = <string>storageManager.getItem('user', 'local');
    }

    private addEvents(onchange: (e: Event) => void, onclick: (e: Event) => void): void {
        const fileInput = <HTMLInputElement>this.rootNode.querySelector('#avatar');
        if (fileInput) fileInput.onchange = (e: Event) => onchange(e);

        const agreeToDeleteBtn = <HTMLElement>document.querySelector('.modal-close');
        if (agreeToDeleteBtn) {
            agreeToDeleteBtn.onclick = (e: Event) => onclick(e);
        }
    }

    private initMaterialize(): void {
        this.materializeHandler.initModal();
        this.materializeHandler.initDatePicker();
    }
}

export default EditProfilePageView;
