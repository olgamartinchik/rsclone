import EditPlanPageView from './editPlanPageView';
import storageManager from '../../services/storageManager';
import Utils from '../../services/utils';
import { TSettings } from '../../services/types';
import { GoalTitles } from '../../services/constants';

class EditPlanPageController {
    private view: EditPlanPageView;

    private userSettings: TSettings | void;
    
    private modifiedUserSettings: TSettings | void;

    constructor() {
        this.view = new EditPlanPageView();
        this.userSettings = this.getUserSettings();
        this.modifiedUserSettings = this.getModifiedUserSettings();
    }

    public createPage() {
        this.view.render(this.userSettings, this.handleSettingsChoice.bind(this)); 
    }

    private getUserSettings(): TSettings | void {
        return storageManager.getItem('userSettings', 'local');
    }

    private getModifiedUserSettings(): TSettings | void {
        return Object.assign({}, this.userSettings);
    }

    private handleSettingsChoice(e: Event): void {
        const settingBlock = <HTMLElement>e.currentTarget;
        const settingsWrapper = <HTMLElement>settingBlock.parentElement;
        const settingsType = <string>settingBlock.dataset.type;
        const settingInput = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('input');
        const settingValueChosen = settingInput.value;
        const saveButton = <HTMLButtonElement>(<HTMLElement>settingBlock.parentElement).querySelector('button');
        const enumID = this.userSettings[settingsType];
        
        switch(settingsType) {
            case 'goal':
                this.updateUserSettings(settingsType, settingValueChosen);
                this.handleSaveButtonStatus(GoalTitles[enumID], settingValueChosen, saveButton);
                this.toggleDesiredWeightBlock(settingValueChosen, settingsWrapper); 
                break;
            case 'duration':
            case 'workoutsNumber':
                this.updateUserSettings(settingsType, +settingValueChosen);
                this.handleSaveButtonStatus(this.userSettings[settingsType].toString(), settingValueChosen, saveButton);
                break;
        }
    }

    private updateUserSettings(key: string, value: string | number): void {
        if (key === 'goal') {
            this.modifiedUserSettings[key] = Utils.getKeyByValue(GoalTitles, value);
        } else {
            this.modifiedUserSettings[key] = value;
        }
    }

    private handleSaveButtonStatus(settingValue: string, settingValueChosen: string, saveButton: HTMLButtonElement): void {
        const haveSettingsChanged = !Utils.compareObjects(this.userSettings, this.modifiedUserSettings);

        if (settingValueChosen !== settingValue || haveSettingsChanged) {
            saveButton.classList.remove('btn-disabled');
            saveButton.removeAttribute('disabled');
        } else {
            saveButton.className = 'waves-effect waves-light btn-large btn-disabled';
            if (!saveButton.disabled) saveButton.setAttribute('disabled', 'disabled');
        }
    }

    private toggleDesiredWeightBlock(settingValueChosen: string, settingsWrapper: HTMLElement): void {
        if(settingValueChosen === 'Lose weight') {
            settingsWrapper.children[1].classList.remove('hidden');
        } else {
            settingsWrapper.children[1].classList.add('hidden');
        }
    }
}

export default EditPlanPageController;
