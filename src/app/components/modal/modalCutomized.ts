import Node from '../Node';

export class Modal {
    private overlay: Node<HTMLElement> | null;

    private angle: number;

    constructor() {
        this.overlay = null;
        this.angle = 0;
    }

    public createModal(parentNode: HTMLElement, contentsTemplate?: string): void {
        this.angle = 0;
        this.overlay = new Node(parentNode, 'div', 'fiton-modal-overlay');
        const modalCard = Node.setChild(this.overlay.node, 'div', 'fiton-modal-card');
        const contents = Node.setChild(modalCard, 'div', 'fiton-modal-contents');
        if (contentsTemplate) {
            contents.insertAdjacentHTML('afterbegin', contentsTemplate);
        }
        this.bindEvents();
    }

    private bindEvents(): void {
        if (this.overlay) {
            this.overlay!.node.onclick = (e) => this.destroy(e);
        }

        const buttons = <NodeListOf<HTMLElement>>document.querySelectorAll('[data-arrow]');
        if (buttons.length > 0) {
            buttons.forEach((button) => {
                button.onclick = (e: Event) => this.carouselSpin(e);
            });
        }
    }

    private carouselSpin(e: Event) {
        const spinner = <HTMLElement>document.querySelector('#spinner');
        const direction = (<HTMLElement>e.target).dataset.direction;
        this.angle = direction === 'right' ? (this.angle -= 90) : (this.angle += 90);
        spinner.style.transform = `rotateY(${this.angle}deg)`;
    }

    private destroy(e: Event): void {
        if ((<HTMLElement>e.target).dataset.arrow !== 'arrow') {
            this.overlay!.node.remove();
        }
    }
}

export default new Modal();
