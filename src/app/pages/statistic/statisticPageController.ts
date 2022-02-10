import WorkoutPageModel from './statisticPageModel';
import WorkoutPageView from './statisticPageView';
import authManager from '../../services/authManager';
import videoHandler from '../../components/videoHandler/videoHandler';

class StatisticPageController {
    private view: WorkoutPageView;

    private model: WorkoutPageModel;

    private videoHandler: typeof videoHandler;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
        this.videoHandler = videoHandler;
    }

    public async createPage(args: string[]): Promise<void> {
        this.videoHandler.destroy();
        const [id] = args;
        const settings = await this.model.getSettings();
        if (settings) {
            this.view.render(settings, this.handleClick.bind(this, id));
        } else {
            authManager.navigate('');
        }
    }

    private handleClick(id: string): void {
        this.videoHandler.destroy();
        authManager.navigate(`workout/${id}`);
    }
}

export default StatisticPageController;
