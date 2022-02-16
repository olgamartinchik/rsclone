import authManager from '../../services/authManager';
import MealPageController from '../mealPage/mealPageController';
import MealPageModel from '../mealPage/mealPageModel';
import MealPageView from '../mealPage/mealPageView';
import ProgramPageModel from './programPageModel';
import ProgramPageView from './programPageView';

class ProgramPageController {
    private model: ProgramPageModel;

    private view: ProgramPageView;

    mealSection: MealPageView;

    mealData: MealPageModel;

    handlerMealCards: MealPageController;

    constructor() {
        this.model = new ProgramPageModel();
        this.view = new ProgramPageView();

        this.mealSection = new MealPageView();
        this.mealData = new MealPageModel();
        this.handlerMealCards = new MealPageController();
    }

    public async createPage() {
        const settings = await this.model.getSettingsData();
        const trainings = await this.model.getWeekTrainings(settings!);
        this.view.render(
            trainings,
            this.handleCardClick.bind(this),
            this.model.week,
            settings!,
            this.handleStatBlockClick.bind(this));

        this.mealSection.getLoaderMealContainer();
        this.mealSection.loadMealCard(
            await this.mealData.getUserMealData(),
            this.handlerMealCards.handlerMealCard.bind(this)
        );
    }

    public handleCardClick(e: Event): void {
        const currCard = <HTMLElement>e.currentTarget;
        const workout = this.model.getCardById(currCard.id);
        if (workout) {
            authManager.navigate(`workout/${workout.id}`);
        }
    }

    private handleStatBlockClick(): void {
        authManager.navigate('weeklyprogress');
    }
}

export default ProgramPageController;
