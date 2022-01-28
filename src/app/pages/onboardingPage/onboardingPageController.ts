import OnboardingPageView from './onboardingPageView';
import OnboardingModel from './onboardingPageModel';

class OnboardingPageController {
    private view: OnboardingPageView;
    private model: OnboardingModel;

    constructor() {
        this.view = new OnboardingPageView();
        this.model = new OnboardingModel();
    }

    public createPage() {
        this.view.render(this.handleValueSelect.bind(this));
    }

    public handleValueSelect(e: Event): void {
      const clickedElement = <HTMLElement>e.target 
      const className = clickedElement.className;

      if (className.includes('gender-item')) {
          this.handleGenderSelect(e); 
      } else if (className.includes('datepicker-done')) {
        this.handleDayBirthSelect(e);
      } else if (className.includes('icon-select')) {
        this.handleParametersSelect(e);
      }
    }

    private handleGenderSelect(e: Event): void {
      Array.from(<HTMLCollection>(<HTMLElement>e.currentTarget).children).forEach(element => {
        element.classList.remove('active');
      });
      (<HTMLElement>e.target).classList.add('active');
      this.model.changeHandler({'gender': (<string>(<HTMLElement>e.target).textContent)});
    }

    private handleDayBirthSelect(e: Event): void {
      const currentTarget = <HTMLElement>(e.currentTarget);
      const calenderInput = <HTMLInputElement>currentTarget.children.namedItem('datepicker');

      this.model.changeHandler({'age': calenderInput.value});
    }

    private handleParametersSelect(e: Event): void {
      const select = document.querySelector('.select-block') as HTMLElement;
      select.classList.toggle('active');
    }
}

export default OnboardingPageController;