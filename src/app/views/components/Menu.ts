import Node from './Node';
import Button from './Button';
import { Id } from '../../services/constants';

export default class Menu {
  menu: Node<HTMLElement>;
  links: Array<string>;
  
  constructor(parentNode: HTMLElement, links: Array<string>) {
    this.links = links;
    this.menu = new Node(parentNode, 'ul', 'right hide-on-med-and-down');
  }

  generateMenu(attributeName = Id.menu): void {
    this.menu.setAttribute('id', attributeName);
    this.generateLinks();
  }

  generateLinks(): void {
    this.links.forEach(link => {
      const menuItem = new Node(this.menu.node, 'li');
      const menuLink = new Node(menuItem.node, 'a');
      menuLink.setAttribute('href', `/${link}`);
      menuLink.node.innerHTML = link;
    });
    this.addButton();
  }

  addButton() {
    const button = new Button(this.menu.node);
    button.setContent('signup');
  }
} 