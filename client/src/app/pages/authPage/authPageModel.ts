import { TLoginForm } from "../../services/types";
import ClientManager from "../../services/clientManager";

export default class AuthModel {
  form: TLoginForm;

  constructor() {
    this.form = {
      userName: '',
      email: '',
      password: '',
    };
  }

  public getLoginFormValue(name: string, email: string, password: string) {
    this.form.userName = name;
    this.form.email = email;
    this.form.password = password;

    const clientManager = ClientManager.getInstance();
    clientManager.getResponse('register', this.form);
  }
}