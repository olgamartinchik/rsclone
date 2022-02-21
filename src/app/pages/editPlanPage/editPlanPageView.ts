import MaterializeHandler from '../../services/materialize/materializeHandler';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import modal from '../../components/modal/modal';
import Node from '../../components/Node';
import Button from '../../components/Button';
import storageManager from '../../services/storageManager';
import {
    GoalTitles,
    WorkoutsProgramDuration,
    WorkoutsNumber,
    WorkoutType,
    ModalContents,
} from '../../services/constants';
import { TSettings, TUser } from '../../services/types';
import { Weight, Coefficients } from '../../services/constants';
import preloader from '../../components/preloader/preloader';

class EditPlanPageView {
    private rootNode: HTMLElement;

    private materializeHandler: MaterializeHandler;

    private preloader: HTMLElement;

    private overflow: HTMLElement | null;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.materializeHandler = new MaterializeHandler();
        this.preloader = preloader.getTemplate();
        this.overflow = null;
    }

    public render(userSettings: TSettings | void, onchange: (e: Event) => void, onclick: (e: Event) => void): void {
        this.rootNode.textContent = '';

        this.createHeader();
        this.createMainLayout(userSettings, onchange, onclick);
        this.createFooter();
        this.createPreloader();
    }

    private createPreloader() {
        this.overflow = document.createElement('div');
        this.overflow.className = 'overflow active';
    }

    private createHeader(): void {
        const user = <TUser>storageManager.getItem('user', 'local');
        this.rootNode.append(header.getTemplate());
        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu(true);
        navbar.addProfileLink(user.name.split('')[0]);
    }

    private createMainLayout(
        userSettings: TSettings | void,
        onchange: (e: Event) => void,
        onclick: (e: Event) => void
    ): void {
        const main = new Node(this.rootNode, 'main', 'main-layout');
        this.insertDecorativeBlock(main.node);
        const editPlanWrapper = Node.setChild(main.node, 'div', 'settings-wrapper');

        this.createPlanItem(editPlanWrapper, 'Fitness Goal', 'target', userSettings, 'goal', onchange);
        this.createPlanItem(editPlanWrapper, 'Desired weight', 'weight', userSettings, 'desiredWeight', onchange);
        this.createPlanItem(editPlanWrapper, 'Program duration', 'duration', userSettings, 'duration', onchange);
        this.createPlanItem(
            editPlanWrapper,
            'Workouts per week',
            'frequency',
            userSettings,
            'workoutsNumber',
            onchange
        );
        this.createPlanItem(editPlanWrapper, 'Favorite Types', 'heart', userSettings, 'favWorkouts', onchange);

        const buttonWrapper = Node.setChild(editPlanWrapper, 'div', 'btn-wrapper edit-plan');
        const saveButton = new Button(buttonWrapper, 'Save');
        saveButton.onclick(onclick);
        saveButton.setDisabled();
    }

    private insertDecorativeBlock(parentNode: HTMLElement): void {
        const template = `
        <div class="decorative-editplan">
            <h2 class="title editplan-title">Edit plan</h2>
            <img class="center-img editplan" src="../../../assets/img/svg/kick_start.svg" width="204" height="120" alt="Motivation logo">
        </div>
        `;
        parentNode.insertAdjacentHTML('afterbegin', template);
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
        planItemWrapper.onchange = (e: Event) => onchange(e);
        this.setDataAttribute(planItemWrapper, 'data-type', settingsType);

        planItemWrapper.insertAdjacentHTML('afterbegin', this.insertPlanItemTitle(title, icon));

        let options = [] as Array<string | number>;
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
                this.createDesiredWeightInput(planItemWrapper, userSettings);
                return;
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

    private insertPlanItemTitle(text: string, icon: string): string {
        return `
        <p class="settings-link">
            <i class="icon ${icon}"></i>
            ${text}
        </p>
        `;
    }

    private createSelectBlock(
        parentNode: HTMLElement,
        options: Array<string | number>,
        userSettings: TSettings | void,
        settingsType: string
    ): void {
        const selectBlockWrapper = Node.setChild(parentNode, 'div', 'input-field col s12');
        const selectTag = Node.setChild(selectBlockWrapper, 'select');
        selectTag.setAttribute('data-type', settingsType);

        options.forEach((option, index) => {
            this.renderOptions(userSettings, settingsType, selectTag, option.toString(), index);
        });
    }

    private renderOptions(
        userSettings: TSettings | void,
        settingsType: string,
        parentNode: HTMLElement,
        option: string,
        index: number
    ): void {
        const selectOption = Node.setChild(parentNode, 'option', '', option);
        selectOption.setAttribute('value', (index + 1).toString());

        switch (settingsType) {
            case 'goal':
                this.selectOption(option === GoalTitles[(<TSettings>userSettings)[settingsType]], selectOption);
                break;
            case 'duration':
            case 'workoutsNumber':
                this.selectOption(+option === +(<TSettings>userSettings)[settingsType], selectOption);
                break;
        }
    }

    private selectOption<T>(condition: T, selectOption: HTMLElement): void {
        if (condition) {
            selectOption.setAttribute('selected', 'selected');
        }
    }

    private createDesiredWeightInput(parentNode: HTMLElement, userSettings: TSettings | void): void {
        const wrapper = Node.setChild(parentNode, 'div', 'editplan-input-wrapper');
        const input = <HTMLInputElement>Node.setChild(wrapper, 'input', 'editplan-input');
        input.setAttribute('value', (<TSettings>userSettings).desiredWeight.toString());
        input.setAttribute('data-type', 'desiredWeight');
        const desiredWeight = (<TSettings>userSettings).desiredWeight;
        if (desiredWeight === 0) {
            this.setInitialParameterValue(input);
        } else {
            this.getParameters(input, userSettings!);
        }

        const unit = (<TSettings>userSettings).weightUnit;
        Node.setChild(wrapper, 'span', 'editplan-unit', `${unit}`);

        if ((<TSettings>userSettings).goal !== 'weight') parentNode.classList.add('hidden');
    }

    private setInitialParameterValue(inputElement: HTMLInputElement) {
        inputElement.value = '';
        inputElement.placeholder = '0';
    }

    private getParameters(inputElement: HTMLInputElement, settings: TSettings): void {
        if (settings.weightUnit === Weight.units) {
            inputElement.value = settings.desiredWeight.toString();
        } else {
            inputElement.value = Math.round(settings.desiredWeight * Coefficients.toPounds).toString();
        }
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
        const checkedOptions = [...(<TSettings>userSettings).favWorkouts];

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

    private createFooter(): void {
        this.rootNode.append(footer.getTemplate());
    }

    public setPreloader(): void {
        if (this.overflow) {
            this.rootNode.append(this.overflow, this.preloader);
        }
    }

    public removePreloader(callback: () => void = () => {}): void {
        if (this.overflow) {
            this.overflow.classList.add('closed');
            this.overflow.onanimationend = () => {
                this.preloader.remove();
                if (this.overflow) this.overflow.remove();
                this.overflow = null;
                callback();
            };
        }
    }
}

export default EditPlanPageView;
