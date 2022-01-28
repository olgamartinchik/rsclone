import { paramsTemplate, selectTemplate } from './template';

class Parameters {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('div');
        this.rootNode.className = 'input-group';
    }

    public getTemplate(title: string, isSelect: boolean, option1: string, option2: string, min: string, max: string): HTMLElement {
        this.rootNode.textContent = '';
        this.rootNode.insertAdjacentHTML('afterbegin', paramsTemplate(title));
        if(isSelect) this.rootNode.insertAdjacentHTML('beforeend', selectTemplate(option1, option2, min, max));

        return this.rootNode;
    }

    public
}

export default new Parameters();