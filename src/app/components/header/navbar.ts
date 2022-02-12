import Node from '../Node';
import Button from '../Button';
import { Id } from '../../services/constants';
import MaterializeHandler from '../../services/materialize/materializeHandler';

export default class NavBar {
    menu: Node<HTMLElement>;

    links: Array<string>;

    icons: Array<string> | undefined;

    needsButton: boolean;

    navButton: Button | null;

    private materializeHandler: MaterializeHandler;

    constructor(parentNode: HTMLElement, links: Array<string>, needsButton: boolean, icons?: Array<string>) {
        this.materializeHandler = new MaterializeHandler();
        this.links = links;
        this.icons = icons;
        this.needsButton = needsButton;
        this.menu = new Node(parentNode, 'ul', 'right hide-on-med-and-down');
        this.navButton = null;
        const menuMobile = new Node(parentNode, 'a', 'sidenav-trigger');
        menuMobile.setAttribute('data-target', 'mobile-demo');
        menuMobile.setAttribute('href', '#');
        Node.setChild(menuMobile.node, 'i', 'material-icons', 'menu');
    }

    generateMenu(activeLink?: string | undefined, attributeName = Id.menu): void {
        this.menu.node.textContent = '';
        this.menu.setAttribute('id', attributeName);
        this.generateLinks(this.menu.node, this.needsButton, this.icons, activeLink);
        this.generateMobileMenu();
        this.materializeHandler.initSidenav();
    }

    generateLinks(
        parentNode: HTMLElement,
        needsButton: boolean,
        icons?: Array<string> | undefined,
        activeLink?: string | undefined
    ): void {
        this.links.forEach((link, index) => {
            const menuItem = new Node(parentNode, 'li');
            if (activeLink && link === activeLink) menuItem.node.classList.add('active');
            const menuLink = new Node(menuItem.node, 'a', 'sidenav-close');
            menuLink.setAttribute('href', `#/${link.toLowerCase()}`);
            if (icons) {
                Node.setChild(menuLink.node, 'i', `icon ${(this.icons as Array<string>)[index]}`);
            }
            menuLink.node.innerHTML += link;
        });
        if (needsButton) {
            this.navButton = new Button(this.menu.node);
        }
    }

    generateMobileMenu() {
        const header = document.querySelector('header');
        const mobileMenu = new Node(header, 'ul', 'sidenav');
        mobileMenu.setAttribute('id', Id.mobileMenu);
        this.generateLinks(mobileMenu.node, false, this.icons);
        if (this.needsButton) {
            const signUpBtn = Node.setChild(mobileMenu.node, 'a', 'waves-effect waves-light btn-large sidenav-close', 'Signup');
            signUpBtn.setAttribute('href', '#/register');
        }
    }

    addProfileLink(user: string, isActive?: boolean | undefined): void {
        const menuItem = new Node(this.menu.node, 'li');
        if (isActive) menuItem.node.classList.add('active');
        const menuLink = new Node(menuItem.node, 'a');
        menuLink.setAttribute('href', `#/profile`);
        const iconContainer = new Node(menuLink.node, 'div', 'icon-container');
        const profileIcon = new Node(iconContainer.node, 'span', 'profile');
        profileIcon.node.innerHTML = `${user}`;
        menuLink.node.innerHTML += 'Profile';
    }

    public get button() {
        return this.navButton;
    }
}
