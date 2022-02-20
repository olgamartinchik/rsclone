import Card from '../../components/card/card';
import authManager from '../../services/authManager';
import { TSettings, TWorkout } from '../../services/types';
import Utils from '../../services/utils';
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

    public async createPage(): Promise<void> {
        const settings = await this.model.getSettingsData();
        // <<<<<<< HEAD
        //         const trainings = await this.model.getWeekTrainings(settings!);
        //         this.view.render(
        //             trainings,
        //             this.handleCardClick.bind(this),
        //             this.model.week,
        //             settings!,
        //             this.handleStatBlockClick.bind(this)
        //         );

        //         this.mealSection.getLoaderMealContainer();
        //         this.mealSection.loadMealCard(
        //             (await this.mealData.getUserMealData()) as IDataExplore[],
        //             this.handlerMealCards.handlerMealCard.bind(this)
        //         );
        // =======
        if (settings) {
            const trainings = await this.model.getWeekTrainings(settings);
            this.view.render(trainings, this.handleCardClick.bind(this), this.model.week);
            this.createStatBlock(settings, this.model.week, this.handleStatBlockClick.bind(this));

            this.mealSection.getLoaderMealContainer();
            this.mealSection.loadMealCard(
                await this.mealData.getUserMealData(),
                this.handlerMealCards.handlerMealCard.bind(this)
            );
            this.createFavs(settings.liked);
        }
    }

    private async createStatBlock(settings: TSettings, weekIndex: number, clickHandler: () => void): Promise<void> {
        if (!settings.progress[weekIndex]) {
            settings.weekProgress = {
                currentWeek: weekIndex,
                calories: 0,
                workoutsCompleted: 0,
                minutes: 0,
                workoutsNumber: settings.weekProgress.workoutsNumber,
            };
        } else {
            const calories = Utils.countValuesSum(settings.progress[weekIndex].calories);
            const minutes = Utils.countValuesSum(settings.progress[weekIndex].minutes);
            settings.weekProgress = {
                currentWeek: weekIndex,
                calories: calories,
                workoutsCompleted: settings.weekProgress.workoutsCompleted,
                minutes: minutes,
                workoutsNumber: settings.weekProgress.workoutsNumber,
            };
        }
        this.view.renderStatBlock(settings, clickHandler);
        await this.model.saveSettings(settings);
    }

    private createFavs(favs: string[]): void {
        const cards = this.model.allCard;
        const likedCards: TWorkout[] = [];

        if (cards.length && favs.length) {
            cards.forEach((cardArr: Card[]) => {
                cardArr.forEach((card: Card) => {
                    const favCard = favs.find((fav) => fav === card.id);
                    if (favCard) {
                        if (!likedCards.find((cardElem) => cardElem._id === card.id)) {
                            likedCards.push(card.data);
                            if (!card.liked) {
                                card.liked = true;
                            }
                        }
                    }
                });
            });
        }
        this.view.renderFavs(likedCards, this.handleCardClick.bind(this));
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
