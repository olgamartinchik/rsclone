import { TLoginForm } from '../../services/types';
import authManager from '../../services/authManager';
import ClientManager from '../../services/clientManager';
import StorageManager from '../../services/storageManager';
import storageManager from '../../services/storageManager';

export default class AuthModel {
    private form: TLoginForm;

    public isLoading: boolean;

    private clientManager: ClientManager;

    constructor() {
        this.clientManager = new ClientManager();
        this.isLoading = true;
        this.form = {
            userName: '',
            email: '',
            password: '',
        };
    }

    public changeHandler(...args: Array<Partial<TLoginForm>>) {
        const authData = Array.from(args)[0];
        if (authData.userName || authData.userName === '') this.form.userName = authData.userName;
        if (authData.email || authData.email === '') this.form.email = authData.email;
        if (authData.password || authData.password === '') this.form.password = authData.password;
    }

    public checkUserData(isExistingUser: boolean): void {
        const type = isExistingUser ? 'auth/login' : 'auth/register';
        switch (type) {
            case 'auth/login':
                if (this.form.email && this.form.password) {
                    this.activateSendBtn();
                } else if (!this.form.email || !this.form.password) {
                    this.deactivateSendBtn();
                }
                break;
            case 'auth/register':
                if (this.form.userName && this.form.email && this.form.password) {
                    this.activateSendBtn();
                } else {
                    this.deactivateSendBtn();
                }
                break;
        }
    }

    private activateSendBtn(): void {
        const button = <HTMLElement>document.querySelector('.btn-send');
        button.classList.remove('btn-disabled');
        button.removeAttribute('disabled');
    }

    private deactivateSendBtn(): void {
        const button = <HTMLElement>document.querySelector('.btn-send');
        button.classList.add('btn-disabled');
        button.setAttribute('disabled', 'disabled');
    }

    public async authHandler(type: string): Promise<void> {
        this.isLoading = true;
        await this.clientManager.postData(`${type}`, this.form);
        this.isLoading = false;

        if (this.clientManager.result) {
            this.saveData(type);
            this.navigate(type);
        } else {
            this.createMessage(this.clientManager.text);
            this.destroyData();
        }
    }

    private saveData(type: string): void {
        StorageManager.addItem('token', this.clientManager.token, 'local');
        if (type === 'auth/login') this.saveUserSettings();
    }

    private destroyData(): void {
        this.form.userName = '';
        this.form.email = '';
        this.form.password = '';
        StorageManager.deleteItem('token', 'local');
    }

    private async saveUserSettings(): Promise<void> {
        const userSettings = await this.clientManager.getUserSettings(this.clientManager.token.userID);
        storageManager.addItem('userSettings', userSettings, 'local');
    }

    public createMessage(text: string) {
        if (text) {
            window.M.toast({ html: `${text}` });
        }
    }

    private navigate(type: string) {
        switch (type) {
            case 'auth/register':
                authManager.navigate('/onboarding');
                break;
            case 'auth/login':
                authManager.navigate('/program');
                break;
        }
    }

    public get loadingStatus(): boolean {
        return this.isLoading;
    }
}
