import ClientManager from '../../services/clientManager';
import { IDataExplore } from '../../services/types';
import Utils from '../../services/utils';
class MealPageModel {
    mealData: ClientManager;
    dishTypeArray: string[];
    numFrom: number | null;
    numTo: number | null;
    mealType: Array<string>;
    today:string

    // numTo:number
    constructor() {
        this.today=''
        this.numFrom = this.getNumFrom();
        this.numTo = this.numFrom + 1;
        this.mealData = new ClientManager();
        this.mealType = ['Breakfast', 'Lunch', 'Snack'];
        this.dishTypeArray = ['Desserts', 'Main course', 'Pancake', 'Salad', 'Starter', 'Soup'];
        // 'Starter','Soup','Preps','Omelet','Biscuits and cookies','Cereals'

        // ,'Salad','Starter','Soup','Preps','Omelet','Biscuits and cookies','Cereals','Condiments and sauces','Drinks'
    }
    async getUserMealData(from='0',to='1') {
     
        const userData: Array<IDataExplore> = [];
        for(let mealType of this.mealType){
            const userRecipe = await this.mealData.userData(from,to, mealType, '591-722');
            if(userRecipe){
                userData.push(...userRecipe)
            }
        }
        return userData

    }
    async getExploreData() {
        console.log('data is being loaded');
        const data: Array<IDataExplore> = [];
        for (const dishType of this.dishTypeArray) {
            const recipe = await this.mealData.mealExploreData(
                this.numFrom!.toString(),
                this.numTo!.toString(),
                dishType
            );
            if (recipe) {
                data.push(...recipe);
            }
        }
        return data;
    }


    async getSearchingData(meal = 'Salad') {
        const numTo = this.numFrom! + 6;
        const searchingData = await this.mealData.searchingData(this.numFrom!.toString(), numTo.toString(), meal);
        
        console.log('searchingData',searchingData)
        return searchingData;
    }
  
    getNumFrom() {
        this.numFrom = Utils.randomInteger(0, 100);
        return this.numFrom;
    }
    rememberDateToday(){
        let day=new Date()
        let dd = String(day.getDate()).padStart(2, '0');
        let mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = day.getFullYear();
        this.today = mm + '/' + dd + '/' + yyyy;
        localStorage.setItem('today', JSON.stringify(this.today))
        console.log('day',this.today)
        return this.today
    }
}

export default MealPageModel;
