import WorkoutPageModel from './workoutPageModel';
import WorkoutPageView from './workoutPageView';
import videoHandler from '../../components/videoHandler/videoHandler';
import authManager from '../../services/authManager';
import { TStatData } from '../../services/types';
import Popup from '../../components/popup/popup';
class WorkoutPageController {
    private view: WorkoutPageView;

    private model: WorkoutPageModel;

    private videoHandler: typeof videoHandler;

    private popUp: Popup;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
        this.videoHandler = videoHandler;
        this.popUp = new Popup();
    }

    public createPage(idArr: string[]): void {
        const [id] = idArr;
        this.model.getData();
        const card = this.model.getCardById(id);
        if (card) {
            this.view.render(card, this.startWorkout.bind(this), this.addToFav.bind(this, id));
        } else {
            authManager.navigate('program');
        }
    }

    private async startWorkout(e: Event) {
        const id = (<HTMLElement>e.currentTarget).id;
        const link = this.model.getVideoLink(id);
        const settings = await this.model.getSettingsData();
        const card = this.model.getCardById(id);
        if (link && card && settings) {
            this.videoHandler.createVideo(this.view.rootNode, link, card, this.sendStatistics.bind(this), settings);
        }
    }

    private async sendStatistics(id: string, statData: TStatData): Promise<void> {
        const workout = this.model.getCardById(id);
        if (workout) {
            this.model.updateSettingsData(statData);
            workout.completed = true;
            this.model.updateWorkoutData(workout);
        }
        authManager.navigate(`workoutsummary/${id}`);
    }

    private async addToFav(id: string, e: Event): Promise<void> {
        const card = this.model.getCardById(id);
        const currBtn = (<HTMLElement>e.currentTarget);
        if(currBtn.classList.contains('active')) {
            currBtn.classList.remove('active');
            if (currBtn.lastElementChild) currBtn.lastElementChild.textContent = 'favorite_border';
        } else {
            currBtn.classList.add('active');
            if (currBtn.lastElementChild) currBtn.lastElementChild.textContent = 'favorite';
        }
        const settings = await this.model.getSettingsData();
        const currCard = this.model.getCardById(id);
        if(card && settings && currCard) {
            const liked = settings.liked;
            
            const unique = new Set(liked);
            if(unique.has(id)) {
                unique.delete(id);
                currCard.liked = false;
                this.popUp.createPopup('../../../assets/img/broken-heart.png', 'Workout has been removed from favorites!');

            } else {
                unique.add(id);
                currCard.liked = true;
                this.popUp.createPopup('../../../assets/img/heart.png', 'Workout has been added to favorites!');
            }
            settings.liked = [...unique];
            await this.model.saveSettings(settings);
        }

    }
}

export default WorkoutPageController;
