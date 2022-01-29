import OnboardingPageView from './onboardingPageView';
import OnboardingModel from './onboardingPageModel';
import { Height, Weight, Colors, Coefficients } from '../../services/constants';

class OnboardingPageController {
    private view: OnboardingPageView;
    private model: OnboardingModel;

    constructor() {
        this.view = new OnboardingPageView();
        this.model = new OnboardingModel();
    }

    public createPage() {
        this.view.render(this.handleValueSelect.bind(this), this.handleRangeSliderInput.bind(this));
    }

    public handleValueSelect(e: Event): void {
      const clickedElement = <HTMLElement>e.target; 
      const className = clickedElement.className;
      
      if (className.includes('gender-item')) {
          this.handleGenderSelect(e); 
      } else if (className.includes('datepicker-done')) {
        this.handleDayBirthSelect(e);
      } else if (className.includes('icon-select')) {
        this.handleParametersSelect(e);
      } else if (className.includes('unit')) {
        this.handleUnitSelect(e);
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
      const selectBlocks = document.querySelectorAll('.select-block');
      const select = (<HTMLElement>e.currentTarget).children[2];

      selectBlocks.forEach(block => {
        if(block.id !== select.id) block.className = 'select-block';
      });
      select.classList.toggle('active');
    }

    private handleUnitSelect(e: Event): void {
      const nextElement = (<HTMLElement>e.target).nextElementSibling as HTMLElement;
      const previousElement = (<HTMLElement>e.target).previousElementSibling as HTMLElement;
      
      if (nextElement) nextElement.classList.remove('active');
      if (previousElement) previousElement.classList.remove('active');
      
      (<HTMLElement>e.target).classList.add('active');
    }

    public handleRangeSliderInput(e: Event): void {
      const parametersBlock = <HTMLElement>e.currentTarget;
      const parametersType = parametersBlock.id;
      let paramenterValue = (<HTMLElement>e.currentTarget).children[1].children[0].textContent;
      const rangeSlider = <HTMLInputElement>e.target;
      let minValue = 0;
      let maxValue = 0;

      if(parametersType === 'height') {
        minValue = +Height.min;
        maxValue = +Height.max;
      } else if (parametersType === 'weight') {
        minValue = +Weight.min;
        maxValue = +Weight.max;
      }

      const percent = (+rangeSlider.value - minValue) / (maxValue - minValue) * Coefficients.percent;
      rangeSlider.style.background = `linear-gradient(to right, ${Colors.primary} 0%, ${Colors.primary} ${percent}%, ${Colors.secondary} ${percent}%, ${Colors.secondary} 100%)`;

      (<HTMLElement>e.currentTarget).children[1].children[0].textContent = rangeSlider.value;
      console.log(<HTMLInputElement>e.currentTarget);
      console.log((<HTMLElement>e.currentTarget).children[1].children[0]);
    }
}

export default OnboardingPageController;