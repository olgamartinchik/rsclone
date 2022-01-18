import Node from './Node';
import { Src, Routes, Alt } from '../services/constants';

export default class Logo {
  logo: Node<HTMLElement>;
  
  constructor(parentNode: HTMLElement) {
    this.logo = new Node(parentNode, 'a', 'brand-logo');
  }

  generateLogo(attributeName = Routes.startPage): void {
    this.logo.setAttribute('href', attributeName);
    this.generateLogoImg();
  }

  generateLogoImg(): void {
    const logoIMG = new Node<HTMLImageElement>(this.logo.node, 'img');
    logoIMG.setAttribute('src', Src.logo);
    logoIMG.setAttribute('alt', Alt.logo);
  }
} 