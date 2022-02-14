import SettingsPageView from './settingsPageView';
import SettingsPageModel from './settingsPageModel';
import authManager from '../../services/authManager';
import authModel from '../authPage/authPageModel';
import onboardingModel from '../onboardingPage/onboardingPageModel';
import { TSettings } from '../../services/types';

class SettingsPageController {
    private view: SettingsPageView;
    
    private model: SettingsPageModel;
    
    private settings: void | TSettings;
    
    private modifiedUserSettings: void | TSettings;

    constructor() {
        this.view = new SettingsPageView();
        this.model = new SettingsPageModel();
        this.settings = this.model.getData();
        this.modifiedUserSettings = this.getModifiedUserSettings();
    }

    public createPage() {
        this.settings = this.model.getData();
        this.view.render(<TSettings>this.settings, this.handleClick.bind(this), this.handleButtonClick.bind(this));
    }

    private getModifiedUserSettings(): TSettings | void {
        return Object.assign({}, this.settings);
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
        this.updateUserSettings(e);
        this.model.saveSettings(this.modifiedUserSettings);
    }

    private updateUserSettings(e: Event): void {
        const chosenUnit = <HTMLElement>e.target;
        const chosenUnitType = <string>chosenUnit.dataset.title;
        const chosenUnitValue = <string>chosenUnit.dataset.value;
        this.modifiedUserSettings[chosenUnitType] = chosenUnitValue;
    }

    private navigate(e: Event): void {
        const settingsBlock = <HTMLElement>(<HTMLElement>e.target).parentElement;
        const settingsTitle = <string>settingsBlock.children[0].textContent;
        authManager.navigate(`#/${settingsTitle.toLowerCase().split(' ').join('')}`);
    }

    private handleButtonClick(): void {
        localStorage.clear();
        authModel.destroyData();
        onboardingModel.resetData();
        authManager.navigate('/');
    }
}

export default SettingsPageController;
