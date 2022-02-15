import PeriodMealPageModel from './periodMealPageView';

class  PeriodMealPageController {
    private view: PeriodMealPageModel;

    constructor() {
        this.view = new PeriodMealPageModel();
    }

    public createPage() {
        this.view.render();

        (document.getElementsByClassName('main-period')[0] as HTMLElement).style.backgroundImage='url(https://rsclonebackend.herokuapp.com/api/avatar/620b88cbd4314369f9931294)'
    }
}

export default PeriodMealPageController;