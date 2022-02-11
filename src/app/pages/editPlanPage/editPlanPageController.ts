import EditPlanPageView from './editPlanPageView';
import EditPlanPageModel from './editPlanPageModel';
import storageManager from '../../services/storageManager';
import authManager from '../../services/authManager';
import Utils from '../../services/utils';
import { TSettings, TWorkoutLength } from '../../services/types';
import { GoalTitles, MinWorkoutLength, MaxWorkoutLength, WorkoutType, Message } from '../../services/constants';
import UserDataManager from '../../services/userDataManager';

class EditPlanPageController {
    private view: EditPlanPageView;

    private userSettings: TSettings | void;

    private modifiedUserSettings: TSettings | void;

    private model: EditPlanPageModel;

    constructor() {
        this.view = new EditPlanPageView();
        this.model = new EditPlanPageModel();
        this.userSettings = this.getUserSettings();
        this.modifiedUserSettings = this.getModifiedUserSettings();
    }

    public createPage() {
        this.userSettings = this.getUserSettings();
        this.modifiedUserSettings = this.getModifiedUserSettings();
        this.view.render(this.userSettings, this.handleSettingsChoice.bind(this), this.handleSaveBtnClick.bind(this));
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
        const settingInputs = (<HTMLElement>e.currentTarget).querySelectorAll('input');
        const settingValueChosen = settingInput.value;
        const saveButton = <HTMLButtonElement>(<HTMLElement>settingBlock.parentElement).querySelector('button');
        const favWorkouts: Array<WorkoutType> = [];

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
            case 'desiredWeight':
                this.updateUserSettings(settingsType, +settingValueChosen);
                this.handleSaveButtonStatus(saveButton);
                break;
            case 'workoutLength':
                this.formWorkoutLengthValue(+settingValueChosen.split(' ')[0]);
                this.handleSaveButtonStatus(saveButton);
                break;
            case 'favWorkouts':
                settingInputs.forEach((input) => {
                    if (input.checked) favWorkouts.push(<WorkoutType>input.id.toUpperCase());
                });
                this.updateUserSettings(settingsType, favWorkouts);
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

    private updateUserSettings(key: string, value: string | number | TWorkoutLength | Array<WorkoutType>): void {
        switch (key) {
            case 'goal':
                this.modifiedUserSettings[key] = Utils.getKeyByValue(GoalTitles, value);
                break;
            case 'duration':
            case 'workoutsNumber':
            case 'workoutLength':
            case 'favWorkouts':
            case 'desiredWeight':
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

    private createMessage(text: string) {
        if (text) {
            window.M.toast({ html: `${text}` });
        }
    }

    private handleSaveBtnClick(): void {
        if (
            (<TSettings>this.modifiedUserSettings).goal === 'weight' &&
            (<TSettings>this.modifiedUserSettings).desiredWeight === 0
        ) {
            this.createMessage(Message.desiredWeightmissing);
        } else if (
            (<TSettings>this.modifiedUserSettings).goal === 'weight' &&
            (<TSettings>this.modifiedUserSettings).desiredWeight >= (<TSettings>this.modifiedUserSettings).weight
        ) {
            this.createMessage(Message.invalidWeightValue);
            const input = <HTMLInputElement>document.querySelector('.editplan-input');
            input.value = '0';
        } else {
            this.model.saveSettings(this.modifiedUserSettings);

            new UserDataManager(this.modifiedUserSettings!).createUserData();
            authManager.navigate('/settings');
        }
    }
}

export default EditPlanPageController;
