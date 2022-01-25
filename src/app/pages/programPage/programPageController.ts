import router from '../../router/router';
import ProgramPageModel from './programPageModel';
import ProgramPageView from './programPageView';

class ProgramPageController {
    private model: ProgramPageModel;

    private view: ProgramPageView;

    constructor() {
        this.model = new ProgramPageModel();
        this.view = new ProgramPageView();
    }

    public createPage() {
        const trainings = this.model.getWeekTrainings();
        this.view.render(trainings, this.handleCardClick.bind(this), this.model.week);
    }

    public handleCardClick(e: Event): void {
        const currCard = <HTMLElement>e.currentTarget;
        const workout = this.model.getCardById(currCard.id);
        if (workout) {
            router.navigate(`workout/${workout.id}`);
        }
        console.log(currCard.id, 'card clicked');
    }
}

export default ProgramPageController;