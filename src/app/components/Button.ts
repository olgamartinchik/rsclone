import Node from './Node';

export default class Button {
  button: Node<HTMLElement>;
  
  constructor(parentNode: HTMLElement) {
    this.button = new Node(parentNode, 'a', 'waves-effect waves-light btn-large');
  }

  setContent(text: string): void {
    this.button.node.innerHTML = text;
  }

  setCompleted(): void {
    this.button.node.innerHTML = 'Completed';
    this.button.node.classList.add('btn-completed');
  }

  setForTablet(): void {
    this.button.node.innerHTML = 'Signup';
    this.button.node.classList.add('header-tablet');
  }
}