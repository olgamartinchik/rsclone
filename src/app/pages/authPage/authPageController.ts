import authModel, { AuthModel } from './authPageModel';
import authView, { AuthView } from './authPageView';
import StorageManager from '../../services/storageManager';
import { Message } from '../../services/constants';

export class AuthPageController {
    private model: AuthModel;

    private view: AuthView;

    private isLogin: boolean;

    constructor() {
        this.model = authModel;
        this.view = authView;
        this.isLogin = false;
    }

    public createPage(isLogin: boolean): void {
        this.isLogin = isLogin;
        this.model.destroyData();
        this.view.render(
            this.handleInputChange.bind(this),
            this.handleInput.bind(this),
            this.handleBackButtonClick.bind(this),
            this.handleButtonClick.bind(this),
            this.handleIconClick.bind(this),
            this.isLogin
        );
        StorageManager.deleteItem('userSettings', 'local');
        StorageManager.deleteItem('user', 'local');
        StorageManager.deleteItem('workout-program', 'local');
        StorageManager.deleteItem('workout-cards', 'local');
    }

    private handleInputChange(e: Event): void {
        const element = <HTMLInputElement>e.target;
        const elementType = element.id;
        const value = element.value;
        if (value === '') this.model.changeHandler({ [elementType]: value });
        this.handleValidation(elementType, element);
    }

    private handleInput(e: Event): void {
        const element = <HTMLInputElement>e.target;
        const elementType = element.id;
        const value = element.value;

        if (element.validity.valid) {
            this.model.changeHandler({ [elementType]: value });
        } else {
            this.model.changeHandler({ [elementType]: '' });
        }
        this.handlePasswordConfirmation();
        this.model.checkUserData(this.isLogin);
    }

    private handlePasswordConfirmation(): void {
        const passwordInput = <HTMLInputElement>document.querySelector('#password');
        const confirmPasswordInput = <HTMLInputElement>document.querySelector('#confirm');
        if (passwordInput.value && confirmPasswordInput.value) {
            const isPasswordConfirmed = this.model.checkPassword();
            if (!isPasswordConfirmed) {
                confirmPasswordInput.className = 'invalid';
            } else {
                confirmPasswordInput.className = 'valid';
            }
        } 
    }

    private handleValidation(type: string, element: HTMLInputElement): void {
        if (!element.validity.valid) {
            switch (type) {
                case 'userName':
                    this.model.createMessage(Message.invalidName);
                    break;
                case 'email':
                    this.model.createMessage(Message.invalidValue);
                    break;
                case 'password':
                    this.model.createMessage(Message.invalidValue);
                    break;
            }
        }
    }

    private handleBackButtonClick(): void {
        this.model.changeHandler({ ['userName']: '' });
        this.model.changeHandler({ ['email']: '' });
        this.model.changeHandler({ ['password']: '' });
    }

    private async handleButtonClick(e: Event): Promise<void> {
        this.initPreloader(<HTMLElement>e.target);
        const type = this.isLogin ? 'auth/login' : 'auth/register';
        await this.model.authHandler(`${type}`);
        this.destroyPreloader(<HTMLElement>e.target);
    }

    private handleIconClick(e: Event): void {
        const clickedIcon = <HTMLElement>e.target;
        const input = <HTMLInputElement>clickedIcon.nextElementSibling;
        const inputType = input.type;

        input.type = inputType === 'password' ? 'text' : 'password';
        clickedIcon.classList.toggle('eye');
        clickedIcon.classList.toggle('eye-closed');
    }

    private initPreloader(button: HTMLElement): void {
        const isLoading = this.model.isLoading;
        this.view.handlePreloader(isLoading);
        button.setAttribute('disabled', 'true');
    }

    private destroyPreloader(button: HTMLElement): void {
        const isLoading = this.model.isLoading;
        this.view.handlePreloader(isLoading);
        button.removeAttribute('disabled');
    }
}

export default new AuthPageController();
