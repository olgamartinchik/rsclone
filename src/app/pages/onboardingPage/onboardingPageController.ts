import OnboardingPageView from './onboardingPageView';
import OnboardingModel from './onboardingPageModel';
import authManager from '../../services/authManager';
import { Height, Weight, Colors, Coefficients, Goal, Message, WorkoutType } from '../../services/constants';

class OnboardingPageController {
    private view: OnboardingPageView;

    private model: OnboardingModel;

    private isFeet: boolean;

    private isPounds: boolean;

    private blocks: Array<string>;

    private block: number;

    private birthday: string;

    constructor() {
        this.view = new OnboardingPageView();
        this.model = new OnboardingModel();
        this.isFeet = false;
        this.isPounds = false;
        this.blocks = [
            'About you',
            `What's your goal?`,
            'How many workouts per week do you want?',
            'Select all your favorite type of classes:',
            'How many weeks do you want to start with?',
        ];
        this.block = 0;
        this.birthday = '';
    }

    public createPage() {
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
        const age = this.model.calculateAge(calenderInput.value);
        this.model.changeHandler({ age: age });
    }

    private handleParametersSelect(e: Event): void {
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

        this.convertUnits(e);
    }

    private convertUnits(e: Event): void {
        const className = (<HTMLElement>e.target).className;
        const heightSlider = <HTMLInputElement>document.querySelectorAll('[data-height]')[2];
        const weightSlider = <HTMLInputElement>document.querySelectorAll('[data-weight]')[2];
        const desiredWeightSlider = <HTMLInputElement>document.querySelectorAll('[data-desiredweight]')[2];
        let unit = '';
        let value = '';
        if (className.includes('feet')) {
            this.isFeet = true;
            unit = 'ft';
            value = Math.round(+heightSlider.value * Coefficients.toFeet).toString();
        } else if (className.includes('centimeters')) {
            this.isFeet = false;
            unit = 'cm';
            value = heightSlider.value;
        } else if (className.includes('pounds') && weightSlider) {
            this.isPounds = true;
            unit = 'lbs';
            value = Math.round(+weightSlider.value * Coefficients.toPounds).toString();
        } else if (className.includes('kilograms') && weightSlider) {
            this.isPounds = false;
            unit = 'kg';
            value = desiredWeightSlider.value;
        } else if (className.includes('pounds') && desiredWeightSlider) {
            this.isPounds = true;
            unit = 'lbs';
            value = Math.round(+desiredWeightSlider.value * Coefficients.toPounds).toString();
        } else if (className.includes('kilograms') && desiredWeightSlider) {
            this.isPounds = false;
            unit = 'kg';
            value = desiredWeightSlider.value;
        }

        (<HTMLElement>e.currentTarget).children[1].children[1].textContent = unit;
        (<HTMLInputElement>(<HTMLElement>e.currentTarget).children[1].children[0]).value = value;
    }

    public handleInputChange(e: Event): void {
        const clickedElement = <HTMLInputElement>e.target;
        const heightSlider = <HTMLInputElement>document.querySelectorAll('[data-height]')[2];
        const weightSlider = <HTMLInputElement>document.querySelectorAll('[data-weight]')[2];
        const desiredWeightSlider = <HTMLInputElement>document.querySelectorAll('[data-desiredweight]')[2];
        if (+clickedElement.value < +clickedElement.min || +clickedElement.value > +clickedElement.max) {
            clickedElement.value = '0';
            this.createMessage(`Please enter the value between ${clickedElement.min} and ${clickedElement.max}`);
        } else {
            if ((<HTMLElement>e.target).dataset.value === 'height') {
                heightSlider.value = clickedElement.value;
                this.handleRangeSliderInput(e);
                this.colorRangeSlider(heightSlider, +clickedElement.min, +clickedElement.max);
            } else if ((<HTMLElement>e.target).dataset.value === 'weight') {
                weightSlider.value = clickedElement.value;
                this.handleRangeSliderInput(e);
                this.colorRangeSlider(weightSlider, +clickedElement.min, +clickedElement.max);
            } else if ((<HTMLElement>e.target).dataset.value === 'desiredWeight') {
                desiredWeightSlider.value = clickedElement.value;
                this.handleRangeSliderInput(e);
                this.colorRangeSlider(desiredWeightSlider, +clickedElement.min, +clickedElement.max);
            }
        }
    }

    public handleRangeSliderInput(e: Event): void {
        const parametersType = (<HTMLElement>e.currentTarget).id;
        const rangeSlider = <HTMLInputElement>e.target;
        let minValue = 0;
        let maxValue = 0;
        let coefficient = 0;
        let unit = false;

        if (parametersType === 'height') {
            minValue = +Height.min;
            maxValue = +Height.max;
            coefficient = Coefficients.toFeet;
            unit = this.isFeet;
        } else if (parametersType === 'weight' || parametersType === 'desiredWeight') {
            minValue = +Weight.min;
            maxValue = +Weight.max;
            coefficient = Coefficients.toPounds;
            unit = this.isPounds;
        }
        const valueGroup = (<HTMLElement>e.currentTarget).children[1] as HTMLElement;
        valueGroup.style.color = Colors.textOnLight;
        (<HTMLInputElement>valueGroup.children[0]).style.color = Colors.textOnLight;
        (<HTMLInputElement>valueGroup.children[0]).value = !unit
            ? rangeSlider.value
            : Math.round(+rangeSlider.value * coefficient).toString();

        this.model.changeHandler({ [parametersType]: +rangeSlider.value });
        this.colorRangeSlider(rangeSlider, minValue, maxValue);
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
        const weightSlider = <HTMLInputElement>document.querySelectorAll('[data-desiredweight]')[2];
        const input = <HTMLInputElement>document.querySelectorAll('[data-desiredweight]')[1];
        weightSlider.value = '40';
        input.value = '40';
        this.colorRangeSlider(weightSlider, +input.min, +input.max);
        this.model.changeHandler({ desiredWeight: +weightSlider.value });
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
