import authModel from '../authPage/authPageModel';
import onboardingModel from '../onboardingPage/onboardingPageModel';
import storageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';
import Utils from '../../services/utils';
import { TLoginForm, TSettings, TUser } from '../../services/types';
import { Endpoints } from '../../services/constants';

class EditProfilePageModel {
    private clientManager: ClientManager;
    private authForm: TLoginForm;
    private isLoading: boolean;

    constructor() {
        this.clientManager = new ClientManager();
        this.authForm = {
            userName: '',
            email: '',
        }
        this.isLoading = true;
    }
    
    public getSettingsData(): TSettings | void {
        return storageManager.getItem('userSettings', 'local');
    }

    public getUserData(): TUser | void {
        return storageManager.getItem('user', 'local');
    }

    public async updateAuthForm(modifiedUserData: TUser): Promise<void> {
        this.authForm.userName = modifiedUserData.name;
        this.authForm.email = modifiedUserData.email;
        await this.updateUserData(modifiedUserData);
    }

    public async updateSettings(modifiedSettings: TSettings | void) {
        this.isLoading = true;
        storageManager.addItem('userSettings', modifiedSettings, 'local');
        await this.clientManager.changeData(
            Endpoints.userSettings,
            (<TSettings>modifiedSettings).userId,
            <TSettings>modifiedSettings
        );
        this.isLoading = false;
        this.updateWorkoutProgram();
    }

    public async updateUserData(modifiedUserData: TUser) {
        const userId = (<TSettings>this.getSettingsData()).userId;
        this.isLoading = true;
        await this.clientManager.changeData(
            Endpoints.auth,
            userId,
            <TLoginForm>this.authForm
        );
        this.isLoading = false;
        if (this.clientManager.result) {
            storageManager.addItem('user', modifiedUserData, 'local');
        }
    }

    private updateWorkoutProgram(): void {
        storageManager.deleteItem('workout-cards', 'local');
        storageManager.deleteItem('workout-program', 'local');
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
