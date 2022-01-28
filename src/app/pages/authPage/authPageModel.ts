import { TLoginForm, TToken } from '../../services/types';
import router from '../../router/router';
import ClientManager from '../../services/clientManager';
import { Message } from '../../services/constants';

export default class AuthModel {
    form: TLoginForm;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    tokenInfo: TToken;

    constructor() {
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
        const clientManager = new ClientManager();
        await clientManager.postData(`${type}`, this.form);

        this.isLoading = false;

        this.isSuccess = clientManager.result;
        this.message = clientManager.text;
        this.tokenInfo = clientManager.token;

        this.createMessage(this.message);
        
        if (this.isSuccess) {
            this.navigate(type);
            this.setLocalStorage(this.tokenInfo);
        }
            
        this.clearLocalStorage('token');
    }

    private setLocalStorage(tokenInfo: TToken): void {
        localStorage.setItem('token', JSON.stringify(tokenInfo));
    }

    private clearLocalStorage(key: string): void {
        localStorage.removeItem(key);
    }

    private createMessage(text: string) {
        if (text && text !== Message.registerSuccess) {
            window.M.toast({ html: `${text}` });   
        }
    }

    private navigate(type: string) {
        switch(type) {
            case 'register': 
                router.navigate('/onboarding');
                break;
            case 'login': 
                router.navigate('/program');
                break;
        }
    }

    public get loadingStatus(): boolean {
        return this.isLoading;
    }
}
