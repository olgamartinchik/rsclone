import Auth from '../../components/auth/auth';
import Preloader from '../../components/preloader/preloader';
import MaterializeHandler from '../../services/materialize/materializeHandler';

export class AuthView {
    private rootNode: HTMLElement;

    private auth: Auth;
    
    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.auth = new Auth(this.rootNode);
        this.materializeHandler = new MaterializeHandler();
    }

    public render(
        onchange: (e: Event) => void,
        oninput: (e: Event) => void,
        onBackBtnclick: (e: Event) => void,
        onclick: (e: Event) => void,
        onIconClick: (e: Event) => void,
        isLogin: boolean
    ) {
        this.rootNode.textContent = '';
        this.rootNode.append(this.auth.getTemplate(isLogin, onBackBtnclick, onclick, onIconClick));
        this.activateValidation();
        this.addOnChangeEvent(onchange);
        this.addOnInputEvent(oninput);
        this.materializeHandler.initTooltip();
    }

    private addOnChangeEvent(onchange: (e: Event) => void): void {
        const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        inputs.forEach((input) => {
            input.onchange = (e: Event) => onchange(e);
        });
    }

    private addOnInputEvent(oninput: (e: Event) => void): void {
        const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        inputs.forEach((input) => {
            input.oninput = (e: Event) => oninput(e);
        });
    }

    private activateValidation(): void {
        const nameInput = <HTMLInputElement>this.rootNode.querySelector('#userName');
        const emailInput = <HTMLInputElement>this.rootNode.querySelector('#email');
        const passwordInput = <HTMLInputElement>this.rootNode.querySelector('#password');
        if (nameInput) nameInput.setAttribute('pattern', '^[a-zA-Zа-яА-Я*/\s]{2,15}$');
        if (emailInput) emailInput.setAttribute('pattern', '^([a-zA-Z_-]{3,15})@([a-z]{4,})(.)([a-z]{2,})');
        if (passwordInput) passwordInput.setAttribute('pattern', '(?=*\d)(?=*[a-z])(?=*[A-Z]){8,}');
    }

    public handlePreloader(isLoading: boolean): void {
        if (isLoading) {
            this.rootNode.append(Preloader.getTemplate());
        } else {
            Preloader.getTemplate().remove();
        }
    }
}

export default new AuthView();
