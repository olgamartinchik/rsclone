import authModel from '../authPage/authPageModel';
import onboardingModel from '../onboardingPage/onboardingPageModel';
import storageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';
import Utils from '../../services/utils';
import { TChangeUserDataForm, TSettings, TUser } from '../../services/types';
import { Endpoints } from '../../services/constants';

class EditProfilePageModel {
    private clientManager: ClientManager;

    private editProfileForm: TChangeUserDataForm;

    private isLoading: boolean;

    constructor() {
        this.clientManager = new ClientManager();
        this.editProfileForm = {
            userName: '',
            email: '',
            password: '',
            newPassword: '',
        };
        this.isLoading = true;
    }

    public getSettingsData(): TSettings | void {
        return storageManager.getItem('userSettings', 'local');
    }

    public getUserData(): TUser | void {
        return storageManager.getItem('user', 'local');
    }

    public async updateUserDataForm(changeUserDataForm: TChangeUserDataForm, modifiedUserData: TUser): Promise<void> {
        this.editProfileForm = changeUserDataForm;
        this.editProfileForm.userName = modifiedUserData.name;
        this.editProfileForm.email = modifiedUserData.email;
        await this.updateUserData(modifiedUserData);
    }

    public async updateSettings(modifiedSettings: TSettings | void) {
        this.isLoading = true;
        storageManager.addItem('userSettings', modifiedSettings, 'local');
        await this.clientManager.changeData(
            Endpoints.userSettings,
            'PATCH',
            (<TSettings>modifiedSettings).userId,
            <TSettings>modifiedSettings
        );
        this.isLoading = false;
        this.disableSaveButton();
        this.updateWorkoutProgram();
    }

    public async updateUserData(modifiedUserData: TUser) {
        const userId = (<TSettings>this.getSettingsData()).userId;
        this.isLoading = true;
        await this.clientManager.changeData(
            Endpoints.changeUserData,
            'POST',
            userId,
            <TChangeUserDataForm>this.editProfileForm
        );
        this.isLoading = false;
        if (this.clientManager.result) {
            this.disableSaveButton();
            this.saveUpdatedUserData(modifiedUserData);
        } else {
            this.createMessage(this.clientManager.message);
            this.disableSaveButton();
            this.resetInputFields();
        }
        this.resetPasswordFields();
    }

    private saveUpdatedUserData(modifiedUserData: TUser): void {
        storageManager.addItem('user', modifiedUserData, 'local');
        storageManager.addItem('token', this.clientManager.token, 'local');
    }

    private updateWorkoutProgram(): void {
        storageManager.deleteItem('workout-cards', 'local');
        storageManager.deleteItem('workout-program', 'local');
    }

    private disableSaveButton(): void {
        const saveButton = <HTMLButtonElement>document.querySelector('.btn-save');
        saveButton.className = 'waves-effect waves-light btn-save btn-large btn-disabled';
        if (!saveButton.disabled) saveButton.setAttribute('disabled', 'disabled');
    }

    private resetInputFields(): void {
        const nameInputField = <HTMLInputElement>document.querySelector('#name');
        const emailInputField = <HTMLInputElement>document.querySelector('#email');
        nameInputField.value = '';
        emailInputField.value = '';
    }

    private resetPasswordFields(): void {
        const currentPasswordInput = <HTMLInputElement>document.querySelector('#password');
        const passwordInput = <HTMLInputElement>document.querySelector('#newPassword');
        const confirmPasswordInput = <HTMLInputElement>document.querySelector('#confirm');
        currentPasswordInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
    }

    public checkPassword(): boolean {
        const passwordInput = <HTMLInputElement>document.querySelector('#newPassword');
        const confirmPasswordInput = <HTMLInputElement>document.querySelector('#confirm');
        return passwordInput.value === confirmPasswordInput.value;
    }

    public async deleteUser(): Promise<void> {
        this.isLoading = true;
        const userId = (<TSettings>this.getSettingsData()).userId;
        localStorage.clear();
        authModel.destroyData();
        onboardingModel.resetData();
        await this.clientManager.deleteUserData(Endpoints.auth, userId);
        await this.clientManager.deleteUserData(Endpoints.userSettings, userId);
        await this.clientManager.deleteUserData(Endpoints.workoutSettings, userId);
        this.isLoading = false;
    }

    public calculateAge(dateOfBirth: string): number {
        console.log(dateOfBirth);
        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        const dayofBirth = +dateOfBirth.split(' ')[1].split('').splice(0, 2).join('');
        const month = dateOfBirth.split(' ')[0];
        const monthOfBirth = Utils.getMonth(month);
        const yearOfBirth = +dateOfBirth.split(' ')[2];

        let age = currentYear - yearOfBirth;
        if (monthOfBirth > currentMonth) {
            age -= 1;
            return age;
        } else if (dayofBirth > currentDay) {
            age -= 1;
        }

        return age;
    }

    public createMessage(text: string) {
        if (text) {
            window.M.toast({ html: `${text}` });
        }
    }

    public get loadingStatus(): boolean {
        return this.isLoading;
    }
}

export default EditProfilePageModel;
