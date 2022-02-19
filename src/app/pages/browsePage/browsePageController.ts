import BrowsePageView from './browsePageView';
import BrowsePageModel from './browsePageModel';
import videoHandler from '../../components/videoHandler/videoHandler';
import modalCustomized from '../../components/modal/modalCutomized';
import carouselTemplate from '../../components/carousel/template';
import StorageManager from '../../services/storageManager';
import authManager from '../../services/authManager';
import Card from '../../components/card/card';
import WorkoutPageController from '../workoutPage/workoutPageController';
import WorkoutPageModel from '../workoutPage/workoutPageModel';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import { TToken, TSettings } from '../../services/types';
import storageManager from '../../services/storageManager';

class BrowsePageController {
    private view: BrowsePageView;
    
    private model: BrowsePageModel;

    private videoHandler: typeof videoHandler;
    
    private isLogin: boolean;
    
    private materializeHandler: MaterializeHandler;

    private modalCustomized: typeof modalCustomized;

    private filteredArray!: Array<Card>;

    constructor() {
        this.view = new BrowsePageView();
        this.model = new BrowsePageModel();
        this.videoHandler = videoHandler; 
        this.modalCustomized = modalCustomized;
        this.materializeHandler = new MaterializeHandler();
        this.isLogin = false;
    }

    public async createPage() {
        await this.model.getData();
        this.isLogin = this.checkAuth();
        const card = this.model.getRandomWorkout();
        this.view.render(this.isLogin, card, this.signUpHandler.bind(this), this.startWorkout.bind(this), this.onParameterClick.bind(this));
        
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
        const card = this.model.getCardById(id);
        if (!this.isLogin && link && card) {
            this.videoHandler.createVideo(this.view.rootNode, link, card, this.onVideoEnd.bind(this));
        } else {
            
        }
    }

    private onVideoEnd(): void {
        this.videoHandler.destroy();
        this.modalCustomized.createModal(this.view.rootNode, carouselTemplate());
    }

    private onParameterClick(e: Event): void {
        const value = (<HTMLElement>e.currentTarget).dataset.value!;
        authManager.navigate(`browse/${value}`);
    }

    private initMaterialize(): void {
        this.materializeHandler.initModal();
    }
}

export default BrowsePageController;
