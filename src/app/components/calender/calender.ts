import calenderTemplate from "./template";

class Calender {

  private rootNode: HTMLElement;

  constructor() {
      this.rootNode = document.createElement('div');
      this.rootNode.className = 'input-group';
  }

  public getTemplate(): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.insertAdjacentHTML('afterbegin', calenderTemplate());
    return this.rootNode;
  }
}

export default new Calender();