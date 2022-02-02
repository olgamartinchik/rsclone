import AuthModel from './authPageModel';
import AuthView from './authPageView';
import StorageManager from '../../services/storageManager';
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

    public createPage(isLogin: boolean): void {
        this.isLogin = isLogin;

        if (!this.isLogin) {
            StorageManager.deleteItem('token', 'local');
        }
        const token = StorageManager.getItem('token', 'local') as TToken;
        if (token && token.jwtToken.length > 0) this.isLogin = true;

        this.view.render(this.handleInputChange.bind(this), this.handleButtonClick.bind(this), this.isLogin);
        StorageManager.deleteItem('userSettings', 'local');
        StorageManager.deleteItem('workout-program', 'local');
        StorageManager.deleteItem('workout-cards', 'local');
    }

    public handleInputChange(): void {
        const nameInput = document.querySelector('#nick-name') as HTMLInputElement;
        const emailInput = document.querySelector('#email') as HTMLInputElement;
        const passwordInput = document.querySelector('#password') as HTMLInputElement;

        const nameInputValue = nameInput ? nameInput.value : '';

        this.model.changeHandler(nameInputValue, emailInput.value, passwordInput.value);
    }

    public async handleButtonClick(e: Event): Promise<void> {
        let isLoading = this.model.isLoading;
        this.view.handlePreloader(isLoading);
        (e.target as HTMLElement).setAttribute('disabled', 'true');

        const action = this.isLogin ? 'auth/login' : 'auth/register';
        await this.model.authHandler(`${action}`);

        (e.target as HTMLElement).removeAttribute('disabled');
        isLoading = this.model.isLoading;
        this.view.handlePreloader(isLoading);
    }
}
