import Auth from '../../components/auth/auth';
import Preloader from '../../components/preloader/preloader';
import Node from '../../components/Node';

export default class AuthView {
    private rootNode: HTMLElement;

    auth: Auth;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.auth = new Auth(this.rootNode);
    }

    public render(onchange: (e: Event) => void, onclick: (e: Event) => void, isLogin: boolean) {
        this.rootNode.textContent = '';

        this.rootNode.append(this.auth.getTemplate(isLogin));

        const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        inputs.forEach((input) => {
            input.onchange = (e: Event) => onchange(e);
        });

        const form = document.querySelector('.login-content') as HTMLElement;
        if (isLogin) {
            const authLink = new Node(form, 'a', 'auth-link', 'Not Registered yet?');
            authLink.setAttribute('href', `#/register`);
        }

        this.rootNode.append(this.auth.addButton(onclick));
    }

    public handlePreloader(isLoading: boolean): void {
        if (isLoading) {
            this.rootNode.append(Preloader.getTemplate());
        } else {
            Preloader.getTemplate().remove();
        }
    }
}
