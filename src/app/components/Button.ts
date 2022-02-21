import Node from './Node';

export default class Button {
    button: Node<HTMLElement>;

    constructor(parentNode: HTMLElement, text = 'signup') {
        this.button = new Node(parentNode, 'button', 'waves-effect waves-light btn-large', `${text}`);
    }

    setCompleted(): void {
        this.button.node.innerHTML = 'Completed';
        this.button.node.classList.add('btn-completed');
    }

    setDisabled(): void {
        this.button.node.classList.add('btn-disabled');
        this.button.node.setAttribute('disabled', 'disabled');
    }

    setForTablet(): void {
        this.button.node.innerHTML = 'Signup';
        this.button.node.classList.add('header-tablet');
    }

    addClass(text: string): void {
        this.button.node.classList.add(text);
    }

    addAttribute(text: string, value: string): void {
        this.button.node.setAttribute(text, value);
    }

    onclick(onclick: (e: Event) => void): void {
        this.button.node.onclick = (e: Event) => onclick(e);
    }
}
