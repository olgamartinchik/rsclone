import EditPlanPageView from './editPlanPageView';
import storageManager from '../../services/storageManager';
import Utils from '../../services/utils';
import { TSettings, TWorkoutLength } from '../../services/types';
import { GoalTitles, MinWorkoutLength, MaxWorkoutLength } from '../../services/constants';

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

        switch (settingsType) {
            case 'goal':
                this.updateUserSettings(settingsType, settingValueChosen);
                this.handleSaveButtonStatus(saveButton);
                this.toggleDesiredWeightBlock(settingValueChosen, settingsWrapper);
                break;
            case 'duration':
            case 'workoutsNumber':
                this.updateUserSettings(settingsType, +settingValueChosen);
                this.handleSaveButtonStatus(saveButton);
                break;
            case 'workoutLength':
                this.formWorkoutLengthValue(+settingValueChosen.split(' ')[0]);
                this.handleSaveButtonStatus(saveButton);
                break;
        }
    }

    private formWorkoutLengthValue(min: number): void {
        switch (min) {
            case MinWorkoutLength.small:
                this.updateUserSettings('workoutLength', { min: MinWorkoutLength.small, max: MaxWorkoutLength.small });
                break;
            case MinWorkoutLength.medium:
                this.updateUserSettings('workoutLength', {
                    min: MinWorkoutLength.medium,
                    max: MaxWorkoutLength.medium,
                });
                break;
            case MinWorkoutLength.large:
                this.updateUserSettings('workoutLength', { min: MinWorkoutLength.large, max: MaxWorkoutLength.large });
                break;
            case MinWorkoutLength.huge:
                this.updateUserSettings('workoutLength', { min: MinWorkoutLength.huge });
                break;
        }
    }

    private updateUserSettings(key: string, value: string | number | TWorkoutLength): void {
        switch (key) {
            case 'goal':
                this.modifiedUserSettings[key] = Utils.getKeyByValue(GoalTitles, value);
                break;
            case 'duration':
            case 'workoutsNumber':
            case 'workoutLength':
                this.modifiedUserSettings[key] = value;
                break;
        }
    }

    private handleSaveButtonStatus(saveButton: HTMLButtonElement): void {
        const haveSettingsChanged = !Utils.compareObjects(this.userSettings, this.modifiedUserSettings);

        if (haveSettingsChanged) {
            saveButton.classList.remove('btn-disabled');
            saveButton.removeAttribute('disabled');
        } else {
            saveButton.className = 'waves-effect waves-light btn-large btn-disabled';
            if (!saveButton.disabled) saveButton.setAttribute('disabled', 'disabled');
        }
    }

    private toggleDesiredWeightBlock(settingValueChosen: string, settingsWrapper: HTMLElement): void {
        if (settingValueChosen === 'Lose weight') {
            settingsWrapper.children[1].classList.remove('hidden');
        } else {
            settingsWrapper.children[1].classList.add('hidden');
        }
    }
}

export default EditPlanPageController;
