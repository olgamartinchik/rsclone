import { TSettings } from '../../services/types';
import Node from '../Node';
import statTemplate from './template';

class StatisticWeekWidget {
    public getTemplate(
        settings: TSettings,
        isExtendedFunctionality: boolean,
        callback: () => void = () => {}
    ): HTMLElement {
        const contentBlock = new Node(null, 'div', 'content-block z-depth-1');
        const titleBlock = new Node(contentBlock.node, 'div', 'title-block');
        titleBlock.node.insertAdjacentHTML('afterbegin', '<h3 class="title stat-title">weekly progress</h3>');
        if (isExtendedFunctionality) {
            const arrow = new Node(null, 'i', 'icon fa-solid fa-angle-right');
            titleBlock.node.append(arrow.node);
            titleBlock.node.onclick = () => callback();
        }
        contentBlock.node.insertAdjacentHTML(
            'beforeend',
            statTemplate(settings.weekProgress, settings.startDate, isExtendedFunctionality)
        );
        return contentBlock.node;
    }
}

export default StatisticWeekWidget;
