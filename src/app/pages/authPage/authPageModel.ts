import { TLoginForm, TToken } from '../../services/types';
import ClientManager from '../../services/clientManager';

export default class AuthModel {
    form: TLoginForm;

    constructor() {
        this.form = {
            userName: '',
            email: '',
            password: '',
        };
    }

    public changeHandler(name: string, email: string, password: string) {
        if (name) {
        this.form.userName = name;
        }
        this.form.email = email;
        this.form.password = password;
    }

    public async registerHandler() {
        const clientManager = new ClientManager();   
        await clientManager.postData('register', this.form);

        const message: string = clientManager.text;
        this.createMessage(message);

        const tokenInfo: TToken = clientManager.token;
        this.setLocalStorage(tokenInfo);
    }
    
    public async loginHandler() {
        const clientManager = new ClientManager();   
        await clientManager.postData('login', this.form);

        const message: string = clientManager.text;
        this.createMessage(message);

        const tokenInfo: TToken = clientManager.token;
        this.setLocalStorage(tokenInfo);
    }

    private setLocalStorage(tokenInfo: TToken): void {
        localStorage.setItem('token', JSON.stringify(tokenInfo))
    }

    private createMessage(text: string) {
        window.M.toast({html: `${text}`});
    }
}
