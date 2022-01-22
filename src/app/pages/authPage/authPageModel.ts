import { TLoginForm } from '../../services/types';
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

    public handleUserData(name: string, email: string, password: string) {
        this.form.userName = name;
        this.form.email = email;
        this.form.password = password;

        const clientManager = new ClientManager();
        clientManager.postData('register', this.form);
        
        const message: string = clientManager.text;
        this.createMessage(message);
    }

    public createMessage(text: string) {
        window.M.toast({html: `${text}`});
    }
}
