import { paramsTemplate, selectTemplate } from './template';

class Parameters {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('div');
        this.rootNode.className = 'input-group';
    }

    public getTemplate(title: string, option1: string, option2: string, min: string, max: string, onselect: (e: Event) => void): HTMLElement {
        this.rootNode.textContent = '';
        this.rootNode.onclick = (e: Event) => onselect(e);
        this.rootNode.insertAdjacentHTML('afterbegin', paramsTemplate(title, option1, option2, min, max));

        return this.rootNode;
    }
}

export default new Parameters();