import Footer from '../../components/footer/footer';
import Gender from '../../components/gender/gender';
import Calender from '../../components/calender/calender';
import Parameters from '../../components/parameters/parameters';
import Congrats from '../../components/congratulations/congrats';
import Node from '../../components/Node';
import Button from '../../components/Button';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import { TSettings } from '../../services/types';
import {
    Height,
    Weight,
    GoalTitles,
    WorkoutsNumber,
    WorkoutType,
    WorkoutsProgramDuration,
    Colors,
} from '../../services/constants';
import onboardingModel, { OnboardingModel } from './onboardingPageModel';

class OnboardingPageView {
    private materializeHandler: MaterializeHandler;

    private rootNode: HTMLElement;
    
    private model: OnboardingModel;

    constructor() {
        this.model = onboardingModel;
        this.materializeHandler = new MaterializeHandler();
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(
        block: string,
        settings: TSettings,
        birthday: string,
        onselect: (e: Event) => void,
        oninput: (e: Event) => void,
        onchange: (e: Event) => void,
        onclick: (e: Event) => void,
        onBackClick: (e: Event) => void
    ): void {
        this.rootNode.textContent = '';

        const header = new Node(this.rootNode, 'div', 'registration-header');
        Node.setChild(header.node, 'h2', 'title title-tablet registration-title', block);

        const content = Node.setChild(this.rootNode, 'div', 'registration-content');
        const form = Node.setChild(content, 'form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'post');

        this.renderForm(block, form, settings, birthday, onselect, oninput, onchange, onclick, onBackClick);

        this.rootNode.append(Footer.getTemplate());
    }

    public renderForm(
        block: string,
        form: HTMLElement,
        settings: TSettings,
        birthday: string,
        onselect: (e: Event) => void,
        oninput: (e: Event) => void,
        onchange: (e: Event) => void,
        onclick: (e: Event) => void,
        onBackClick: (e: Event) => void
    ): void {
        form.textContent = '';

        switch (block) {
            case 'About you':
                this.renderAboutBlock(form, settings, birthday, onselect, oninput, onchange);
                break;
            case `What's your goal?`:
                this.renderGoalsBlock(form, settings, onselect, oninput, onchange);
                break;
            case 'How many workouts per week do you want?':
                this.renderFrequencyBlock(form, settings, onselect);
                break;
            case 'Select all your favorite type of classes:':
                this.renderClassesBlock(form, settings, onselect);
                break;
            case 'How many weeks do you want to start with?':
                this.renderDurationBlock(form, settings, onselect);
                break;
        }

        const btnWrapper = Node.setChild(form, 'div', 'btn-wrapper');
        if (block !== 'About you') {
            const backBtn = new Button(btnWrapper, 'Back');
            backBtn.onclick(onBackClick);
        }
        const nextBtn = new Button(btnWrapper, 'Next');
        nextBtn.onclick(onclick);
    }

    private renderAboutBlock(
        form: HTMLElement,
        settings: TSettings,
        birthday: string,
        onselect: (e: Event) => void,
        oninput: (e: Event) => void,
        onchange: (e: Event) => void
    ): void {
        form.append(Gender.getTemplate(onselect));
        this.colorSelectedOption(settings, 'gender');

        form.append(Calender.getTemplate(onselect));
        (<HTMLInputElement>document.querySelector('.datepicker')).value = birthday;
        this.materializeHandler.initDatePicker();

        form.append(
            Parameters.getTemplate(
                Height.title,
                Height.units,
                Height.units2,
                Height.option1,
                Height.option2,
                Height.min,
                Height.max,
                onselect,
                oninput,
                onchange
            )
        );

        form.append(
            Parameters.getTemplate(
                Weight.title,
                Weight.units,
                Weight.units2,
                Weight.option1,
                Weight.option2,
                Weight.min,
                Weight.max,
                onselect,
                oninput,
                onchange
            )
        );

        if (settings.height > 0) this.getParameters('height', settings);
        if (settings.weight > 0) this.getParameters('weight', settings);
        this.colorActiveUnit(settings);
    }

    private renderGoalsBlock(
        form: HTMLElement,
        settings: TSettings,
        onselect: (e: Event) => void,
        oninput: (e: Event) => void,
        onchange: (e: Event) => void
    ): void {
        const goalsWrapper = Node.setChild(form, 'div', 'parameters-options');
        goalsWrapper.onclick = (e: Event) => onselect(e);
        const goals = [GoalTitles.muscle, GoalTitles.relax, GoalTitles.toned, GoalTitles.weight];
        goals.forEach((goal) => {
            const goalItem = Node.setChild(goalsWrapper, 'div', 'goal option z-depth-1', goal);
            goalItem.setAttribute('data-title', 'goal');
            switch (goal) {
                case GoalTitles.muscle:
                    goalItem.setAttribute('data-value', 'muscle');
                    break;
                case GoalTitles.relax:
                    goalItem.setAttribute('data-value', 'relax');
                    break;
                case GoalTitles.toned:
                    goalItem.setAttribute('data-value', 'toned');
                    break;
                case GoalTitles.weight:
                    goalItem.setAttribute('data-value', 'weight');
                    break;
            }
            if (goal === GoalTitles.weight) {
                const weightChoiceBlock = Parameters.getTemplate(
                    Weight.desired,
                    Weight.units,
                    Weight.units2,
                    Weight.option1,
                    Weight.option2,
                    Weight.min,
                    Weight.max,
                    onselect,
                    oninput,
                    onchange
                );
                
                weightChoiceBlock.classList.add('hidden');

                form.append(weightChoiceBlock);

                const valueInput = <HTMLInputElement>document.querySelector('.value-select');
                const unitValue = <HTMLElement>document.querySelector('.value > span');
                this.colorActiveUnit(settings);
                valueInput.placeholder = (settings.weightUnit === Weight.units) ? Weight.min : Weight.min2;
                unitValue.textContent = settings.weightUnit;
            }
        });

        if (settings.desiredWeight > 0) this.getParameters('desiredweight', settings);
        this.colorSelectedOption(settings, 'goal');
        const weightChoiceBlock = <HTMLElement>document.querySelector('.input-group');
        if (!(<HTMLElement>document.querySelector(`[data-value='weight']`)).className.includes('active')) {
            weightChoiceBlock.classList.add('hidden');
        } else {
            weightChoiceBlock.classList.remove('hidden');
        }
    }

    private getParameters(type: string, settings: TSettings) {
        const elementsWrapper = <HTMLElement>document.querySelectorAll(`[data-${type}]`)[0];

        const input = <HTMLElement>document.querySelectorAll(`[data-${type}]`)[1];
        const value = <HTMLInputElement>elementsWrapper.children[0];
        
        value.value = this.getConvertedValue(type).toString();
        this.getUnits(settings);
        elementsWrapper.style.color = Colors.textOnLight;
        input.style.color = Colors.textOnLight;
    }

    private getConvertedValue(type: string): number {
        let value = 0;
        switch(type) {
            case 'height':
                value = this.model.convertedValues.height;
                break;
            case 'weight':
                value = this.model.convertedValues.weight;
                break;
            case 'desiredweight':
                value = this.model.convertedValues.desiredWeight;
                break;
        }
        return value;
    }

    private getUnits(settings: TSettings): void {
        const unitValues = <NodeListOf<HTMLElement>>document.querySelectorAll('.value > span');
        unitValues.forEach((unitValue) => {
            switch(unitValue.dataset.title) {
                case 'heightUnit':
                   unitValue.textContent = settings.heightUnit;
                     break;
                case 'weightUnit':
                   unitValue.textContent = settings.weightUnit;
                   break;
                case 'desiredWeightUnit':
                   unitValue.textContent = settings.weightUnit;
                   break;
             }
        });

    }

    private colorActiveUnit(settings: TSettings) {
        const unitOptions = <NodeListOf<HTMLElement>>document.querySelectorAll('.unit');
        unitOptions.forEach((unitOption) => {
            if (unitOption.dataset.value === settings.weightUnit || unitOption.dataset.value === settings.heightUnit) {
                unitOption.classList.add('active');
            } else {
                unitOption.classList.remove('active');
            }
        });
    }

    private renderFrequencyBlock(form: HTMLElement, settings: TSettings, onselect: (e: Event) => void): void {
        const frequencyWrapper = Node.setChild(form, 'div', 'parameters-options');
        frequencyWrapper.onclick = (e: Event) => onselect(e);
        const variants = [WorkoutsNumber.small, WorkoutsNumber.medium, WorkoutsNumber.large, WorkoutsNumber.huge];
        variants.forEach((variant) => {
            const variantItem = Node.setChild(
                frequencyWrapper,
                'div',
                'frequency option z-depth-1',
                variant.toString()
            );
            variantItem.setAttribute('data-title', 'workoutsNumber');
            variantItem.setAttribute('data-value', variant.toString());
        });
        this.colorSelectedOption(settings, 'frequency');
    }

    private renderClassesBlock(form: HTMLElement, settings: TSettings, onselect: (e: Event) => void): void {
        const classesWrapper = Node.setChild(form, 'div', 'parameters-options center');
        classesWrapper.onclick = (e: Event) => onselect(e);
        const classes = [
            WorkoutType.yoga,
            WorkoutType.stretch,
            WorkoutType.strength,
            WorkoutType.pilates,
            WorkoutType.meditation,
            WorkoutType.dance,
            WorkoutType.cardio,
            WorkoutType.boxing,
            WorkoutType.HIIT,
        ];
        const classItems: Array<HTMLElement> = [];
        classes.forEach((elem) => {
            const classItem = Node.setChild(classesWrapper, 'div', 'classes tile z-depth-1', elem.toUpperCase());
            classItem.setAttribute('data-type', elem);
            classItems.push(classItem);
        });
        settings.favWorkouts.forEach((type) => {
            classItems.forEach((item) => {
                if (item.dataset.type === type.toLowerCase()) item.classList.add('active');
            });
        });
    }

    private renderDurationBlock(form: HTMLElement, settings: TSettings, onselect: (e: Event) => void): void {
        const durationWrapper = Node.setChild(form, 'div', 'parameters-options');
        durationWrapper.onclick = (e: Event) => onselect(e);
        const durations = [WorkoutsProgramDuration.short, WorkoutsProgramDuration.medium, WorkoutsProgramDuration.long];
        durations.forEach((duration) => {
            const workoutProgramDuration = Node.setChild(
                durationWrapper,
                'div',
                'duration option z-depth-1',
                duration.toString()
            );
            workoutProgramDuration.setAttribute('data-title', 'duration');
            workoutProgramDuration.setAttribute('data-value', duration.toString());
        });

        this.colorSelectedOption(settings, 'duration');
    }

    private colorSelectedOption(settings: TSettings, setting: string): void {
        const options = document.querySelectorAll('[data-value]');
        options.forEach((option) => {
            const selectedOption = (<HTMLElement>option).dataset.value as
                | string
                | WorkoutsNumber
                | WorkoutsProgramDuration;
            switch (setting) {
                case 'gender':
                    if (selectedOption === settings.gender) option.classList.add('active');
                    break;
                case 'goal':
                    if (selectedOption === settings.goal) option.classList.add('active');
                    break;
                case 'frequency':
                    if (selectedOption === settings.workoutsNumber.toString()) option.classList.add('active');
                    break;
                case 'duration':
                    if (selectedOption === settings.duration.toString()) option.classList.add('active');
                    break;
            }
        });
    }

    public renderCongratulations(programDuration: number, onclick: (e: Event) => void): void {
        this.rootNode.textContent = '';

        this.rootNode.append(Congrats.getTemplate(programDuration, onclick));
    }
}

export default OnboardingPageView;
