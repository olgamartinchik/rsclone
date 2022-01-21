import { TLoginForm } from "../../services/types";

export default class AuthModel {
  form: TLoginForm;

  constructor() {
    this.form = {
      userName: '',
      email: '',
      password: '',
    };
  }

  public getLoginFormValue() {
    
  }
}