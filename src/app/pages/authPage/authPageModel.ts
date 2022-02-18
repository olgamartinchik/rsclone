import { TLoginForm, TLoginResponse, TSettings, TUser } from '../../services/types';
import authManager from '../../services/authManager';
import ClientManager from '../../services/clientManager';
import StorageManager from '../../services/storageManager';
import UserDataManager from '../../services/userDataManager';

export class AuthModel {
    private form: TLoginForm;

    public isLoading: boolean;

    private clientManager: ClientManager;

    private user: TUser;

    constructor() {
        this.clientManager = new ClientManager();
        this.isLoading = true;
        this.form = {
            userName: '',
            email: '',
            password: '',
        };
        this.user = {
            name: '',
            email: '',
            avatar: '',
        };
    }

    public changeHandler(...args: Array<Partial<TLoginForm>>) {
        const authData = Array.from(args)[0];
        if (authData.userName || authData.userName === '') this.form.userName = authData.userName;
        if (authData.email || authData.email === '') this.form.email = authData.email;
        if (authData.password || authData.password === '') this.form.password = authData.password;
    }

    public checkUserData(isLogin: boolean): void {
        const type = isLogin ? 'auth/login' : 'auth/register';

        switch (type) {
            case 'auth/login':
                if (this.form.email && this.form.password) {
                    this.activateSendBtn();
                } else if (!this.form.email || !this.form.password) {
                    this.deactivateSendBtn();
                }
                break;
            case 'auth/register':
                if (this.form.userName && this.form.email && this.form.password && this.checkPassword()) {
                    this.activateSendBtn();
                } else {
                    this.deactivateSendBtn();
                }
                break;
        }
    }

    public checkPassword(): boolean {
        const passwordInput = <HTMLInputElement>document.querySelector('#password');
        const confirmPasswordInput = <HTMLInputElement>document.querySelector('#confirm');
        return passwordInput.value === confirmPasswordInput.value;
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
        const data = await this.clientManager.postData(`${type}`, this.form);
        this.isLoading = false;

        if (this.clientManager.result) {
            this.user.name = (<TLoginResponse>data).userName;
            this.user.email = (<TLoginResponse>data).email;
            if ((<TLoginResponse>data).avatar) {
                this.user.avatar = (<TLoginResponse>data).avatar;
            }
            await this.saveData(type);
            this.navigate(type);
        } else {
            this.createMessage(this.clientManager.text);
            StorageManager.deleteItem('token', 'local');
        }
    }

    private async saveData(type: string): Promise<void> {
        if (type === 'auth/login') {
            await this.saveUserSettings();
        }
        StorageManager.addItem('token', this.clientManager.token, 'local');
        StorageManager.addItem('user', this.user, 'local');
    }

    public destroyData(): void {
        this.form.userName = '';
        this.form.email = '';
        this.form.password = '';
    }

    private async saveUserSettings(): Promise<void> {
        const userSettings = await this.clientManager.getUserSettings(this.clientManager.token.userID);
        if (userSettings) {
            StorageManager.addItem('userSettings', userSettings, 'local');
            new UserDataManager(userSettings!).createUserData();
        }
    }

    public createMessage(text: string) {
        if (text) {
            window.M.toast({ html: `${text}` });
        }
    }

    private navigate(type: string) {
        const userSettings = <TSettings>StorageManager.getItem('userSettings', 'local');
        switch (type) {
            case 'auth/register':
                authManager.navigate('/onboarding');
                break;
            case 'auth/login':
                if (!userSettings) {
                    authManager.navigate('/onboarding');
                } else {
                    authManager.navigate('/program');
                }
                break;
        }
    }

    public get loadingStatus(): boolean {
        return this.isLoading;
    }
}

export default new AuthModel();
