import AuthModel from './authPageModel';
import AuthView from './authPageView';
import StorageManager from '../../services/storageManager';
import { Message } from '../../services/constants';

export default class AuthController {
    private model: AuthModel;

    private view: AuthView;

    private isExistingUser: boolean;

    constructor() {
        this.model = new AuthModel();
        this.view = new AuthView();
        this.isExistingUser = false;
    }

    public createPage(isExistingUser: boolean): void {
        this.isExistingUser = isExistingUser;
        if (!this.isExistingUser) StorageManager.deleteItem('token', 'local');

        this.view.render(
            this.handleInputChange.bind(this),
            this.handleInput.bind(this),
            this.handleBackButtonClick.bind(this),
            this.handleButtonClick.bind(this),
            this.isExistingUser
        );
        StorageManager.deleteItem('userSettings', 'local');
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
        this.model.checkUserData(this.isExistingUser);
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
                    this.model.createMessage(Message.invalidPassword);
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
        const type = this.isExistingUser ? 'auth/login' : 'auth/register';
        await this.model.authHandler(`${type}`);
        this.destroyPreloader(<HTMLElement>e.target);
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
