import MainPageModel from './mainPageModel';
import MainPageView from './mainPageView';

class MainPageController {
    private model: MainPageModel;

    private view: MainPageView;

    constructor() {
        this.model = new MainPageModel();
        this.view = new MainPageView();
    }

    public createPage() {
        const trainings = this.model.getWeekTrainings();
        this.view.render(trainings, this.handleCardClick.bind(this), this.model.week);
    }

    public handleCardClick(e: Event): void {
        const currCard = <HTMLElement>e.currentTarget;
        console.log(currCard.id, 'card clicked');
    }
}

export default MainPageController;
