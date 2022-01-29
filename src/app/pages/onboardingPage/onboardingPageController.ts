import OnboardingPageView from './onboardingPageView';
import OnboardingModel from './onboardingPageModel';
import { Height, Weight, Colors, Coefficients } from '../../services/constants';

class OnboardingPageController {
    private view: OnboardingPageView;
    private model: OnboardingModel;
    private isFeet: boolean;
    private isLbs: boolean;

    constructor() {
        this.view = new OnboardingPageView();
        this.model = new OnboardingModel();
        this.isFeet = false;
        this.isLbs = false;
    }

    public createPage() {
        this.view.render(this.handleValueSelect.bind(this), this.handleRangeSliderInput.bind(this));
    }

    public handleValueSelect(e: Event): void {
      const clickedElement = <HTMLElement>e.target; 
      const className = clickedElement.className;
      
      if(typeof(className) === 'object') return;
      
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

      const clickedElement = <HTMLElement>e.target; 
      const className = clickedElement.className;
      const heightSlider = <HTMLInputElement>document.querySelector('[data-height]');
      const weightSlider = <HTMLInputElement>document.querySelector('[data-weight]');  

      if(className.includes('feet')) {
        this.isFeet = true;
        (<HTMLElement>e.currentTarget).children[1].children[1].textContent = 'ft';
        (<HTMLElement>e.currentTarget).children[1].children[0].textContent = (Math.round(+heightSlider.value * Coefficients.toFeet)).toString();
      } else if (className.includes('centimeters')) {
        this.isFeet = false;
        (<HTMLElement>e.currentTarget).children[1].children[1].textContent = 'cm';
        (<HTMLElement>e.currentTarget).children[1].children[0].textContent = heightSlider.value;
      } else if (className.includes('pounds')) {
        this.isLbs = true;
        (<HTMLElement>e.currentTarget).children[1].children[1].textContent = 'lbs';
        (<HTMLElement>e.currentTarget).children[1].children[0].textContent = (Math.round(+weightSlider.value * Coefficients.toPounds)).toString();
      } else if (className.includes('kilograms')) {
        this.isLbs = false;
        (<HTMLElement>e.currentTarget).children[1].children[1].textContent = 'kg';
        (<HTMLElement>e.currentTarget).children[1].children[0].textContent = weightSlider.value;
      } 
    }

    public handleRangeSliderInput(e: Event): void {
      const parametersBlock = <HTMLElement>e.currentTarget;
      const parametersType = parametersBlock.id;
      
      const rangeSlider = <HTMLInputElement>e.target;
      let minValue = 0;
      let maxValue = 0;

      switch(parametersType) {
        case 'height': 
          minValue = +Height.min;
          maxValue = +Height.max;
          (<HTMLElement>e.currentTarget).children[1].children[0].textContent = 
              (!this.isFeet) ?  rangeSlider.value
                             : (Math.round(+rangeSlider.value * Coefficients.toFeet)).toString();
          
          this.model.changeHandler({'height': rangeSlider.value});
          break;
        case 'weight': 
          minValue = +Weight.min;
          maxValue = +Weight.max;
          (<HTMLElement>e.currentTarget).children[1].children[0].textContent = 
              (!this.isLbs) ?  rangeSlider.value
                             : (Math.round(+rangeSlider.value * Coefficients.toPounds)).toString();
                             
          this.model.changeHandler({'weight': rangeSlider.value});
          break;
      }
    
      const percent = (+rangeSlider.value - minValue) / (maxValue - minValue) * Coefficients.percent;
      rangeSlider.style.background = `linear-gradient(to right, ${Colors.primary} 0%, ${Colors.primary} ${percent}%, ${Colors.secondary} ${percent}%, ${Colors.secondary} 100%)`;
    }
}

export default OnboardingPageController;