import WorkoutPageModel from './statisticPageModel';
import WorkoutPageView from './statisticPageView';
import authManager from '../../services/authManager';
import videoHandler from '../../components/videoHandler/videoHandler';
import BadgesManager from '../../services/badgesManager';

class StatisticPageController {
    private view: WorkoutPageView;

    private model: WorkoutPageModel;

    private videoHandler: typeof videoHandler;

    private badgeManager: BadgesManager;

    constructor() {
        this.model = new WorkoutPageModel();
        this.view = new WorkoutPageView();
        this.videoHandler = videoHandler;
        this.badgeManager = new BadgesManager();
    }

    public async createPage(args: string[]): Promise<void> {
        this.videoHandler.destroy();
        const [id] = args;
        const settings = await this.model.getSettings();
        console.log(settings)
        if (settings) {
            this.view.render(settings, this.handleClick.bind(this, id));
            this.badgeManager.checkBadge(settings);
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
