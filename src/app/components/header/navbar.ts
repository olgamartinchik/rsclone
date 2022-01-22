import Node from '../Node';
import Button from '../Button';
import { Id, Routes } from '../../services/constants';

export default class NavBar {
    menu: Node<HTMLElement>;

    links: Array<string>;

    icons: Array<string> | undefined;

    needsButton: boolean;

    constructor(parentNode: HTMLElement, links: Array<string>, needsButton: boolean, icons?: Array<string>) {
        this.links = links;
        this.icons = icons;
        this.needsButton = needsButton;
        this.menu = new Node(parentNode, 'ul', 'right hide-on-med-and-down');
        const menuMobile = new Node(parentNode, 'a', 'sidenav-trigger');
        menuMobile.setAttribute('data-target', 'mobile-demo');
        menuMobile.setAttribute('href', '#');
        new Node(menuMobile.node, 'i', 'material-icons', 'menu');
    }

    generateMenu(attributeName = Id.menu): void {
        this.menu.setAttribute('id', attributeName);
        this.generateLinks(this.menu.node, this.needsButton, this.icons);
        this.generateMobileMenu();
    }

    generateLinks(parentNode, needsButton: boolean, icons?: Array<string> | undefined): void {
        this.links.forEach((link, index) => {
            const menuItem = new Node(parentNode, 'li');
            const menuLink = new Node(menuItem.node, 'a');
            menuLink.setAttribute('href', `/${link}`);
            if (icons) {
                new Node(menuLink.node, 'i', `icon ${(this.icons as Array<string>)[index]}`);
            }
            menuLink.node.innerHTML += link;
        });
        if (needsButton) {
            new Button(this.menu.node);
        }
    }

    generateMobileMenu() {
        const header = document.querySelector('header');
        const mobileMenu = new Node(header, 'ul', 'sidenav');
        mobileMenu.setAttribute('id', Id.mobileMenu);

        this.generateLinks(mobileMenu.node, false, this.icons);
    }

    addProfileLink(user: string): void {
        const menuItem = new Node(this.menu.node, 'li');
        const menuLink = new Node(menuItem.node, 'a');
        menuLink.setAttribute('href', `/${Routes.profile}`);
        const iconContainer = new Node(menuLink.node, 'div', 'icon-container');
        const profileIcon = new Node(iconContainer.node, 'span', 'profile');
        profileIcon.node.innerHTML = `${user}`;
        menuLink.node.innerHTML += 'Profile';
    }
}
