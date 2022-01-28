import onboardingTemplate from "./template";

class Onboarding {
  private rootNode: HTMLElement;

  constructor() {
      this.rootNode = document.createElement('main');
  }

  public getTemplate(title: string): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.insertAdjacentHTML('afterbegin', onboardingTemplate(title));
    return this.rootNode;
  }
}

export default new Onboarding();