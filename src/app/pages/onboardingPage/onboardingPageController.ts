import OnboardingPageView from './onboardingPageView';

class OnboardingPageController {
    private view: OnboardingPageView;

    constructor() {
        this.view = new OnboardingPageView();
    }

    public createPage() {
        this.view.render();
    }
}

export default OnboardingPageController;