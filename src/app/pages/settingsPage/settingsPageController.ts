import SettingsPageView from './settingsPageView';
import router from '../../router/router';

class SettingsPageController {
    private view: SettingsPageView;

    constructor() {
        this.view = new SettingsPageView();
    }

    public createPage() {
        this.view.render(this.handleClick.bind(this));
    }

    private handleClick(e: Event): void {
        const clickedElement = <HTMLElement>e.target;
        const className = clickedElement.className;

        if (typeof className === 'object') return;

        if (className.includes('unit-item')) {
            this.handleUnitSelect(e);
        } else if (className.includes('arrow-right')) {
            this.navigate(e);
        }
    }

    private handleUnitSelect(e: Event): void {
        const nextElement = (<HTMLElement>e.target).nextElementSibling as HTMLElement;
        const previousElement = (<HTMLElement>e.target).previousElementSibling as HTMLElement;
        if (nextElement) nextElement.classList.remove('active');
        if (previousElement) previousElement.classList.remove('active');
        (<HTMLElement>e.target).classList.add('active');
    }

    private navigate(e: Event): void {
        const settingsBlock = <HTMLElement>(<HTMLElement>e.target).parentElement;
        const settingsTitle = <string>settingsBlock.children[0].textContent;
        console.log(settingsTitle); 
        router.navigate(`#/${settingsTitle.toLowerCase().split(' ').join('')}`)
    }
}

export default SettingsPageController;
