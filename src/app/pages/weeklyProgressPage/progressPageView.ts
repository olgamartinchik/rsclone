import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import StatisticWeekWidget from '../../components/statWeekWidget/statisticWeekWidget';
import StatisticWorkoutWidget from '../../components/statWorkoutWidget/statisticWorkoutWidget';
import { TSettings, TWeekProgress } from '../../services/types';
import chartsManager from '../../services/chartsManager';
import chartOptions from '../../components/chartOptions/template';

class ProgressPageView {
    public readonly rootNode: HTMLElement;

    private statisticWorkoutWidget: StatisticWorkoutWidget;

    private mainBlock: Node<HTMLElement> | null;

    private statisticWeekWidget: StatisticWeekWidget;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.mainBlock = null;
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
        navbar.generateMenu();
        navbar.addProfileLink('O');
        this.createMainBlockLayout(settings, callbackClick);

        this.rootNode.append(footer.getTemplate());
    }

    private createMainBlockLayout(settings: TSettings, callbackClick: () => void) {
        this.mainBlock = new Node(this.rootNode, 'main', 'main-stat weekly-progress', '');
        const title = new Node(null, 'h2', 'title title-summary', 'Weekly Progress');
        const backBtn = new Node(title.node, 'button', 'button btn-back');
        backBtn.node.insertAdjacentHTML('afterbegin', '<i class="material-icons">arrow_back</i>');
        backBtn.node.onclick = () => callbackClick();
        this.mainBlock.append(title.node);
        const container = new Node(this.mainBlock.node, 'div', 'container-stat', '');

        const workoutStat = this.statisticWorkoutWidget.getWorkoutStat(
            settings.weekProgress.minutes,
            settings.weekProgress.calories
        );
        const weekStat = this.statisticWeekWidget.getTemplate(settings, false);
        this.mainBlock.node.insertAdjacentHTML('beforeend', workoutStat);
        container.node.append(weekStat);
        this.mainBlock.node.append(container.node);
    }

    public renderCharts(labels: string[], minutes: number[], calories: number[], weekProgress: TWeekProgress) {
        if (this.mainBlock) {
            chartsManager.resetCharts();
            const wrapper = new Node(this.mainBlock.node, 'div', 'charts-wrapper');
            const minutesChartWrapper = new Node(wrapper.node, 'div', 'chart-wrapper');
            const caloriesChartWrapper = new Node(wrapper.node, 'div', 'chart-wrapper');
            const optMinutes = new Node(minutesChartWrapper.node, 'div', 'options minutes-opt');
            const optCalories = new Node(caloriesChartWrapper.node, 'div', 'options calories-opt');
            optMinutes.node.insertAdjacentHTML(
                'afterbegin',
                chartOptions(weekProgress.minutes, 'min', 'Minutes', 'svg/icon-time-alarm.svg')
            );
            optCalories.node.insertAdjacentHTML(
                'afterbegin',
                chartOptions(weekProgress.calories, 'cals', 'Calories', 'svg/icon-cal-fire.svg')
            );

            const minutesChart = new Node(minutesChartWrapper.node, 'canvas', 'chart chart-minutes');
            const caloriesChart = new Node(caloriesChartWrapper.node, 'canvas', 'chart chart-calories');

            chartsManager.createChart(<HTMLCanvasElement>minutesChart.node, labels, minutes);
            chartsManager.createChart(<HTMLCanvasElement>caloriesChart.node, labels, calories);
        }
    }
}

export default ProgressPageView;
