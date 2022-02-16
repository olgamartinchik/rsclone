import Node from '../Node';
import { profileHeaderTemplate, achievementCardTemplate, editProfileTemplate } from './template';
import { TBadge } from '../../services/types';

export class Profile {
    private rootNode: Node<HTMLElement>;

    constructor() {
        this.rootNode = new Node(null, 'main', 'main-layout');
    }

    public getTemplate(
        name: string,
        src: string,
        badges: Array<TBadge>,
        badgesActivated: Array<string>,
        completedWorkouts: number,
        caloriesBurned: number
    ): HTMLElement {
        this.rootNode.node.textContent = '';
        this.createHeader(name, src, completedWorkouts, caloriesBurned);
        this.createContent(badges, badgesActivated);

        return this.rootNode.node;
    }

    private createHeader(name: string, src: string, completedWorkouts: number, caloriesBurned: number): void {
        const profileHeader = Node.setChild(this.rootNode.node, 'div', 'profile-header');
        profileHeader.insertAdjacentHTML(
            'afterbegin',
            profileHeaderTemplate(name, src, completedWorkouts, caloriesBurned)
        );
    }

    private createContent(badges: Array<TBadge>, badgesActivated: Array<string>): void {
        const contentBlock = Node.setChild(this.rootNode.node, 'div', 'profile-content-block');
        Node.setChild(contentBlock, 'h2', 'title', 'Achievements');
        const contentWrapper = Node.setChild(contentBlock, 'div', 'profile-content item');
        badges.forEach((badge) => {
            if (badgesActivated.includes(badge.name)) {
                contentWrapper.insertAdjacentHTML(
                    'beforeend',
                    achievementCardTemplate(badge.srcActive, badge.name, badge.text, badge.modalId)
                );
            } else {
                contentWrapper.insertAdjacentHTML(
                    'beforeend',
                    achievementCardTemplate(badge.src, badge.name, badge.text, badge.modalId)
                );
            }
        });
    }

    public getEditProfileTemplate(src: string): HTMLElement {
        this.rootNode.node.textContent = '';
        const editProfileHeader = Node.setChild(this.rootNode.node, 'div', 'profile-header');
        editProfileHeader.insertAdjacentHTML('afterbegin', editProfileTemplate(src));

        return this.rootNode.node;
    }
}

export default new Profile();
