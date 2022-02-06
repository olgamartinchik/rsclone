import MaterializeHandler from '../../services/materialize/materializeHandler';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import Button from '../../components/Button';
import { GoalTitles, WorkoutsProgramDuration, WorkoutsNumber } from '../../services/constants';
import { TSettings, TWorkoutLength } from '../../services/types';

class EditPlanPageView {
    private rootNode: HTMLElement;
    
    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
    }

    public render(userSettings: TSettings | void): void {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu();
        navbar.addProfileLink('O');
        
        this.createMainLayout(userSettings);

        this.rootNode.append(footer.getTemplate());
    }

    private createMainLayout(userSettings: TSettings | void): void {
        const main = new Node(this.rootNode, 'main', 'main-layout');
        const decorativeBlock = Node.setChild(main.node, 'div', 'decorative-editplan');
        Node.setChild(decorativeBlock, 'h2', 'title editplan-title', 'Edit plan');
        const decorativeImg = Node.setChild(decorativeBlock, 'img', 'center-img editplan') as HTMLImageElement;
        decorativeImg.src = '../../../assets/img/svg/kick_start.svg';
        const editPlanWrapper = Node.setChild(main.node, 'div', 'settings-wrapper');

        this.createPlanItem(editPlanWrapper, 'Fitness Goal', 'target', userSettings, 'goal');
        this.createPlanItem(editPlanWrapper, 'Desired weight', 'weight', userSettings, 'desiredWeight');
        this.createPlanItem(editPlanWrapper, 'Program duration', 'duration', userSettings, 'duration');
        this.createPlanItem(editPlanWrapper, 'Workouts per week', 'frequency', userSettings, 'workoutsNumber');
        this.createPlanItem(editPlanWrapper, 'Workouts Length', 'clock', userSettings, 'workoutLength');
        this.createPlanItem(editPlanWrapper, 'Favorite Types', 'heart', userSettings, 'favWorkouts');

        const buttonWrapper = Node.setChild(editPlanWrapper, 'div', 'btn-wrapper edit-plan');
        const saveButton = new Button(buttonWrapper, 'Save');
        saveButton.setDisabled();
    }

    private createPlanItem (parentNode: HTMLElement, title: string, icon: string, userSettings: TSettings | void, settingsType: string): void {
        const planItemWrapper = Node.setChild(parentNode, 'div', 'plan-item wrapper');
        planItemWrapper.insertAdjacentHTML('afterbegin', this.planItemTitle(title, icon));
        let options = [] as Array<string | number | TWorkoutLength>;

        switch (settingsType) {
            case 'goal':
                options = [GoalTitles.muscle, GoalTitles.relax, GoalTitles.toned, GoalTitles.weight];
                break;
            case 'duration':
                options = [WorkoutsProgramDuration.short, WorkoutsProgramDuration.medium, WorkoutsProgramDuration.long];
                break;
            case 'workoutsNumber':
                options = [WorkoutsNumber.small, WorkoutsNumber.medium, WorkoutsNumber.large, WorkoutsNumber.huge];
                break; 
            case 'desiredWeight':
                this.createDesiredWeightInput(planItemWrapper);
                return;
            case 'workoutLength':
                options = [{ min: 5, max: 10 }, { min: 15, max: 20 }, { min: 25, max: 30 }, { min: 30 }];
                break;
            case 'favWorkouts':
                return;                        
        }
        this.createSelectBlock(planItemWrapper, options, userSettings, settingsType);
        
        this.materializeHandler.initSelect();
    }

    private planItemTitle(text: string, icon: string): string {
        return `
        <p class="settings-link">
            <i class="icon ${icon}"></i>
            ${text}
        </p>
        `
    }

    private createSelectBlock(parentNode: HTMLElement, options: Array<string | number | TWorkoutLength>, userSettings: TSettings | void, settingsType: string): void {
        
        const selectBlockWrapper = Node.setChild(parentNode, 'div', 'input-field col s12');
        const selectTag = Node.setChild(selectBlockWrapper, 'select');
        options.forEach((option, index) => {
            if(settingsType !== 'workoutLength') {
                const selectOption = Node.setChild(selectTag, 'option', '', option.toString());
                selectOption.setAttribute('value', (index + 1).toString());
                
                switch(settingsType) {
                    case 'goal':
                        if (option === GoalTitles[(userSettings as TSettings)[settingsType]]) {
                            selectOption.setAttribute('selected', 'selected');
                        };
                        break;
                    case 'duration':
                        if (option === +(userSettings as TSettings)[settingsType]) {
                            selectOption.setAttribute('selected', 'selected');
                        };
                        break;
                    case 'workoutsNumber':
                        if (option === (userSettings as TSettings)[settingsType]) {
                            selectOption.setAttribute('selected', 'selected');
                        };
                        break;
                }
            } else {
                const selectOption = (index !== 3) ? Node.setChild(selectTag, 'option', '', `${(option as TWorkoutLength).min} - ${(option as TWorkoutLength).max} min`)
                                                              : Node.setChild(selectTag, 'option', '', `${(option as TWorkoutLength).min}+ min`);
                if ((option as TWorkoutLength).min === (userSettings as TSettings).workoutLength.min) {
                    selectOption.setAttribute('selected', 'selected');
                }
            }
        });
    }

    private createDesiredWeightInput(parentNode: HTMLElement): void {
        const wrapper = Node.setChild(parentNode, 'div', 'editplan-input-wrapper');
        const input = Node.setChild(wrapper, 'input', 'editplan-input');
        input.setAttribute('value', '0');
        const span = Node.setChild(wrapper, 'span', 'editplan-unit', 'kg');
    }
}

export default EditPlanPageView;
