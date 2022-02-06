import checkbox from "../checkbox/checkbox";
import { modalFooterTemplate } from "./template";
import Node from '../Node';
import { ModalContents } from '../../services/constants';

class Modal {
  private rootNode: HTMLDivElement;

  constructor() {
    this.rootNode = document.createElement('div');
    this.rootNode.className = 'modal editplan';
    this.rootNode.setAttribute('id', 'modal1');
  }

  public getTemplate(content: ModalContents, className: string, triggerBtnText: string, modalBtnText: string, options?: Array<string>, checkedOptions?: Array<string|undefined>): HTMLElement {
    const modalContent = new Node(this.rootNode, 'div', 'modal-content');
    const contentType = content;
    
    if (contentType === ModalContents.options) modalContent.append(checkbox.getTemplate(className, options as Array<string>, checkedOptions as Array<string | undefined>));
    this.rootNode.insertAdjacentHTML('beforeend', modalFooterTemplate(className, modalBtnText));

    return this.rootNode;
  }
}

export default new Modal();