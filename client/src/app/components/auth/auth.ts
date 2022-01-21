import authTemplate from "./template";
import Node from "../Node";
import Button from "../Button";

export default class Auth {
  main: Node<HTMLElement>;
  isLogin: boolean;

  constructor (parentNode: HTMLElement, isLogin: boolean) {
    this.main = new Node(parentNode, 'main', 'login');
    this.isLogin = isLogin;
  }

  public getTemplate() {
    const form = new Node(this.main.node, 'form', 'login-content');
    if (this.isLogin) form.node.insertAdjacentHTML('beforeend', authTemplate('nick-name', 'text', 'Name'));
    form.node.insertAdjacentHTML('beforeend', authTemplate('email', 'email', 'Email'));
    form.node.insertAdjacentHTML('beforeend', authTemplate('password', 'password', 'Password'));
    new Button(form.node, 'get started');

    return this.main.node;
  }
}