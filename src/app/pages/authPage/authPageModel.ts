import { TLoginForm, TToken } from '../../services/types';
import router from '../../router/router';
import ClientManager from '../../services/clientManager';
import { Message } from '../../services/constants';
export { Message } from '../../services/constants';

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

    public async authHandler(type: string) {
        const clientManager = new ClientManager();   
        await clientManager.postData(`${type}`, this.form);

        const message: string = clientManager.text;
        if (message && message !== Message.registerSuccess) {
            this.createMessage(message);
        }

        const tokenInfo: TToken = clientManager.token;
        this.setLocalStorage(tokenInfo);

        if (message !== Message.loginError) {
            router.navigate('/program');
        }
    }

    private setLocalStorage(tokenInfo: TToken): void {
        localStorage.setItem('token', JSON.stringify(tokenInfo));
    }

    private createMessage(text: string) {
        window.M.toast({ html: `${text}` });
    }
}
