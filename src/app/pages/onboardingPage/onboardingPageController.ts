import OnboardingPageView from './onboardingPageView';
import OnboardingModel from './onboardingPageModel';
import { Height, Weight, Colors, Coefficients, Goal } from '../../services/constants';

class OnboardingPageController {
    private view: OnboardingPageView;
    private model: OnboardingModel;
    private isFeet: boolean;
    private isLbs: boolean;
    private blocks: Array<string>;
    private block: number;
    private classes: Array<string>;

    constructor() {
        this.view = new OnboardingPageView();
        this.model = new OnboardingModel();
        this.isFeet = false;
        this.isLbs = false;
        this.blocks = ['About you', `What's your goal?`, 'How many workouts per week do you want?', 'Select all your favorite type of classes:', 'How much time do you prefer to work out?', 'How many weeks do you want to start with?'];
        this.block = 0;
        this.classes = [];
    }

    public createPage() {
        this.view.render(this.blocks[this.block], this.handleValueSelect.bind(this), this.handleRangeSliderInput.bind(this), this.handleButtonClick.bind(this));
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
      } else if (className.includes('goal')) {
        this.handleGoalSelect(e);
      } else if (className.includes('frequency')) {
        this.handleFrequencySelect(e);
      } else if (className.includes('classes')) {
        this.handleClassesSelect(e);
      } else if (className.includes('length')) {
        this.handleLengthSelect(e);
      } else if (className.includes('duration')) {
        this.handleDurationSelect(e);
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
        case 'desired': 
          minValue = +Weight.min;
          maxValue = +Weight.max;
          (<HTMLElement>e.currentTarget).children[1].children[0].textContent = 
              (!this.isLbs) ?  rangeSlider.value
                             : (Math.round(+rangeSlider.value * Coefficients.toPounds)).toString();
                             
          this.model.changeHandler({'desiredWeight': rangeSlider.value});
          break;
      }
    
      const percent = (+rangeSlider.value - minValue) / (maxValue - minValue) * Coefficients.percent;
      rangeSlider.style.background = `linear-gradient(to right, ${Colors.primary} 0%, ${Colors.primary} ${percent}%, ${Colors.secondary} ${percent}%, ${Colors.secondary} 100%)`;
    }

    private handleGoalSelect(e: Event): void {
      Array.from(<HTMLCollection>(<HTMLElement>e.currentTarget).children).forEach(goal => {
        goal.className = 'goal option z-depth-1';
      });
      (<HTMLElement>e.target).classList.add('active');

      const weightChoiceBlock = <HTMLElement>document.querySelector('.input-group');
      const selectBlock = <HTMLElement>document.querySelector('.select-block');
      if ((<HTMLElement>e.target).dataset.goal === Goal.weight) {
        weightChoiceBlock.classList.remove('hidden');
        selectBlock.classList.add('active');
      } else {
        weightChoiceBlock.classList.add('hidden');
        selectBlock.classList.remove('active');
      }

      this.model.changeHandler({'goal': (<HTMLElement>e.target).dataset.goal});
    }

    public handleFrequencySelect(e: Event): void {
      Array.from(<HTMLCollection>(<HTMLElement>e.currentTarget).children).forEach(frequency => {
        frequency.className = 'frequency option z-depth-1';
      });
      (<HTMLElement>e.target).classList.add('active');

      this.model.changeHandler({'workoutsNumber': (<HTMLElement>e.target).dataset.frequency});
    }

    public handleClassesSelect(e: Event): void {
      (<HTMLElement>e.target).classList.add('active');
      this.classes.push((<HTMLElement>e.target).textContent as string);
      
      this.model.changeHandler({'favWorkouts': this.classes});
    }

    public handleLengthSelect(e: Event): void {
      Array.from(<HTMLCollection>(<HTMLElement>e.currentTarget).children).forEach(length => {
        length.className = 'length option z-depth-1';
      });
      (<HTMLElement>e.target).classList.add('active');

      const min = (<HTMLElement>e.target).dataset.min;
      const max = (<HTMLElement>e.target).dataset.max;
      this.model.changeHandler({'workoutLength': {min: min, max: max}});
    }

    private handleDurationSelect(e: Event): void {
      Array.from(<HTMLCollection>(<HTMLElement>e.currentTarget).children).forEach(duration => {
        duration.className = 'duration option z-depth-1';
      });
      (<HTMLElement>e.target).classList.add('active');

      this.model.changeHandler({'goal': (<HTMLElement>e.target).dataset.duration});
    }

    public handleButtonClick(e: Event): void {
      e.preventDefault();
      if(this.block < this.blocks.length - 1) {
        this.block++;
        this.createPage();
      } else {
        console.log(this.block);
      }
    }
}

export default OnboardingPageController;