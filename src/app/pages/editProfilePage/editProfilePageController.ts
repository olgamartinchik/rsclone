import EditProfilePageView from './editProfilePageView';
import EditProfilePageModel from './editProfilePageModel';
import avatarManager from '../../services/avatarManager';
import authManager from '../../services/authManager';
import UserDataManager from '../../services/userDataManager';
import Utils from '../../services/utils';
import { TSettings, TUser } from '../../services/types';
import { Height, Weight, Coefficients, Message } from '../../services/constants';

class EditProfilePageController {
    private view: EditProfilePageView;
    private files: Array<File>;
    private model: EditProfilePageModel;
    private settings: void | TSettings;
    private modifiedUserSettings: void | TSettings;
    private user: void | TUser;
    private modifiedUser: void | TUser;

    constructor() {
        this.view = new EditProfilePageView();
        this.model = new EditProfilePageModel();
        this.files = [];
        this.settings = this.model.getSettingsData();
        this.modifiedUserSettings = this.getModifiedUserSettings();
        this.user = this.model.getUserData();
        this.modifiedUser = this.getModifiedUser();
    }

    public createPage() {
        this.settings = <TSettings>this.model.getSettingsData();
        this.user = <TUser>this.model.getUserData();
        this.modifiedUserSettings = this.getModifiedUserSettings();
        this.modifiedUser = this.getModifiedUser();
        this.view.render(this.settings, this.user, this.handleAvatarChange.bind(this), this.handleAvatarDelete.bind(this), this.handleInputValueChange.bind(this), this.handleBirthdayChange.bind(this), this.handleGenderSelect.bind(this), this.handleSaveBtnClick.bind(this), this.handleDeleteBtnClick.bind(this));
    }

    private getModifiedUserSettings(): TSettings | void {
        return Object.assign({}, this.settings);
    }

    private getModifiedUser(): TUser | void {
        return Object.assign({}, this.user);
    }

    private handleAvatarChange(e: Event): void {
        const clickedElement = <HTMLInputElement>e.target; 

        if (!(<FileList>clickedElement.files).length) {
            return;
        }

        this.files = avatarManager.getAvatarFile(clickedElement);
        avatarManager.toggleEditIcon();
    }

    private handleAvatarDelete(): void { 
        this.deleteAvatar();
    }

    private async deleteAvatar(): Promise<void> {
        await avatarManager.deleteAvatar(this.files[0]);

        const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
        const src = avatarManager.chooseDefaultAvatar();
        avatarImg.src = src;
        avatarManager.toggleEditIcon();
    }

    private handleInputValueChange(e: Event): void {
        const settingValue = <HTMLInputElement>e.target;
        const settingsType = <string>settingValue.dataset.value;
        const settingsValueChosen = <string>settingValue.value;
        this.handleValidation(settingsType, settingValue);
        this.updateUserSettings(settingValue, settingsType, settingsValueChosen);
    }

    private updateUserSettings(element: HTMLInputElement, key: string, value: string): void {
        if (key === 'height' || key === 'weight') {
            switch(key) {
                case 'height':
                    if(this.settings['heightUnit'] === Height.units) {
                        this.modifiedUserSettings[key] = value;
                    } else {
                        this.modifiedUserSettings[key] = Math.round(parseInt(value) * Coefficients.toCentimeters).toString();
                    }
                    break;
                case 'weight':
                    if(this.settings['weightUnit'] === Weight.units) {
                        this.modifiedUserSettings[key] = value;
                    } else {
                        this.modifiedUserSettings[key] = Math.round(parseInt(value) / Coefficients.toPounds).toString();
                    }
                    break;
            }
        } else if (key === 'name' || key === 'email') {
            if (element.validity.valid) {
                this.modifiedUser[key] = value;
            } else {
                this.modifiedUser[key] = this.user[key];
                element.value = '';
                element.placeholder = this.user[key];
            }
        }
        this.handleSaveButtonStatus();
    }

    private handleValidation(type: string, element: HTMLInputElement): void {
        if (!element.validity.valid) {
            switch (type) {
                case 'name':
                    this.model.createMessage(Message.invalidName);
                    break;
                case 'email':
                    this.model.createMessage(Message.invalidValue);
                    break;
            }
        }
    }

    private handleBirthdayChange(e: Event): void {
        const currentTarget = <HTMLElement>e.currentTarget;
        const calenderInput = <HTMLInputElement>currentTarget.querySelector('.datepicker');
        const age = this.model.calculateAge(calenderInput.value);
        this.modifiedUserSettings['age'] = age;
        this.modifiedUserSettings['birthday'] = calenderInput.value;
        this.handleSaveButtonStatus();
    }

    private handleGenderSelect(e: Event): void {
        this.selectValue(e);
        const settingItem = <HTMLElement>e.target;
        const settingTitle = <string>settingItem.dataset.title;
        const settingValue = <string>settingItem.dataset.value;
        this.modifiedUserSettings[settingTitle] = settingValue;
        this.handleSaveButtonStatus();
    }

    private selectValue(e: Event): void {
        Array.from(<HTMLCollection>(<HTMLElement>(<HTMLElement>e.target).parentElement).children).forEach((element) => {
            element.classList.remove('active');
        });
        (<HTMLElement>e.target).classList.add('active');
    }

    private handleSaveButtonStatus(): void {
        const saveButton = <HTMLButtonElement>document.querySelector('.btn-save');
        const haveSettingsChanged = !Utils.compareObjects(this.settings, this.modifiedUserSettings);
        const hasUserInfoChanged = !Utils.compareObjects(this.user, this.modifiedUser);
        if (haveSettingsChanged || hasUserInfoChanged) {
            saveButton.classList.remove('btn-disabled');
            saveButton.removeAttribute('disabled');
        } else {
            saveButton.className = 'waves-effect waves-light btn-save btn-large btn-disabled';
            if (!saveButton.disabled) saveButton.setAttribute('disabled', 'disabled');
        }
    }

    private async handleSaveBtnClick(e: Event): Promise<void> {
        const haveSettingsChanged = !Utils.compareObjects(this.settings, this.modifiedUserSettings);
        const hasUserInfoChanged = !Utils.compareObjects(this.user, this.modifiedUser);
        this.initPreloader(<HTMLElement>e.target);
        if (haveSettingsChanged) {
            await this.model.updateSettings(this.modifiedUserSettings);
            new UserDataManager(this.modifiedUserSettings!).createUserData();
        }
        if (hasUserInfoChanged) {
            await this.model.updateAuthForm(<TUser>this.modifiedUser);
        }
        this.destroyPreloader(<HTMLElement>e.target);
    }

    private async handleDeleteBtnClick(e: Event): Promise<void> {
        e.preventDefault();
        this.initPreloader(<HTMLElement>e.target);
        await this.model.deleteUser();
        this.destroyPreloader(<HTMLElement>e.target);
        authManager.navigate('/');
    }

    private initPreloader(button: HTMLElement): void {
        const isLoading = this.model.loadingStatus;
        this.view.handlePreloader(isLoading);
        button.setAttribute('disabled', 'true');
    }

    private destroyPreloader(button: HTMLElement): void {
        const isLoading = this.model.loadingStatus;
        this.view.handlePreloader(isLoading);
        button.removeAttribute('disabled');
    }
}

export default EditProfilePageController;
