import { TLoginForm, TToken } from '../../services/types';
import authManager from '../../services/authManager';
import ClientManager from '../../services/clientManager';
import StorageManager from '../../services/storageManager';
import { Message } from '../../services/constants';
import storageManager from '../../services/storageManager';

export default class AuthModel {
    private form: TLoginForm;

    public isLoading: boolean;

    private isSuccess: boolean;

    private message: string;

    private tokenInfo: TToken;

    private clientManager: ClientManager;

    constructor() {
        this.clientManager = new ClientManager();
        this.isLoading = true;
        this.form = {
            userName: '',
            email: '',
            password: '',
        };
        this.isSuccess = true;
        this.message = '';
        this.tokenInfo = {
            userID: '',
            jwtToken: '',
        };
    }

    public changeHandler(name: string, email: string, password: string) {
        if (name) {
            this.form.userName = name;
        }
        this.form.email = email;
        this.form.password = password;
    }

    public async authHandler(type: string): Promise<void> {
        await this.clientManager.postData(`${type}`, this.form);

        this.isLoading = false;

        this.isSuccess = this.clientManager.result;
        this.message = this.clientManager.text;
        this.tokenInfo = this.clientManager.token;

        this.createMessage(this.message);

        if (this.isSuccess) {
            StorageManager.addItem('token', this.tokenInfo, 'local');
            if (type === 'auth/login') this.saveUserSettings();
            this.navigate(type);
        } else {
            StorageManager.deleteItem('token', 'local');
        }
    }

    private async saveUserSettings(): Promise<void> {
        const userSettings = await this.clientManager.getUserSettings(this.tokenInfo.userID);
        storageManager.addItem('userSettings', userSettings, 'local');
    }

    private createMessage(text: string) {
        if (text && text !== Message.registerSuccess) {
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
