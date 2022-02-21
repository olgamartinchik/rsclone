import headerTemplate from './template';

class Header {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('header');
    }

    public getTemplate(): HTMLElement {
        this.rootNode.textContent = '';
        this.rootNode.insertAdjacentHTML('afterbegin', headerTemplate());
        return this.rootNode;
    }
}

export default new Header();
