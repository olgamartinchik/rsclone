import OnboardingPageView from './onboardingPageView';
import onboardingModel, { OnboardingModel } from './onboardingPageModel';
import authManager from '../../services/authManager';
import storageManager from '../../services/storageManager';
import { Height, Weight, Colors, Coefficients, Goal, Message, WorkoutType } from '../../services/constants';
import { TToken, TParameter } from '../../services/types';

class OnboardingPageController {
    private view: OnboardingPageView;

    private model: OnboardingModel;

    private blocks: Array<string>;

    private block: number;

    private birthday: string;
    
    private parameter: TParameter;
    private heightUnit: string;
    private weightUnit: string;
    private desiredWeightUnit: string;

    constructor() {
        this.view = new OnboardingPageView();
        this.model = onboardingModel;
        this.blocks = [
            'About you',
            `What's your goal?`,
            'How many workouts per week do you want?',
            'Select all your favorite type of classes:',
            'How many weeks do you want to start with?',
        ];
        this.block = 0;
        this.birthday = '';
        this.heightUnit = 'cm';
        this.weightUnit = 'kg';
        this.desiredWeightUnit = 'kg';
        this.parameter = {
            minValue: 0,
            maxValue: 0,
            minValueDefault: 0,
            maxValueDefault: 0,
            coefficient: 0,
            unit: '',
            value: '',
        }
    }

    public createPage() {
        const token = <TToken>storageManager.getItem('token', 'local');
        if (!token) {
            authManager.navigate('/');
            return;
        }

        this.birthday = this.model.dateOfBirth;
        this.view.render(
            this.blocks[this.block],
            this.model.settings,
            this.birthday,
            this.handleValueSelect.bind(this),
            this.handleRangeSliderInput.bind(this),
            this.handleInputChange.bind(this),
            this.handleButtonClick.bind(this),
            this.handleBackBtnClick.bind(this)
        );
    }

    public handleValueSelect(e: Event): void {
        const clickedElement = <HTMLElement>e.target;
        const className = clickedElement.className;

        if (typeof className === 'object') return;

        if (className.includes('gender-item') || className.includes('frequency') || className.includes('duration')) {
            this.handleOptionSelect(e);
        } else if (className.includes('datepicker-done')) {
            this.handleDayBirthSelect(e);
        } else if (className.includes('icon-select') || className.includes('value-select')) {
            this.handleParametersSelect(e);
        } else if (className.includes('unit')) {
            this.handleUnitSelect(e);
        } else if (className.includes('goal')) {
            this.handleGoalSelect(e);
        } else if (className.includes('classes')) {
            this.handleClassesSelect(e);
        }
    }

    private handleOptionSelect(e: Event): void {
        this.selectValue(e);
        this.registerSelectedValue(e);
    }

    private handleDayBirthSelect(e: Event): void {
        const currentTarget = <HTMLElement>e.currentTarget;
        const calenderInput = <HTMLInputElement>currentTarget.children.namedItem('datepicker');
        this.birthday = calenderInput.value;
        storageManager.addItem('birthday', this.birthday, 'local');
        const age = this.model.calculateAge(calenderInput.value);
        this.model.changeHandler({ age: age });
    }

    private handleParametersSelect(e: Event): void {
        const slider = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('#play-bar');
        const selectBlocks = document.querySelectorAll('.select-block');
        const select = (<HTMLElement>e.currentTarget).children[2];

        selectBlocks.forEach((block) => {
            const tickIcon = (<HTMLElement>block.parentElement).querySelector('.icon-select') as HTMLElement;
            if (block.id !== select.id) {
                block.className = 'select-block';
                tickIcon.className = 'icon-select down';
            }
        });
        this.activateParametersBlock(e);
        this.setParameterCharacteristics(e);
        this.colorRangeSlider(slider, this.parameter.minValueDefault, this.parameter.maxValueDefault);
    }

    private activateParametersBlock(e: Event): void {
        const clickedElement = <HTMLElement>e.target;
        const select = (<HTMLElement>e.currentTarget).children[2];
        if (clickedElement.className.includes('icon-select')) {
            select.classList.toggle('active');
            clickedElement.classList.toggle('down');
            clickedElement.classList.toggle('up');
        } else {
            select.classList.add('active');
            const arrowIcon = <HTMLElement>(<HTMLElement>clickedElement.nextElementSibling).nextElementSibling;
            arrowIcon.classList.remove('down');
            arrowIcon.classList.add('up');
        }
    }

    private handleUnitSelect(e: Event): void {
        const nextElement = (<HTMLElement>e.target).nextElementSibling as HTMLElement;
        const previousElement = (<HTMLElement>e.target).previousElementSibling as HTMLElement;
        
        if (nextElement) nextElement.classList.remove('active');
        if (previousElement) previousElement.classList.remove('active');
        (<HTMLElement>e.target).classList.add('active');
        this.setCurrentUnit(e);
        this.setParameterCharacteristics(e);
        this.convertUnits(e);
    }

    private setCurrentUnit(e: Event): void {
        const unitType = <string>(<HTMLElement>e.target).dataset.title;
        const unit = <string>(<HTMLElement>e.target).dataset.value;
        
        if (unitType === 'heightUnit') {
            this.heightUnit = unit;
            this.parameter.unit = unit;
        } else if (unitType === 'weightUnit') {
            this.weightUnit = unit;
            this.parameter.unit = unit;
        } else if (unitType === 'desiredWeightUnit') {
            this.desiredWeightUnit = unit;
            this.parameter.unit = unit;
        }
    }

    private setParameterCharacteristics(e: Event): void {
        const parameterType = <string>(<HTMLElement>e.target).dataset.title;
        
        if (parameterType === 'heightUnit' && this.heightUnit === Height.units) {
            this.parameter.minValue = +Height.min;
            this.parameter.maxValue = +Height.max;
            this.parameter.minValueDefault = +Height.min;
            this.parameter.maxValueDefault = +Height.max;
            this.parameter.coefficient = Coefficients.toFeet;
            this.parameter.unit = Height.units;
        } else if (parameterType === 'heightUnit' && this.heightUnit === Height.units2) {
            this.parameter.minValue = +Height.min2;
            this.parameter.maxValue = +Height.max2;
            this.parameter.minValueDefault = +Height.min;
            this.parameter.maxValueDefault = +Height.max;
            this.parameter.coefficient = Coefficients.toCentimeters;
            this.parameter.unit = Height.units2;
        } else if (parameterType === 'weightUnit' && this.weightUnit === Weight.units) {
            this.parameter.minValue = +Weight.min;
            this.parameter.maxValue = +Weight.max;
            this.parameter.minValueDefault = +Weight.min;
            this.parameter.maxValueDefault = +Weight.max;
            this.parameter.coefficient = Coefficients.toPounds;
            this.parameter.unit = Weight.units;
        } else if (parameterType === 'weightUnit' && this.weightUnit === Weight.units2) {
            this.parameter.minValue = +Weight.min2;
            this.parameter.maxValue = +Weight.max2;
            this.parameter.minValueDefault = +Weight.min;
            this.parameter.maxValueDefault = +Weight.max;
            this.parameter.coefficient = Coefficients.toKilograms;
            this.parameter.unit = Weight.units2;
        } else if (parameterType === 'desiredWeightUnit' && this.desiredWeightUnit === Weight.units) {
            this.parameter.minValue = +Weight.min;
            this.parameter.maxValue = +Weight.max;
            this.parameter.minValueDefault = +Weight.min;
            this.parameter.maxValueDefault = +Weight.max;
            this.parameter.coefficient = Coefficients.toPounds;
            this.parameter.unit = Weight.units;
        } else if (parameterType === 'desiredWeightUnit' && this.desiredWeightUnit === Weight.units2) {
            this.parameter.minValue = +Weight.min2;
            this.parameter.maxValue = +Weight.max2;
            this.parameter.minValueDefault = +Weight.min;
            this.parameter.maxValueDefault = +Weight.max;
            this.parameter.coefficient = Coefficients.toKilograms;
            this.parameter.unit = Weight.units2;
        }
        if (!this.parameter.value) this.parameter.value = this.parameter.minValue.toString();
    }

    private convertUnits(e: Event): void {
        const valueInput = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('.value-select');
        const unitValue = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('.value>span');
        const slider = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('#play-bar');
        const inputGroup = (<HTMLElement>(<HTMLInputElement>e.target).closest('.input-group'));
        const parametersType = inputGroup.id;
        
        this.getConvertedValues(slider);

        unitValue.textContent = this.parameter.unit;
        valueInput.value = this.parameter.value;
        
        this.model.saveConvertedValues({ [parametersType]: parseInt(this.parameter.value) });
        this.registerSelectedValue(e);
    }

    public getConvertedValues(slider: HTMLInputElement): void {
        
        if (this.parameter.unit === Height.units || this.parameter.unit === Weight.units) {
            this.parameter.value = slider.value;
        } else {
            this.parameter.value = (Math.round(+slider.value / this.parameter.coefficient)).toString();
        }
    }

    public handleInputChange(e: Event): void {
        const parametersType = (<HTMLElement>e.currentTarget).id;
        const clickedElement = <HTMLInputElement>e.target;
        const valueGroup = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('.value');
        const slider = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('#play-bar');
        
        if (clickedElement !== slider) {
            if (this.parameter.unit === Height.units || this.parameter.unit === Weight.units) {
                slider.value = clickedElement.value;
            } else {
                slider.value = (Math.round(+clickedElement.value * this.parameter.coefficient)).toString();
            }
            this.parameter.value = clickedElement.value;
        } else {
            this.getConvertedValues(slider);
        }

        if (parseInt(this.parameter.value) < this.parameter.minValue || parseInt(this.parameter.value) > this.parameter.maxValue) {
            clickedElement.value = this.parameter.minValue.toString();
            this.createMessage(`Please enter the value between ${this.parameter.minValue} and ${this.parameter.maxValue}`);
        } else {
            this.activateSelectedValues(valueGroup, clickedElement);
            this.colorRangeSlider(slider, this.parameter.minValueDefault, this.parameter.maxValueDefault);
            this.model.changeHandler({ [parametersType]: parseInt(slider.value) });
        }
    }

    private activateSelectedValues(valueGroup: HTMLElement, element: HTMLInputElement): void {
        valueGroup.style.color = Colors.textOnLight;
        element.style.color = Colors.textOnLight;
    }

    public handleRangeSliderInput(e: Event): void {
        const inputGroup = (<HTMLElement>(<HTMLInputElement>e.target).closest('.input-group'));
        const parametersType = inputGroup.id;
        const slider = <HTMLInputElement>e.target;
        const valueInput = <HTMLInputElement>inputGroup.querySelector('.value-select');
        const valueGroup = <HTMLElement>inputGroup.querySelector('.value');

        this.model.saveConvertedValues({ [parametersType]: parseInt(this.parameter.value) });
        this.getConvertedValues(slider);
        valueInput.value = this.parameter.value;
        this.colorRangeSlider(slider, this.parameter.minValueDefault, this.parameter.maxValueDefault);
        this.activateSelectedValues(valueGroup, valueInput);
        this.model.changeHandler({ [parametersType]: parseInt(slider.value) });
    }

    private colorRangeSlider(slider: HTMLInputElement, min: number, max: number): void {

        const percent = ((+slider.value - min) / (max - min)) * Coefficients.percent;
        slider.style.backgroundImage = `linear-gradient(to right, ${Colors.primary} 0%, ${Colors.primary} ${percent}%, ${Colors.secondary} ${percent}%, ${Colors.secondary} 100%)`;
    }

    private handleGoalSelect(e: Event): void {
        this.selectValue(e);

        const weightChoiceBlock = <HTMLElement>document.querySelector('.input-group');
        const selectBlock = <HTMLElement>document.querySelector('.select-block');

        if ((<HTMLElement>e.target).dataset.value === Goal.weight) {
            weightChoiceBlock.classList.remove('hidden');
            selectBlock.classList.add('active');
        } else {
            weightChoiceBlock.classList.add('hidden');
            selectBlock.classList.remove('active');
        }

        this.registerSelectedValue(e);
    }

    public handleClassesSelect(e: Event): void {
        const clickedElement = <HTMLElement>e.target;
        clickedElement.classList.toggle('active');

        if (!clickedElement.className.includes('active')) {
            const index = this.model.settings.favWorkouts.indexOf(clickedElement.textContent as WorkoutType);
            this.model.settings.favWorkouts.splice(index, 1);
        } else {
            this.model.settings.favWorkouts.push(clickedElement.textContent as WorkoutType);
        }
    }

    private registerSelectedValue(e: Event): void {
        const key = <string>(<HTMLElement>e.target).dataset.title;
        const value = <string>(<HTMLElement>e.target).dataset.value;
        
        this.model.changeHandler({ [key]: value });
    }

    private selectValue(e: Event): void {
        Array.from(<HTMLCollection>(<HTMLElement>e.currentTarget).children).forEach((element) => {
            element.classList.remove('active');
        });
        (<HTMLElement>e.target).classList.add('active');
    }

    private updateDesiredWeight(): void {
        const slider = <HTMLInputElement>document.querySelector('#play-bar');
        const input = <HTMLInputElement>document.querySelector('.value-select');
        const unitValue = <HTMLInputElement>document.querySelector('.value');

        slider.value = this.parameter.minValueDefault.toString();
        input.value = '';
        input.placeholder = this.parameter.minValue.toString();
        unitValue.style.color = Colors.secondary;
        this.colorRangeSlider(slider, this.parameter.minValueDefault, this.parameter.maxValueDefault);
        this.model.changeHandler({ desiredWeight: 0 });
        this.createMessage(Message.invalidWeightValue);
    }

    public handleButtonClick(e: Event): void {
        e.preventDefault();

        if (this.blocks[this.block] === 'About you') {
            if (this.model.settings.height === 0 || this.model.settings.weight === 0 || this.birthday === '') {
                this.createMessage(Message.valueMissing);
                return;
            }
        }

        if (this.blocks[this.block] === `What's your goal?`) {
            if (this.model.settings.desiredWeight >= this.model.settings.weight) {
                this.updateDesiredWeight();
                return;
            } else if (this.model.settings.goal === Goal.weight && this.model.settings.desiredWeight === 0) {
                this.createMessage(Message.valueMissing);
                return;
            }
        }

        if (this.blocks[this.block] === 'Select all your favorite type of classes:') {
            if (this.model.settings.favWorkouts.length === 0) {
                this.createMessage(Message.valueMissing);
                return;
            }
        }

        if (this.block < this.blocks.length - 1) {
            this.block++;
            this.createPage();
        } else {
            this.block = 0;
            this.model.saveSettings();
            const programDuration = this.model.settings.duration;
            this.view.renderCongratulations(programDuration, this.handleFinalButtonClick.bind(this));
        }
    }

    private handleBackBtnClick(e: Event): void {
        e.preventDefault();
        this.block--;
        this.createPage();
    }

    private createMessage(text: string) {
        if (text) {
            window.M.toast({ html: `${text}` });
        }
    }

    public handleFinalButtonClick(e: Event): void {
        if ((<HTMLElement>e.target).dataset.btn === 'start') {
            authManager.navigate('/program');
        }
    }
}

export default OnboardingPageController;
