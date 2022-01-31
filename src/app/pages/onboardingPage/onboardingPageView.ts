import Footer from '../../components/footer/footer';
import Gender from '../../components/gender/gender';
import Calender from '../../components/calender/calender';
import Parameters from '../../components/parameters/parameters';
import Congrats from '../../components/congratulations/congrats'; 
import Node from '../../components/Node';
import Button from '../../components/Button';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import { Height, Weight, GoalTitles, WorkoutsNumber, WorkoutType, WorkoutsProgramDuration } from '../../services/constants';

class OnboardingPageView {
    private materializeHandler: MaterializeHandler;

    private rootNode: HTMLElement;

    constructor() {
        this.materializeHandler = new MaterializeHandler();
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(block: string, onselect: (e: Event) => void, oninput: (e: Event) => void, onclick: (e: Event) => void): void {
        this.rootNode.textContent = '';

        const header = new Node(this.rootNode, 'div', 'registration-header');
        Node.setChild(header.node, 'h2', 'title title-tablet registration-title', block);

        const content = Node.setChild(this.rootNode, 'div', 'registration-content');
        const form = Node.setChild(content, 'form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'post');

        this.renderForm(block, form, onselect, oninput, onclick);

        this.rootNode.append(Footer.getTemplate());
    }

    public renderForm(block: string, form: HTMLElement, onselect: (e: Event) => void, oninput: (e: Event) => void, onclick: (e: Event) => void): void {
        form.textContent = '';
        
        switch(block) {
            case 'About you': 
                form.append(Gender.getTemplate(onselect));
                form.append(Calender.getTemplate(onselect));
                this.materializeHandler.initDatePicker();
                form.append(Parameters.getTemplate(Height.title, Height.units, Height.option1, Height.option2, Height.min, Height.max, onselect, oninput));
                form.append(Parameters.getTemplate(Weight.title, Weight.units, Weight.option1, Weight.option2, Weight.min, Weight.max, onselect, oninput));
                break;
            case `What's your goal?`:
                const goalsWrapper = Node.setChild(form, 'div', 'parameters-options');
                goalsWrapper.onclick = (e: Event) => onselect(e);
                const goals = [GoalTitles.muscle, GoalTitles.relax, GoalTitles.toned, GoalTitles.weight];
                goals.forEach(goal => {
                    const goalItem = Node.setChild(goalsWrapper, 'div', 'goal option z-depth-1', goal);
                    switch(goal) {
                        case GoalTitles.muscle:
                            goalItem.setAttribute('data-goal', 'muscle');
                            break;
                        case GoalTitles.relax:
                            goalItem.setAttribute('data-goal', 'relax');
                            break;
                        case GoalTitles.toned:
                            goalItem.setAttribute('data-goal', 'toned');
                            break;
                        case GoalTitles.weight:
                            goalItem.setAttribute('data-goal', 'weight');
                            break;                                                                                    
                    }
                    if (goal === GoalTitles.weight) {
                        const weightChoiceBlock = Parameters.getTemplate(Weight.desired, Weight.units, Weight.option1, Weight.option2, Weight.min, Weight.max, onselect, oninput);
                        weightChoiceBlock.classList.add('hidden');
                        form.append(weightChoiceBlock);
                    }
                }); 
                goalsWrapper.children[0].classList.add('active');
                break;
            case 'How many workouts per week do you want?':
                const frequencyWrapper = Node.setChild(form, 'div', 'parameters-options');
                frequencyWrapper.onclick = (e: Event) => onselect(e);
                const variants = [WorkoutsNumber.small, WorkoutsNumber.medium, WorkoutsNumber.large, WorkoutsNumber.huge];
                variants.forEach(variant => {
                    const variantItem = Node.setChild(frequencyWrapper, 'div', 'frequency option z-depth-1', variant.toString());
                    variantItem.setAttribute('data-frequency', variant.toString());
                });
                frequencyWrapper.children[0].classList.add('active');
                break;
            case 'Select all your favorite type of classes:':
                const classesWrapper = Node.setChild(form, 'div', 'parameters-options center');
                classesWrapper.onclick = (e: Event) => onselect(e);
                const classes = [WorkoutType.yoga, WorkoutType.stretch, WorkoutType.strength, WorkoutType.pilates, WorkoutType.meditation, WorkoutType.dance, WorkoutType.cardio, WorkoutType.boxing, WorkoutType.HIIT];
                classes.forEach(elem => {
                    const classItem = Node.setChild(classesWrapper, 'div', 'classes tile z-depth-1', elem.toUpperCase());
                    classItem.setAttribute('data-frequency', elem);
                });
                break;
            case 'How much time do you prefer to work out?':
                const lengthWrapper = Node.setChild(form, 'div', 'parameters-options');
                lengthWrapper.onclick = (e: Event) => onselect(e);
                const lengths = [{min:5, max: 10}, {min:15, max: 20}, {min:25, max: 30}, {min:30}];
                lengths.forEach(length => {
                    const workoutLength = (length.max) ? Node.setChild(lengthWrapper, 'div', 'length option z-depth-1', `${length.min} - ${length.max}`)
                                                           : Node.setChild(lengthWrapper, 'div', 'length option z-depth-1', `${length.min}+`);
                    workoutLength.setAttribute('data-min', `${length.min}`)
                    if (length.max) workoutLength.setAttribute('data-max', `${length.max}`)
                });
                
                lengthWrapper.children[0].classList.add('active');
                break;
                case 'How many weeks do you want to start with?':
                    const durationWrapper = Node.setChild(form, 'div', 'parameters-options');
                    durationWrapper.onclick = (e: Event) => onselect(e);
                    const durations = [WorkoutsProgramDuration.short, WorkoutsProgramDuration.medium, WorkoutsProgramDuration.long];
                    durations.forEach(duration => {
                        const workoutProgramDuration = Node.setChild(durationWrapper, 'div', 'duration option z-depth-1', duration.toString());
                        workoutProgramDuration.setAttribute('data-duration', duration.toString());
                    });
                    
                    durationWrapper.children[0].classList.add('active');
                    break;
        }

        const nextBtn = new Button(form, 'Next');
        nextBtn.onclick(onclick);
    }

    public renderCongratulations(programDuration: number, onclick: (e: Event) => void): void {
        this.rootNode.textContent = '';

        this.rootNode.append(Congrats.getTemplate(programDuration, onclick));
    }
}

export default OnboardingPageView;