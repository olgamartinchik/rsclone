import authTemplate from './template';
import Node from '../Node';

export default class Auth {
    main: Node<HTMLElement>;

    form: Node<HTMLElement>;

    constructor(parentNode: HTMLElement) {
        this.main = new Node(parentNode, 'main', 'login');
        this.form = new Node(this.main.node, 'form', 'login-content');
    }

    public getTemplate(isLogin: boolean): HTMLElement {
        this.form.node.textContent = '';
        if (!isLogin) {
            this.form.node.insertAdjacentHTML('beforeend', authTemplate('nick-name', 'text', 'Name'));
        }
        this.form.node.insertAdjacentHTML('beforeend', authTemplate('email', 'email', 'Email'));
        this.form.node.insertAdjacentHTML('beforeend', authTemplate('password', 'password', 'Password'));

        return this.main.node;
    }

    public addButton(onclick: (e: Event) => void): HTMLElement {
        const button = document.createElement('a');
        button.className = 'waves-effect waves-light btn-large';
        button.innerHTML = 'Get Started';
        this.form.node.append(button);

        button.onclick = (e: Event) => onclick(e);

        return this.main.node;
    }
}
