import CategoryPageModel from '../../pages/categoryPage/categoryPageModel';
import CategoryPageView from './categoryPageView';
import authManager from '../../services/authManager';
import StorageManager from '../../services/storageManager';
import { TToken, TSettings } from '../../services/types';
import { WorkoutType } from '../../services/constants';

export default class CategoryPageController {
  private model: CategoryPageModel;
  private view: CategoryPageView;
  private isLogin: boolean;
  categoryValues: string[];

  constructor() {
    this.model = new CategoryPageModel();
    this.view = new CategoryPageView();
    this.isLogin = false;
    this.categoryValues = [];
  }

  public async render(values: Array<string>) {
    const [value] = values;
    this.isLogin = this.checkAuth();
    await this.model.getData();
    const filteredArray = this.model.filterCardArray(value);
    this.formCategoryValues();
    if(filteredArray.length > 0 && this.categoryValues.includes(value)) {
        this.view.render(this.isLogin, value, filteredArray, this.handleCardClick.bind(this), this.signUpHandler.bind(this),);
    } else {
        authManager.navigate('browse');
    }
  }

  private formCategoryValues(): void {
    const type = this.model.getType();
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
          WorkoutType.HIIT
        ]
    }
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
}