import checkbox from '../checkbox/checkbox';
import { modalFooterTemplate } from './template';
import Node from '../Node';
import { ModalContents } from '../../services/constants';

class Modal {
    private rootNode: HTMLDivElement;

    constructor() {
        this.rootNode = document.createElement('div');
        this.rootNode.className = 'modal editplan';
        this.rootNode.setAttribute('id', 'modal1');
    }

    public getTemplate(
        content: ModalContents,
        className: string,
        modalBtnText: string,
        options?: Array<string>,
        checkedOptions?: Array<string | undefined>,
        attribute?: string
    ): HTMLElement {
        this.rootNode.textContent = '';

        const modalContent = new Node(this.rootNode, 'div', 'modal-content');
        if (attribute) modalContent.setAttribute('data-type', attribute);
        const contentType = content;

        if (contentType === ModalContents.options)
            modalContent.append(
                checkbox.getTemplate(className, options as Array<string>, checkedOptions as Array<string | undefined>)
            );
        this.rootNode.insertAdjacentHTML('beforeend', modalFooterTemplate(className, modalBtnText));

        return this.rootNode;
    }
}

export default new Modal();
