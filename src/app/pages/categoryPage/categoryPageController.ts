import CategoryPageModel from '../../pages/categoryPage/categoryPageModel';
import CategoryPageView from './categoryPageView';
import Utils from '../../services/utils';
import Card from '../../components/card/card';
import authManager from '../../services/authManager';
import StorageManager from '../../services/storageManager';
import { TToken, TSettings } from '../../services/types';
import { WorkoutType, Message } from '../../services/constants';

export default class CategoryPageController {
  private model: CategoryPageModel;
  private view: CategoryPageView;
  private isLogin: boolean;
  private categoryValues: string[];
  filters: {[key: string]: Array<string>} ;
  

  constructor() {
    this.model = new CategoryPageModel();
    this.view = new CategoryPageView();
    this.isLogin = false;
    this.categoryValues = [];
    this.filters = {};
  }

  public async render(values: Array<string>) {
    this.filters = {};
    const allCards = await this.model.getData();
    this.isLogin = this.checkAuth();
    const [value] = values;
    if(value === 'all') {
      this.view.render(this.isLogin, value, allCards, this.handleCardClick.bind(this), this.signUpHandler.bind(this), this.checkboxHandler.bind(this));
      return;
    }
    const type = <string>Utils.getFilterType(value);
    this.updateFilters(type, value);
    
    const filteredArray = this.model.filterCardArray(this.filters);
    this.formCategoryValues();
    if(filteredArray.length > 0 && this.categoryValues.includes(value)) {
        this.view.render(this.isLogin, value, filteredArray, this.handleCardClick.bind(this), this.signUpHandler.bind(this), this.checkboxHandler.bind(this));
    } else {
        authManager.navigate('browse');
    }
  }

  private formCategoryValues(): void {
    const type = this.model.getType(this.filters);
    switch(type) {
      case 'type':
        this.categoryValues = [            
          WorkoutType.yoga, 
          WorkoutType.stretch, 
          WorkoutType.strength, 
          WorkoutType.pilates,
          WorkoutType.meditation,
          WorkoutType.dance,
          WorkoutType.cardio,
          WorkoutType.boxing,
          WorkoutType.HIIT,
          'allworkouts',
        ]
    }
  }

  private updateFilters(type: string, value: string): void {
    if (!this.filters[type]) {
      this.filters[type] = [];
    }

    if (value === 'allequipment') {
      this.resetFilter(type);
      this.filterWorkouts();
    } else if (!this.filters![type].includes(value)) {
      this.filters![type].push(value);
    } else if (this.filters[type].length === 1) {
      this.resetFilter(type);
    } else {
      const index = this.filters![type].indexOf(value);
      this.filters![type].splice(index, 1);
    }
  }

  private resetFilter(type: string) {
    delete this.filters[type];
  }

  private checkAuth(): boolean {
    let isLogin = false;
    const token = <TToken>StorageManager.getItem('token', 'local');
    const userSettings = <TSettings>StorageManager.getItem('userSettings', 'local');

    if (token && userSettings) {
        isLogin = true;
    }

    return isLogin;
  }

  private signUpHandler(): void {
    authManager.navigate('/register');
  }

  public handleCardClick(e: Event): void {
    const currCard = <HTMLElement>e.currentTarget;
    const workout = this.model.getCardById(currCard.id);
    if (workout) {
        authManager.navigate(`workout/${workout.id}`);
    }
  }

  private checkboxHandler(e: Event): void {
    const parentElement = <HTMLInputElement>e.currentTarget;
    const type = (<string>(<HTMLInputElement>e.currentTarget).dataset.type);
    const value = (<HTMLInputElement>e.target).id;
    
    this.updateFilters(type, value);
    
    this.handleALLOption(parentElement, type, value);
    this.filterWorkouts();
  }

  private handleALLOption(parentElement: HTMLElement, type: string, id: string) {
    const allOption = <HTMLInputElement>parentElement.querySelector(`#all${type}`);
    const allCheckboxes = <NodeListOf<HTMLInputElement>>parentElement.querySelectorAll('input[type=checkbox]');
    
    if (id !== `all${type}` && this.filters[type]) {
      allOption.checked = false;
      allOption.removeAttribute('disabled');
    } else {
      allCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      allOption.checked = true;
      allOption.setAttribute('disabled', 'disabled');
    }
  }

  private filterWorkouts(): void {
    const filteredCards = this.model.filterCardArray(this.filters);
    this.updateCards(filteredCards);
    
    if (filteredCards.length === 0) {
      this.view.renderMessage(Message.noCards);
    }
  }

  private updateCards(filteredCards: Array<Card>): void {
    this.view.renderFilteredWorkouts(filteredCards, this.handleCardClick.bind(this)); 
  }
}