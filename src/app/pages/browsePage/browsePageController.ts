import BrowsePageView from './browsePageView';
import Card from '../../components/card/card';
import BrowsePageModel from './browsePageModel';
import videoHandler from '../../components/videoHandler/videoHandler';
import modalCustomized from '../../components/modal/modalCutomized';
import carouselTemplate from '../../components/carousel/template';
import Popup from '../../components/popup/popup';
import StorageManager from '../../services/storageManager';
import authManager from '../../services/authManager';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import { TToken, TSettings, TStatData } from '../../services/types';

class BrowsePageController {
    private view: BrowsePageView;

    private model: BrowsePageModel;

    private videoHandler: typeof videoHandler;

    private isLogin: boolean;

    private materializeHandler: MaterializeHandler;

    private modalCustomized: typeof modalCustomized;

    private popUp: Popup;

    constructor() {
        this.view = new BrowsePageView();
        this.model = new BrowsePageModel();
        this.videoHandler = videoHandler;
        this.modalCustomized = modalCustomized;
        this.materializeHandler = new MaterializeHandler();
        this.isLogin = false;
        this.popUp = new Popup();
    }

    public async createPage() {
        await this.model.getData();
        this.isLogin = this.checkAuth();
        const card = this.model.getRandomWorkout();
        this.view.render(
            this.isLogin,
            card,
            this.signUpHandler.bind(this),
            this.startWorkout.bind(this),
            this.onParameterClick.bind(this),
            this.addToFav.bind(this, card.id)
        );

        this.initMaterialize();
    }

    private checkAuth(): boolean {
        let isLogin = false;
        const token = <TToken>StorageManager.getItem('token', 'local');
        const userSettings = <TSettings>StorageManager.getItem('userSettings', 'local');

        if (token && userSettings) {
            isLogin = true;
        }

        return isLogin;
    }

    private signUpHandler(): void {
        authManager.navigate('/register');
    }

    private async startWorkout(e: Event) {
        const id = (<HTMLElement>e.currentTarget).id;
        const link = this.model.getVideoLink();
        const card = <Card>this.model.getCardById(id);
        const settings = await this.model.getSettingsData();
        if (!this.isLogin && link && card) {
            this.videoHandler.createVideo(this.view.rootNode, link, card, this.onVideoEnd.bind(this));
        } else {
            this.videoHandler.createVideo(this.view.rootNode, link, card, this.sendStatistics.bind(this), settings!);
        }
    }

    private onVideoEnd(): void {
        this.videoHandler.destroy();
        this.modalCustomized.createModal(this.view.rootNode, carouselTemplate());
    }

    private async sendStatistics(id: string, statData: TStatData): Promise<void> {
        const workout = this.model.getCardById(id);
        if (workout) {
            await this.model.updateSettingsData(statData);
            workout.completed = true;
            await this.model.updateWorkoutData(workout);
        }
        authManager.navigate(`workoutsummary/${id}`);
    }

    private onParameterClick(e: Event): void {
        const value = (<HTMLElement>e.currentTarget).dataset.value!;
        authManager.navigate(`browse/${value}`);
    }

    private async addToFav(id: string, e: Event): Promise<void> {
        const card = this.model.getCardById(id);
        const currBtn = <HTMLElement>e.currentTarget;
        if (currBtn.classList.contains('active')) {
            currBtn.classList.remove('active');
            if (currBtn.lastElementChild) {
                currBtn.lastElementChild.textContent = 'favorite_border';
            }
        } else {
            currBtn.classList.add('active');
            if (currBtn.lastElementChild) currBtn.lastElementChild.textContent = 'favorite';
        }
        const settings = await this.model.getSettingsData();
        const currCard = this.model.getCardById(id);
        if (card && settings && currCard) {
            const liked = settings.liked;

            const unique = new Set(liked);
            if (unique.has(id)) {
                unique.delete(id);
                currCard.liked = false;
                this.popUp.createPopup(
                    '../../../assets/img/broken-heart.png',
                    'Workout has been removed from favorites!'
                );
            } else {
                unique.add(id);
                currCard.liked = true;
                this.popUp.createPopup('../../../assets/img/heart.png', 'Workout has been added to favorites!');
            }
            settings.liked = [...unique];
            await this.model.saveSettings(settings);
        }
    }

    private initMaterialize(): void {
        this.materializeHandler.initModal();
    }
}

export default BrowsePageController;
