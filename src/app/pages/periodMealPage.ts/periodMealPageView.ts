import { IDataExplore } from '../../services/types';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import storageManager from '../../services/storageManager';
import Node from '../../components/Node';

class PeriodMealPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render() {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());
        const user = <string>storageManager.getItem('user', 'local');
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('');
        navbar.addProfileLink(user);
        // this.rootNode.insertAdjacentHTML(
        //     'beforeend',
        //     `<main class="main-layout main-period"><span>This is PeriodMeal Page!</span></main>`
        // );
        this.createContentPeriod()
        this.rootNode.append(footer.getTemplate());
    }
    createContentPeriod(){
        const main = new Node(this.rootNode, 'main', 'main-layout main-period');
    }
}

export default PeriodMealPageView;