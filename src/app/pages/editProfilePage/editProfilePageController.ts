import EditProfilePageView from './editProfilePageView';
import EditProfilePageModel from './editProfilePageModel';
import avatarManager from '../../services/avatarManager';
import authManager from '../../services/authManager';
import UserDataManager from '../../services/userDataManager';
import Utils from '../../services/utils';
import { TSettings, TUser, TChangeUserDataForm } from '../../services/types';
import { Height, Weight, Coefficients, Message } from '../../services/constants';

class EditProfilePageController {
    private view: EditProfilePageView;

    private files: Array<File>;

    private model: EditProfilePageModel;

    private settings: void | TSettings;

    private modifiedUserSettings: void | TSettings;

    private user: void | TUser;

    private modifiedUser: void | TUser;

    private changeUserDataForm: TChangeUserDataForm;

    constructor() {
        this.view = new EditProfilePageView();
        this.model = new EditProfilePageModel();
        this.files = [];
        this.settings = this.model.getSettingsData();
        this.modifiedUserSettings = this.getModifiedUserSettings();
        this.user = this.model.getUserData();
        this.modifiedUser = this.getModifiedUser();
        this.changeUserDataForm = {
            userName: '',
            email: '',
            password: '',
            newPassword: '',
        };
    }

    public createPage() {
        this.settings = <TSettings>this.model.getSettingsData();
        this.user = <TUser>this.model.getUserData();
        this.modifiedUserSettings = this.getModifiedUserSettings();
        this.modifiedUser = this.getModifiedUser();
        this.view.render(
            this.settings,
            this.user,
            this.handleAvatarChange.bind(this),
            this.handleAvatarDelete.bind(this),
            this.handleInputValueChange.bind(this),
            this.handleBirthdayChange.bind(this),
            this.handleGenderSelect.bind(this),
            this.handleSaveBtnClick.bind(this),
            this.handleDeleteBtnClick.bind(this),
            this.handleIconClick.bind(this),
            this.handlePasswordInput.bind(this),
            this.handleConfirmButtonClick.bind(this)
        );
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
    }

    private handleAvatarDelete(): void {
        this.deleteAvatar();
    }

    private deleteAvatar(): void {
        avatarManager.deleteAvatar();

        const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
        const src = avatarManager.chooseDefaultAvatar();
        avatarImg.src = src;
    }

    private handleInputValueChange(e: Event): void {
        const settingValue = <HTMLInputElement>e.target;
        const settingsType = <string>settingValue.dataset.value;
        const settingsValueChosen = <string>settingValue.value;
        this.handleValidation(settingsType, settingValue);
        this.updateUserSettings(settingValue, settingsType, settingsValueChosen);
        this.handlePasswordDifference();
    }

    private updateUserSettings(element: HTMLInputElement, key: string, value: string): void {
        if (key === 'height' || key === 'weight') {
            switch (key) {
                case 'height':
                    if ((<TSettings>this.settings).heightUnit === Height.units) {
                        this.modifiedUserSettings[key] = value;
                    } else {
                        this.modifiedUserSettings[key] = Math.round(
                            parseInt(value) * Coefficients.toCentimeters
                        ).toString();
                    }
                    break;
                case 'weight':
                    if ((<TSettings>this.settings).weightUnit === Weight.units) {
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
        (<TSettings>this.modifiedUserSettings).age = age;
        (<TSettings>this.modifiedUserSettings).birthday = calenderInput.value;
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

    private handlePasswordInput(): void {
        const isPasswordEqual = this.handlePasswordDifference();
        if (isPasswordEqual) this.model.createMessage(Message.passwordEqual);
        this.handlePasswordConfirmation();
        this.handleConfirmButtonStatus();
    }

    private handlePasswordDifference(): boolean {
        const currentPasswordInput = <HTMLInputElement>document.querySelector('#password');
        const passwordInput = <HTMLInputElement>document.querySelector('#newPassword');
        const confirmPasswordInput = <HTMLInputElement>document.querySelector('#confirm');
        let isPasswordsEqual = false;
        if (passwordInput && currentPasswordInput) {
            isPasswordsEqual = currentPasswordInput.value === passwordInput.value;
            if (currentPasswordInput.value && passwordInput.value && isPasswordsEqual) {
                passwordInput.className = 'invalid';
                confirmPasswordInput.setAttribute('disabled', 'disabled');
            } else {
                passwordInput.className = 'validate';
                confirmPasswordInput.removeAttribute('disabled');
            }
        }
        return isPasswordsEqual;
    }

    private handlePasswordConfirmation(): boolean {
        const passwordInput = <HTMLInputElement>document.querySelector('#newPassword');
        const confirmPasswordInput = <HTMLInputElement>document.querySelector('#confirm');
        let isPasswordConfirmed = false;
        if (confirmPasswordInput && passwordInput.value && confirmPasswordInput.value) {
            isPasswordConfirmed = this.model.checkPassword();
            if (!isPasswordConfirmed) {
                confirmPasswordInput.className = 'invalid';
            } else {
                confirmPasswordInput.className = 'valid';
            }
        }
        return isPasswordConfirmed;
    }

    private handleConfirmButtonStatus(): void {
        const confirmButton = <HTMLButtonElement>document.querySelector('#confirmPasswordChange');
        const currentPasswordInput = <HTMLInputElement>document.querySelector('#password');
        const passwordInput = <HTMLInputElement>document.querySelector('#newPassword');
        const confirmPasswordInput = <HTMLInputElement>document.querySelector('#confirm');
        const isPasswordConfirmed = this.handlePasswordConfirmation();
        const isPasswordEqual = this.handlePasswordDifference();

        if (
            currentPasswordInput.value &&
            passwordInput.value &&
            confirmPasswordInput.value &&
            isPasswordConfirmed &&
            !isPasswordEqual
        ) {
            confirmButton.removeAttribute('disabled');
            confirmButton.classList.remove('btn-disabled');
        } else {
            confirmButton.setAttribute('disabled', 'disabled');
            confirmButton.classList.add('btn-disabled');
            this.changeUserDataForm.password = '';
            this.changeUserDataForm.newPassword = '';
        }
    }

    private handleSaveButtonStatus(): void {
        const saveButton = <HTMLButtonElement>document.querySelector('.btn-save');
        const haveSettingsChanged = !Utils.compareObjects(this.settings, this.modifiedUserSettings);
        const hasUserInfoChanged = !Utils.compareObjects(this.user, this.modifiedUser);
        if (haveSettingsChanged || hasUserInfoChanged || this.changeUserDataForm.password !== '') {
            saveButton.classList.remove('btn-disabled');
            saveButton.removeAttribute('disabled');
        } else {
            saveButton.className = 'waves-effect waves-light btn-save btn-large btn-disabled';
            if (!saveButton.disabled) saveButton.setAttribute('disabled', 'disabled');
        }
    }

    private handleIconClick(e: Event): void {
        const clickedIcon = <HTMLElement>e.target;
        const input = <HTMLInputElement>clickedIcon.nextElementSibling;
        const inputType = input.type;

        input.type = inputType === 'password' ? 'text' : 'password';
        clickedIcon.classList.toggle('eye');
        clickedIcon.classList.toggle('eye-closed');
    }

    private handleConfirmButtonClick(): void {
        const currentPasswordInput = <HTMLInputElement>document.querySelector('#password');
        const passwordInput = <HTMLInputElement>document.querySelector('#newPassword');
        this.changeUserDataForm.password = currentPasswordInput.value;
        this.changeUserDataForm.newPassword = passwordInput.value;
        this.handleSaveButtonStatus();
    }

    private async handleSaveBtnClick(e: Event): Promise<void> {
        const haveSettingsChanged = !Utils.compareObjects(this.settings, this.modifiedUserSettings);
        const hasUserInfoChanged = !Utils.compareObjects(this.user, this.modifiedUser);
        this.initPreloader(<HTMLElement>e.target);
        if (haveSettingsChanged) {
            await this.model.updateSettings(this.modifiedUserSettings);
            new UserDataManager(this.modifiedUserSettings!).createUserData();
        }
        if (hasUserInfoChanged || this.changeUserDataForm.password !== '') {
            await this.model.updateUserDataForm(<TChangeUserDataForm>this.changeUserDataForm, <TUser>this.modifiedUser);
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
