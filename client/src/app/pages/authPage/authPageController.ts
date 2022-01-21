import AuthModel from "./authPageModel";
import AuthView from "./authPageView";

export default class AuthController {
  private model: AuthModel;

  private view: AuthView;

  constructor() {
    this.model = new AuthModel;
    this.view = new AuthView;
  }

  public createPage() {
    this.view.render();
  }
}