import Node from "../Node";
import { profileHeaderTemplate, achievementCardTemplate } from "./template";
import { TBadge } from "../../services/types";

export class Profile {
  private rootNode: Node<HTMLElement>;
  
  constructor () {
    this.rootNode = new Node(null, 'main',  'main-layout');
  }

  public getTemplate(name: string, badges: Array<TBadge>): HTMLElement {
    this.createHeader(name);
    this.createContent(badges);

    return this.rootNode.node;
  }

  private createHeader(name: string): void {
    const profileHeader = Node.setChild(this.rootNode.node, 'div', 'profile-header');
    profileHeader.insertAdjacentHTML('afterbegin', profileHeaderTemplate(name));
  }

  private createContent(badges: Array<TBadge>): void {
    const contentBlock = Node.setChild(this.rootNode.node, 'div', 'profile-content-block');
    Node.setChild(contentBlock, 'h2', 'title', 'Achievements');
    const contentWrapper = Node.setChild(contentBlock, 'div', 'profile-content item');
    badges.forEach((badge) => {
      contentWrapper.insertAdjacentHTML('beforeend', achievementCardTemplate(badge.src, badge.name, badge.text, badge.modalId));
    });
  }
}

export default new Profile();