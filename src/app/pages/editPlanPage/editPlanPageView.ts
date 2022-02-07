import MaterializeHandler from '../../services/materialize/materializeHandler';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import modal from '../../components/modal/modal';
import Node from '../../components/Node';
import Button from '../../components/Button';
import {
    GoalTitles,
    WorkoutsProgramDuration,
    WorkoutsNumber,
    WorkoutType,
    ModalContents,
} from '../../services/constants';
import { TSettings, TWorkoutLength } from '../../services/types';
import userSettings from '../../services/mocks/defaultData';

class EditPlanPageView {
    private rootNode: HTMLElement;

    private materializeHandler: MaterializeHandler;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
    }

    public render(userSettings: TSettings | void, onchange: (e: Event) => void): void {
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

        this.createMainLayout(userSettings, onchange);

        this.rootNode.append(footer.getTemplate());
    }

    private createMainLayout(userSettings: TSettings | void, onchange: (e: Event) => void): void {
        const main = new Node(this.rootNode, 'main', 'main-layout');
        const decorativeBlock = Node.setChild(main.node, 'div', 'decorative-editplan');
        Node.setChild(decorativeBlock, 'h2', 'title editplan-title', 'Edit plan');
        const decorativeImg = Node.setChild(decorativeBlock, 'img', 'center-img editplan') as HTMLImageElement;
        decorativeImg.src = '../../../assets/img/svg/kick_start.svg';
        const editPlanWrapper = Node.setChild(main.node, 'div', 'settings-wrapper');

        this.createPlanItem(editPlanWrapper, 'Fitness Goal', 'target', userSettings, 'goal', onchange);
        this.createPlanItem(editPlanWrapper, 'Desired weight', 'weight', userSettings, 'desiredWeight', onchange);
        this.createPlanItem(editPlanWrapper, 'Program duration', 'duration', userSettings, 'duration', onchange);
        this.createPlanItem(editPlanWrapper, 'Workouts per week', 'frequency', userSettings, 'workoutsNumber', onchange);
        this.createPlanItem(editPlanWrapper, 'Workouts Length', 'clock', userSettings, 'workoutLength', onchange);
        this.createPlanItem(editPlanWrapper, 'Favorite Types', 'heart', userSettings, 'favWorkouts', onchange);

        const buttonWrapper = Node.setChild(editPlanWrapper, 'div', 'btn-wrapper edit-plan');
        const saveButton = new Button(buttonWrapper, 'Save');
        saveButton.setDisabled();
    }

    private createPlanItem(
        parentNode: HTMLElement,
        title: string,
        icon: string,
        userSettings: TSettings | void,
        settingsType: string,
        onchange: (e: Event) => void
    ): void {
        const planItemWrapper = Node.setChild(parentNode, 'div', 'plan-item wrapper');
        planItemWrapper.insertAdjacentHTML('afterbegin', this.planItemTitle(title, icon));
        planItemWrapper.onchange = (e: Event) => onchange(e);
        this.setDataAttribute(planItemWrapper, 'data-type', settingsType);

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
                this.createFavoriteTypesChoice(planItemWrapper, userSettings);
                this.materializeHandler.initModal();
                return;
        }
        this.createSelectBlock(planItemWrapper, options, userSettings, settingsType);

        this.materializeHandler.initSelect();
    }

    private setDataAttribute(element: HTMLElement, key: string, value: string): void {
        element.setAttribute(key, value);
    }

    private planItemTitle(text: string, icon: string): string {
        return `
        <p class="settings-link">
            <i class="icon ${icon}"></i>
            ${text}
        </p>
        `;
    }

    private createSelectBlock(
        parentNode: HTMLElement,
        options: Array<string | number | TWorkoutLength>,
        userSettings: TSettings | void,
        settingsType: string
    ): void {
        const selectBlockWrapper = Node.setChild(parentNode, 'div', 'input-field col s12');
        const selectTag = Node.setChild(selectBlockWrapper, 'select');
        selectTag.setAttribute('data-type', settingsType);
        options.forEach((option, index) => {
            if (settingsType !== 'workoutLength') {
                const selectOption = Node.setChild(selectTag, 'option', '', option.toString());
                selectOption.setAttribute('value', (index + 1).toString());

                switch (settingsType) {
                    case 'goal':
                        if (option === GoalTitles[(userSettings as TSettings)[settingsType]]) {
                            selectOption.setAttribute('selected', 'selected');
                        }
                        break;
                    case 'duration':
                        if (option === +(userSettings as TSettings)[settingsType]) {
                            selectOption.setAttribute('selected', 'selected');
                        }
                        break;
                    case 'workoutsNumber':
                        if (option === (userSettings as TSettings)[settingsType]) {
                            selectOption.setAttribute('selected', 'selected');
                        }
                        break;
                }
            } else {
                const selectOption =
                    index !== 3
                        ? Node.setChild(
                              selectTag,
                              'option',
                              '',
                              `${(option as TWorkoutLength).min} - ${(option as TWorkoutLength).max} min`
                          )
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
        input.setAttribute('data-type', 'desiredWeight');
        Node.setChild(wrapper, 'span', 'editplan-unit', 'kg');

        if (userSettings.goal !== 'weight') parentNode.classList.add('hidden');
    }

    private createFavoriteTypesChoice(parentNode: HTMLElement, userSettings: TSettings | void): void {
        const options = [
            WorkoutType.HIIT,
            WorkoutType.boxing,
            WorkoutType.cardio,
            WorkoutType.dance,
            WorkoutType.meditation,
            WorkoutType.pilates,
            WorkoutType.strength,
            WorkoutType.stretch,
            WorkoutType.yoga,
        ];
        const checkedOptions = [...(userSettings as TSettings).favWorkouts];

        parentNode.append(
            modal.getTemplate(ModalContents.options, 'editplan', 'Save', options, checkedOptions, 'favWorkouts')
        );
        parentNode.insertAdjacentHTML('beforeend', this.addModalTrigger());
    }

    private addModalTrigger(): string {
        return `
        <a class="waves-effect waves-light btn modal-trigger favWorkouts-choice" href="#modal1">Change</a>
        `;
    }
}

export default EditPlanPageView;
