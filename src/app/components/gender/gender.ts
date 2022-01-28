import genderTemplate from "./template";

class Gender {
  private rootNode: HTMLElement;

  constructor() {
      this.rootNode = document.createElement('div');
      this.rootNode.className = 'gender-selection z-depth-1';
  }

  public getTemplate(onselect: (e: Event) => void): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.onclick = (e: Event) => onselect(e);
    this.rootNode.insertAdjacentHTML('afterbegin', genderTemplate());
    return this.rootNode;
  }
}

export default new Gender();