import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';

class RecipePageView{
    private rootNode: HTMLElement;
    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }
    render(){
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('Meal');
        navbar.addProfileLink('O');

        this.rootNode.insertAdjacentHTML(
            'beforeend',
            `<main class="main-layout"><span>This is Recipe Page!</span></main>`
        );
        this.rootNode.append(footer.getTemplate());
    }
    createContentExplore(){
        const main = new Node(this.rootNode, 'main', 'main-layout');
        Node.setChild(main.node, 'h1', 'title-meal', 'Recipe');
    }
}
export default RecipePageView