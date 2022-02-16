import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import StatisticWeekWidget from '../../components/statWeekWidget/statisticWeekWidget';
import StatisticWorkoutWidget from '../../components/statWorkoutWidget/statisticWorkoutWidget';
import { TSettings } from '../../services/types';

class StatisticPageView {
    public readonly rootNode: HTMLElement;

    private statisticWorkoutWidget: StatisticWorkoutWidget;

    private statisticWeekWidget: StatisticWeekWidget;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.statisticWorkoutWidget = new StatisticWorkoutWidget();
        this.statisticWeekWidget = new StatisticWeekWidget();
    }

    render(settings: TSettings, callbackClick: () => void): void {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu(true);
        navbar.addProfileLink('O');
        this.createMainBlockLayout(settings, callbackClick);

        this.rootNode.append(footer.getTemplate());
    }

    private createMainBlockLayout(settings: TSettings, callbackClick: () => void) {
        const mainBlock = new Node(this.rootNode, 'main', 'main-stat', '');
        mainBlock.append(new Node(null, 'h2', 'title title-summary', 'Summary').node);
        const container = new Node(mainBlock.node, 'div', 'container-stat', '');

        const workoutStat = this.statisticWorkoutWidget.getWorkoutStat(
            settings.weekProgress.minutes,
            settings.weekProgress.calories
        );
        const weekStat = this.statisticWeekWidget.getTemplate(settings.weekProgress, settings.startDate, false);
        const btn = new Node(null, 'button', 'next-btn waves-effect waves-light btn-large', 'next');
        btn.node.onclick = () => callbackClick();

        mainBlock.node.insertAdjacentHTML('beforeend', workoutStat);
        container.node.append(weekStat);
        container.node.append(btn.node);

        mainBlock.node.append(container.node);
    }
}

export default StatisticPageView;
