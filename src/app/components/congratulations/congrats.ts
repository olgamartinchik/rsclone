import congratsTemplate from "./template";

class Congratulation {
  private rootNode: HTMLElement;
  
  constructor() {
    this.rootNode = document.createElement('main');
  }

  public getTemplate(duration: number, onclick: (e: Event) => void): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.insertAdjacentHTML('afterbegin', congratsTemplate(duration));
    this.rootNode.onclick = (e: Event) => onclick(e);

    return this.rootNode;
  }
}

export default new Congratulation();