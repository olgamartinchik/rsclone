import Node from '../Node';
import Button from '../Button';
import { Id } from '../../services/constants';
import { TToken } from '../../services/types';
import storageManager from '../../services/storageManager';
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

    generateMenu(isLogin: boolean, activeLink?: string | undefined, attributeName = Id.menu): void {
        this.menu.node.textContent = '';
        this.menu.setAttribute('id', attributeName);
        this.generateLinks(this.menu.node, this.needsButton, this.icons, activeLink);
        this.generateMobileMenu(isLogin, activeLink);
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

    generateMobileMenu(isLogin: boolean, activeLink?: string | undefined) {
        const header = document.querySelector('header');
        const mobileMenu = new Node(header, 'ul', 'sidenav');
        mobileMenu.setAttribute('id', Id.mobileMenu);
        this.generateLinks(mobileMenu.node, false, this.icons, activeLink);
        if (isLogin) this.addMobileProfileLink(mobileMenu.node, activeLink);
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
        
        this.generateProfileIcon(menuLink.node, user);

        menuLink.node.innerHTML += 'Profile';
    }

    generateProfileIcon(parentNode: HTMLElement, user: string): void {
        const avatar = (<TToken>storageManager.getItem('token', 'local')).avatar;
        const userId = (<TToken>storageManager.getItem('token', 'local')).userID;
        
        const iconContainer = new Node(parentNode, 'div', 'icon-container');
        const profileIcon = new Node(iconContainer.node, 'span', 'profile');
        
        if (avatar) {
            profileIcon.node.style.backgroundImage = `url(https://rsclonebackend.herokuapp.com/api/avatar/${userId})`;
        } else {
            profileIcon.node.innerHTML = `${user}`;
        }
    }

    addMobileProfileLink(parentNode: HTMLElement, activeLink?: string | undefined): void {
        const menuItem = new Node(parentNode, 'li');
        if (activeLink && activeLink === 'Profile') menuItem.node.classList.add('active');
        
        const menuLink = new Node(menuItem.node, 'a', 'sidenav-close', 'Profile');
        menuLink.setAttribute('href', `#/profile`);
        Node.setChild(menuLink.node, 'i', `icon user`);
    }

    public get button() {
        return this.navButton;
    }
}
