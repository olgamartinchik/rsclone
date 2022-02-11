import { authTemplate, passwordTemplate } from './template';
import Node from '../Node';
import Button from '../Button';

export default class Auth {
    main: Node<HTMLElement>;

    constructor(parentNode: HTMLElement) {
        this.main = new Node(parentNode, 'main', 'login');
    }

    public getTemplate(isLogin: boolean, onBackBtnClick: (e: Event) => void, onclick: (e: Event) => void, onIconClick: (e: Event) => void,): HTMLElement {
        this.main.node.textContent = '';
        this.addBackButton(this.main.node, onBackBtnClick);
        this.createForm(isLogin, onBackBtnClick, onclick, onIconClick);
        return this.main.node;
    }

    private addBackButton(parentNode: HTMLElement, onBackBtnClick: (e: Event) => void): void {
        const backButton = new Node(parentNode, 'a', 'back-btn');
        backButton.setAttribute('href', '#/main');
        backButton.node.onclick = (e: Event) => onBackBtnClick(e);
        Node.setChild(backButton.node, 'i', 'icon arrow-left');
    }

    private createForm(isLogin: boolean, onBackBtnClick: (e: Event) => void, onclick: (e: Event) => void, onIconClick: (e: Event) => void): void {
        const form = new Node(this.main.node, 'form', 'login-content');
        
        if (!isLogin) form.node.insertAdjacentHTML('beforeend', authTemplate('userName', 'text', 'Name'));
        form.node.insertAdjacentHTML('beforeend', authTemplate('email', 'email', 'Email'));
        form.node.insertAdjacentHTML('beforeend', passwordTemplate('password', 'password', 'validate', 'Password'));
        if (!isLogin) form.node.insertAdjacentHTML('beforeend', passwordTemplate('confirm', 'password', '','Confirm password'));
        if (isLogin) {
            const authLink = new Node(form.node, 'a', 'auth-link', 'Not Registered yet?');
            authLink.setAttribute('href', `#/register`);
            authLink.node.onclick = (e: Event) => onBackBtnClick(e);
        }
        this.addEvents(onIconClick);
        this.addButton(form.node, onclick);
    }

    private addButton(parentNode: HTMLElement, onclick: (e: Event) => void): void {
        const btnWrapper = Node.setChild(parentNode, 'div', 'btn-wrapper');
        const button = new Button(btnWrapper, 'Get Started');
        button.addClass('btn-send');
        button.onclick(onclick);
        button.setDisabled();
    }

    private addEvents(onIconClick: (e: Event) => void): void {
        const eyeIcons = <NodeListOf<HTMLElement>>this.main.node.querySelectorAll(`[data-type='eye-icon']`);
        eyeIcons.forEach((eyeIcon) => {
            eyeIcon.onclick = (e: Event) => onIconClick(e);
        });
    }
}
