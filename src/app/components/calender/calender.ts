import calenderTemplate from "./template";

class Calender {

  private rootNode: HTMLElement;

  constructor() {
      this.rootNode = document.createElement('div');
      this.rootNode.className = 'input-group';
  }

  public getTemplate(onselect: (e: Event) => void): HTMLElement {
    this.rootNode.textContent = '';
    this.rootNode.onclick = (e: Event) => onselect(e);
    this.rootNode.insertAdjacentHTML('afterbegin', calenderTemplate());
    
    return this.rootNode;
  }
}

export default new Calender();