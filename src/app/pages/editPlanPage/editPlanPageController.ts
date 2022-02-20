import EditPlanPageView from './editPlanPageView';
import EditPlanPageModel from './editPlanPageModel';
import storageManager from '../../services/storageManager';
import authManager from '../../services/authManager';
import Utils from '../../services/utils';
import { TSettings } from '../../services/types';
import { GoalTitles, WorkoutType, Message, Weight, Coefficients } from '../../services/constants';
import UserDataManager from '../../services/userDataManager';
import StorageManager from '../../services/storageManager';

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
                this.updateDesiredWeight(settingsType, settingValueChosen, settingInput);
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

    private updateUserSettings(key: string, value: string | number | Array<WorkoutType>): void {
        switch (key) {
            case 'goal':
                this.modifiedUserSettings[key] = Utils.getKeyByValue(GoalTitles, value);
                this.checkGoal(<string>Utils.getKeyByValue(GoalTitles, value));
                break;
            case 'duration':
            case 'workoutsNumber':
            case 'workoutLength':
            case 'favWorkouts':
                this.modifiedUserSettings[key] = value;
                break;
        }
    }

    private checkGoal(goal: string) {
        if (goal !== 'weight') {
            this.modifiedUserSettings!.desiredWeight = 0;
        }
    }

    private updateDesiredWeight(key: string, value: string, input: HTMLInputElement): void {
        const settings = this.getUserSettings();
        const unitIsDefault = (<TSettings>settings).weightUnit === Weight.units;

        if(unitIsDefault) {
            this.checkEnteredValue(input, value);
        } else {
            const valueConverted = this.convertWeight('lbs', parseInt(value));
            this.checkEnteredValue(input, valueConverted.toString());
        }
    }

    private checkEnteredValue(input: HTMLInputElement, value: string): void {
        const settings = this.getUserSettings();
        let valueChosen = parseInt(value);
        if (valueChosen < parseInt(Weight.min) || valueChosen >= settings!.weight) {
            input.value = '';
            input.placeholder = '0';
            this.formMessage();
        } else {
            this.modifiedUserSettings!.desiredWeight = parseInt(value);
        }
    }

    private convertWeight(unit: string, valueChosen: number): number {
        let value = valueChosen;
        if (unit === 'kg') {
            value *= Coefficients.toPounds; 
        } else {
            value *= Coefficients.toKilograms;
        }
        return value;
    }

    private formMessage(): void {
        const settings = <TSettings>this.getUserSettings();
        const unitIsDefault = (<TSettings>settings).weightUnit === Weight.units;
        if (unitIsDefault) {
            this.createMessage(
                `Please enter the value between ${Weight.min} and ${settings!.weight}`
            );
        } else {
            this.createMessage(
                `Please enter the value between ${Weight.min2} and ${Math.round(settings!.weight * Coefficients.toPounds)}`
            );
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
            input.value = '';
            input.placeholder = '0';
        } else {
            this.model.saveSettings(this.modifiedUserSettings);

            const userAction = 'editProfile';
            StorageManager.addItem('userAction', userAction, 'local');

            new UserDataManager(this.modifiedUserSettings!).createUserData(userAction);
            authManager.navigate('/settings');
        }
    }
}

export default EditPlanPageController;
