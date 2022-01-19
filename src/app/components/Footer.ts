import Node from './Node';
import { FooterInfo, Src, Alt } from '../services/constants';

export default class Footer {
  githubLinks: Node<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    const footerWrapper = new Node(parentNode, 'div', 'wrapper footer-wrapper');
    
    const infoBlock = new Node(footerWrapper.node, 'div', 'info');
    new Node(infoBlock.node, 'p', 'copyright', FooterInfo.copyright);
    new Node(infoBlock.node, 'p', 'year', FooterInfo.yearOfCreation);
    this.githubLinks = new Node(infoBlock.node, 'div', 'github-links');
    this.generateGitHubLink('https://github.com/OlgaTolpykina', 'Olga Tolpykina');
    this.generateGitHubLink('https://github.com/tetianaMas', 'Tetiana Maslova');
    this.generateGitHubLink('https://github.com/olgamartinchik', 'Olga Martinchik');
    const rsSchoolLink = new Node(footerWrapper.node, 'a', 'link rss-logo');
    rsSchoolLink.setAttribute('href', FooterInfo.rsSchoolLink);
    rsSchoolLink.setAttribute('target', '_blank');
    const rsSchoolImg = new Node(rsSchoolLink.node, 'img', 'link rss-logo');
    rsSchoolImg.setAttribute('src', Src.rsSchool);
    rsSchoolImg.setAttribute('alt', Alt.rsSchool);
    rsSchoolImg.setAttribute('width', FooterInfo.rsSchoolLogoWidth);
    rsSchoolImg.setAttribute('height', FooterInfo.rsSchoolLogoHeight);
  }

  generateGitHubLink(link: string, name: string): void {
    const githubLink = new Node(this.githubLinks.node, 'a', 'link', `${name}`);
    githubLink.setAttribute('href', link);
    githubLink.setAttribute('target', '_blank');
  }
}