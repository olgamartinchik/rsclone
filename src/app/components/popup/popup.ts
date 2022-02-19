import Node from '../Node';
import template from './template';

class Popup {
    private readonly rootNode: HTMLElement;

    private popUp: HTMLElement | null;

    private overflow: HTMLElement | null;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.popUp = null;
        this.overflow = null;
    }

    public createPopup(src: string, name = '', text = ''): void {
        this.popUp = document.createElement('div');
        this.overflow = document.createElement('div');
        this.popUp.className = 'popup popup-answer active';
        this.overflow.className = 'overflow active';
        const controls = new Node(this.popUp, 'div', 'popup-controls');
        const btnNext = new Node(controls.node, 'button', 'btn-large popup-btn popup-btn-pink', 'Ok');
        btnNext.node.onclick = (e: Event) => {
            e.stopPropagation();
            this.destroyPopup();
        };
        this.popUp.insertAdjacentHTML('beforeend', template(src, name, text));
        this.popUp.append(controls.node);
        this.rootNode.append(this.overflow, this.popUp);
    }

    public destroyPopup() {
        if (this.overflow && this.popUp) {
            this.overflow.classList.add('closed');
            this.popUp.classList.add('closed');
            this.overflow.onanimationend = (e: Event) => {
                e.stopPropagation();
                if (this.overflow) {
                    this.overflow.classList.remove('closed');
                    this.overflow.remove();
                }
            };
            this.popUp.onanimationend = (e: Event) => {
                e.stopPropagation();
                if (this.popUp) {
                    this.popUp.classList.remove('closed');
                    this.popUp.remove();
                }
            };
        }
    }
}

export default Popup;
