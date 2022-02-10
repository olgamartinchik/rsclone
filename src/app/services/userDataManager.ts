import CalculationCalories from "./calculationCalories"
import DateManager from "./datesManager"
import { TSettings } from "./types"


class UserDataManager{
    userSettings:TSettings
    constructor(userSettings:TSettings){
        this.userSettings=userSettings
    }

   async createUserData(){
      await  new CalculationCalories(this.userSettings).getRecipeDate()
      new DateManager(this.userSettings).getArrayDate()
      let numWeek=new DateManager(this.userSettings).getNumWeek()
     
      console.log('numWeek',numWeek)
    }
    

}
export default UserDataManager