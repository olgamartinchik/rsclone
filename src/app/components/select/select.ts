import Node from "../Node";
import selectTemplate from "./template";

export class Select {
  private rootNode: Node<HTMLElement>;

  constructor() {
    this.rootNode = new Node(null, 'div', 'input-field col s12');
  }

  public getTemplate(text: string, options: Array<string>, isMultiple: boolean): HTMLElement {
    const selectWrapper = Node.setChild(this.rootNode.node, 'select');
    if (isMultiple) selectWrapper.setAttribute('multiple', 'multiple');
    const title = Node.setChild(selectWrapper, 'option', '', text);
    title.setAttribute('disabled', 'disabled');
    title.setAttribute('selected', 'selected');

    options.forEach((option, index) => {
      selectWrapper.insertAdjacentHTML('beforeend', selectTemplate(option, (index + 1).toString()));
    });

    return this.rootNode.node;
  }
}

export default new Select();