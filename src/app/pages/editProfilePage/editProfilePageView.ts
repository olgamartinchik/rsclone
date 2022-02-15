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
import { TSettings, TUser } from '../../services/types';
import { Height, Weight, ClassNames, Coefficients } from '../../services/constants';

class EditProfilePageView {
    private rootNode: HTMLElement;

    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
    }

    async render(settings: TSettings, userData: TUser, onchange: (e: Event) => void, onclick: (e: Event) => void, onchangeValue: (e: Event) => void, onchangeBirthday: (e: Event) => void, onchangeGender: (e: Event) => void, onclickSaveBtn: (e: Event) => void, onclickDeleteBtn: (e: Event) => void) {
        this.rootNode.textContent = '';

        const src = avatarManager.formAvatarSrc(settings.userId);
        this.createHeader(userData);
        this.createContentHeader(src);
        this.createContentForm(settings, userData, onchangeValue, onchangeBirthday, onchangeGender,onclickSaveBtn, onclickDeleteBtn);
        this.createFooter();

        this.activateValidation();
        this.addEvents(onchange, onclick);
        this.initMaterialize();
    }

    private createHeader(userData: TUser): void {
        this.rootNode.append(header.getTemplate());
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu(true);
        navbar.addProfileLink(userData.name.split('')[0], false);
    }

    private createContentHeader(src: string): void {
        this.rootNode.append(profile.getEditProfileTemplate(src));
    }

    private createContentForm(settings: TSettings, userData: TUser, onchangeValue: (e: Event) => void, onchangeBirthday: (e: Event) => void, onchangeGender: (e: Event) => void, onclickSaveBtn: (e: Event) => void, onclickDeleteBtn: (e: Event) => void): void {
        const main = <HTMLElement>this.rootNode.querySelector('.main-layout');
        const profileInfoWrapper = new Node(main, 'div', 'settings-wrapper editprofile');
        profileInfoWrapper.append(profileItem.getTemplate('text','Name', userData.name, onchangeValue));
        profileInfoWrapper.append(profileItem.getTemplate('email','Email', userData.email, onchangeValue));
        profileInfoWrapper.append(calender.getEditTemplate(settings.birthday, onchangeBirthday));
        profileInfoWrapper.append(
            parameters.getShortTemplate(
                ClassNames.editProfile,
                Height.title,
                onchangeValue,
            )
        );
        this.getParameters('height', settings);

        profileInfoWrapper.append(
            parameters.getShortTemplate(
                ClassNames.editProfile,
                Weight.title,
                onchangeValue,
            )
        );
        this.getParameters('weight', settings);
        this.getUnits(settings);

        profileInfoWrapper.append(profileItem.getGenderTemplate('Gender', onchangeGender));
        this.colorSelectedGender(settings);
        profileInfoWrapper.append(profileItem.getConfirmPasswordTemplate('Password'));

        const buttonWrapper = Node.setChild(profileInfoWrapper.node, 'div', 'btn-wrapper edit-profile');
        const saveButton = new Button(buttonWrapper, 'Save');
        saveButton.addClass('btn-save');
        saveButton.onclick(onclickSaveBtn);
        saveButton.setDisabled();

        const deleteButton = new Button(buttonWrapper, 'Delete');
        deleteButton.addAttribute('data-target', 'modal10')
        deleteButton.addClass('modal-trigger');
        deleteButton.onclick(onclickDeleteBtn);

        buttonWrapper.insertAdjacentHTML('beforeend', this.addModal());
    }

    private colorSelectedGender(settings: TSettings): void {
        const genderOptions = <NodeListOf<HTMLElement>>this.rootNode.querySelectorAll('.gender-item');
        genderOptions.forEach((gender) => {
            if (gender.dataset.value === settings.gender) {
                gender.classList.add('active');
            }
        })
    }

    private getParameters(type: string, settings: TSettings): void {
        const input = <HTMLInputElement>document.querySelectorAll(`[data-${type}]`)[1];
        switch(type) {
            case 'height':
                if(settings.heightUnit === Height.units) {
                    input.placeholder = settings[type].toString();
                } else {
                    input.placeholder = Math.round(settings.height / Coefficients.toCentimeters).toString();
                }
                break;
            case 'weight':
                if(settings.weightUnit === Weight.units) {
                    input.placeholder = settings[type].toString();
                } else {
                    input.placeholder = Math.round(settings.weight * Coefficients.toPounds).toString();
                }
                break;
        }
    }

    private getUnits(settings: TSettings): void {
        const units = <NodeListOf<HTMLInputElement>>this.rootNode.querySelectorAll('.value > span');
        units.forEach((unit) => {
            const key = <string>unit.dataset.title;
            unit.textContent = settings[key];
        });
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

    private activateValidation(): void {
        const nameInput = <HTMLInputElement>this.rootNode.querySelector(`#name`);
        const emailInput = <HTMLInputElement>this.rootNode.querySelector('#email');
        if (nameInput) nameInput.setAttribute('pattern', '^[a-zA-Zа-яА-Я].*');
        if (emailInput) emailInput.setAttribute('pattern', '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}');
    }

    private createFooter(): void {     
        this.rootNode.append(footer.getTemplate());
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
