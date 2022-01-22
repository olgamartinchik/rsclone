import AuthModel from './authPageModel';
import AuthView from './authPageView';

export default class AuthController {
    private model: AuthModel;

    private view: AuthView;

    constructor() {
        this.model = new AuthModel();
        this.view = new AuthView();
    }

    public createPage() {
        this.view.render(this.handleInputChange.bind(this));
    }

    public handleInputChange(): void {
        const nameInput = document.querySelector('#nick-name') as HTMLInputElement;
        const emailInput = document.querySelector('#email') as HTMLInputElement;
        const passwordInput = document.querySelector('#password') as HTMLInputElement;

        this.checkAuthData(nameInput.value, emailInput.value, passwordInput.value);
    }

    public checkAuthData(name: string, email: string, password: string) {
        this.model.getLoginFormValue(name, email, password);
    }
}
