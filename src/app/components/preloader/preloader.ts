import preloaderTemplate from './template';

class Preloader {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('div');
        this.rootNode.className = 'preloader';
    }

    public getTemplate(): HTMLElement {
        this.rootNode.textContent = '';
        this.rootNode.insertAdjacentHTML('afterbegin', preloaderTemplate());
        return this.rootNode;
    }
}

export default new Preloader();
