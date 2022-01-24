import AuthModel from './authPageModel';
import AuthView from './authPageView';
import { TToken } from '../../services/types';

export default class AuthController {
    private model: AuthModel;

    private view: AuthView;
    isLogin: boolean;

    constructor() {
        this.model = new AuthModel();
        this.view = new AuthView();
        this.isLogin = false;
    }

    public createPage() {
        this.isLogin = false;
        const token: TToken = JSON.parse(localStorage.getItem('token') as string);
        if(token && token.jwtToken.length > 0) this.isLogin = true;

        this.view.render(this.handleInputChange.bind(this), this.handleButtonClick.bind(this), this.isLogin);
    }

    public handleInputChange(): void {
        const nameInput = document.querySelector('#nick-name') as HTMLInputElement;
        const emailInput = document.querySelector('#email') as HTMLInputElement;
        const passwordInput = document.querySelector('#password') as HTMLInputElement;

        let nameInputValue = '';
        nameInput ? nameInputValue = nameInput.value : nameInputValue = ''; 

        this.model.changeHandler(nameInputValue, emailInput.value, passwordInput.value);
    }

    public handleButtonClick(): void {
        if (this.isLogin) {
            this.model.loginHandler();
        } else {
            this.model.registerHandler();
        }
    }
}
