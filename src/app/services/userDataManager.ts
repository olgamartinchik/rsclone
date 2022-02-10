import CalculationCalories from "./calculationCalories"
import DateManager from "./datesManager"
import { TSettings } from "./types"
import StorageManager from './storageManager';

class UserDataManager{
    userSettings:TSettings
    constructor(userSettings:TSettings){
        this.userSettings=userSettings
    }

   async createUserData(){
      await  new CalculationCalories(this.userSettings).getRecipeDate()
      new DateManager(this.userSettings).getArrayDate()
      let weekWorkouts=new DateManager(this.userSettings).getNumWeek()
      StorageManager.addItem('weekWorkouts',weekWorkouts,'local')
      console.log('week',weekWorkouts)
    }
    

}
export default UserDataManager