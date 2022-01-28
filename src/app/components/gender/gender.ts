import genderTemplate from "./template";

class Gender {
  private rootNode: HTMLElement;

  constructor() {
      this.rootNode = document.createElement('div');
      this.rootNode.className = 'gender-selection z-depth-1 active-1';
  }

  public getTemplate(): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.insertAdjacentHTML('afterbegin', genderTemplate());
    return this.rootNode;
  }
}

export default new Gender();