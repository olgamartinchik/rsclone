import MealPageModel from "../pages/mealPage/mealPageModel"
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
      await new MealPageModel().getSearchingData('brownie')
      new DateManager().getArrayDate(this.userSettings)
      let numWeek=new DateManager().getNumWeek(this.userSettings)     
     await new MealPageModel().getUserMealData()
     
      console.log('numWeek',numWeek)
    }
    

}
export default UserDataManager