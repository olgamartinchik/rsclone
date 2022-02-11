import ClientManager from '../../services/clientManager';
import { IDataExplore, TSettings } from '../../services/types';
import Utils from '../../services/utils';
import StorageManager from '../../services/storageManager'
import DateManager from '../../services/datesManager';
import CalculationCalories from '../../services/calculationCalories';

class MealPageModel {
    mealData: ClientManager;

    dishType: IDataExplore[];

    numFrom: number | null;

    numTo: number | null;

    mealType: Array<string>;

    today: DateManager;

    constructor() {
        this.today = new DateManager();
        this.numFrom = this.getNumFrom();
        this.numTo = this.numFrom + 1;
        this.mealData = new ClientManager();
        this.mealType = ['Breakfast', 'Lunch', 'Snack'];
        this.dishType = [
            { recipe: { diet: 'balanced', image: 'balanced' } },
            { recipe: { diet: 'high-fiber', image: 'high-fiber' } },
            { recipe: { diet: 'low-carb', image: 'low-carb' } },
            { recipe: { diet: 'low-fat', image: 'low-fat' } },
            { recipe: { diet: 'low-sodium', image: 'low-sodium' } },
        ];
    }

    // async getUserMealData(from = '0', to = '1') {
      
    //     const userData: Array<IDataExplore> = [];
    //     for (const mealType of this.mealType) {
    //         const userRecipe = await this.mealData.userData(from, to, mealType, '591-722');
    //         if (userRecipe) {
    //             userData.push(...userRecipe);
    //         }
    //     }
    //     if(  StorageManager.getItem('periodUserMeal','local')){
    //         console.log('true')
           
    //         let periodUserMeal=StorageManager.getItem('periodUserMeal','local') as Array<IDataExplore>
         
    //         // userData.push(...periodUserMeal[this.today.dateToday()])

    //     }
       
    //     console.log('userData', userData)
    //     return userData;
    // }

  async  getUserMealData(){
        const userData: Array<IDataExplore> = [];

        // if( StorageManager.getItem('periodUserMeal','local')){
            console.log('true')
                   let periodUserMeal=StorageManager.getItem('periodUserMeal','local') as Array<IDataExplore> ?? await new CalculationCalories(StorageManager.getItem('userSettings','local') as TSettings).createUserMeal()  
            // let periodUserMeal=StorageManager.getItem('periodUserMeal','local') as Array<IDataExplore>
            periodUserMeal[this.today.dateToday()].forEach(meal=>{
                if(meal){
                    userData.push(meal)
                }
            })
            // userData.push(...periodUserMeal[this.today.dateToday()])
        // } else{

        // }      
        console.log('userData', userData);
        StorageManager.addItem('mealData', userData, 'local')
        return userData;

    }


    async getSearchingData(meal = 'Salad') {
        const numTo = this.numFrom! + 6;
        const searchingData = await this.mealData.searchingData(this.numFrom!.toString(), numTo.toString(), meal);
        if(searchingData){
            StorageManager.addItem('searchingData', searchingData, 'local')
        }
        
        return searchingData;
    }

    getNumFrom() {
        this.numFrom = Utils.randomInteger(0, 100);
        return this.numFrom;
    }

    // rememberDateToday() {
    //     const day = new Date();
    //     const dd = String(day.getDate()).padStart(2, '0');
    //     const mm = String(day.getMonth() + 1).padStart(2, '0');
    //     const yyyy = day.getFullYear();
    //     this.today = mm + '-' + dd + '-' + yyyy;
    //     return this.today;
    // }
}

export default MealPageModel;
