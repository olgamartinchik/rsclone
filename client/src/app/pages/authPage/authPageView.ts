import Auth from "../../components/auth/auth";

export default class AuthView {
  private rootNode: HTMLElement;
  auth: Auth;

  constructor() {
    this.rootNode = <HTMLElement>document.getElementById('app');
    this.auth = new Auth(this.rootNode, true);
  }

  render() {
    this.rootNode.textContent = '';
    this.rootNode.append(this.auth.getTemplate());
  }
}