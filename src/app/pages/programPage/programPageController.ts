import authManager from '../../services/authManager';
import ProgramPageModel from './programPageModel';
import ProgramPageView from './programPageView';

class ProgramPageController {
    private model: ProgramPageModel;

    private view: ProgramPageView;

    constructor() {
        this.model = new ProgramPageModel();
        this.view = new ProgramPageView();
    }

    public async createPage() {
        const trainings = await this.model.getWeekTrainings();
        const settings = await this.model.getSettingsData();
        this.view.render(
            trainings,
            this.handleCardClick.bind(this),
            this.model.week,
            settings!,
            this.handleStatBlockClick.bind(this)
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
        console.log('go to stat');
    }
}

export default ProgramPageController;
