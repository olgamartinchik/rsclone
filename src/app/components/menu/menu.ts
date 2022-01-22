import menuTemplate from "./template";

class Menu {
  private rootNode: HTMLElement;

  constructor() {
      this.rootNode = document.createElement('header');
  }

  public getTemplate(): HTMLElement {
      this.rootNode.insertAdjacentHTML('afterbegin', menuTemplate());
      return this.rootNode;
  }
}

export default new Menu();