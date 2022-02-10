
import ClientManager from './clientManager';
import DateManager from './datesManager';
import StorageManager from './storageManager';
import { IDataExplore, TSettings } from './types';
class CalculationCalories{
    userSettings:TSettings
    weight:number
    height:number
    age:number
    gender:string
    goal:string    
    private weightCoefficient:number
    private heightCoefficient:number
    private ageCoefficient:number
    private femaleCaloriesCoefficient:number
    private maleCaloriesCoefficient:number
    private weightCalCoefficient:number
    private tonedCalCoefficient:number
    private relaxCalCoefficient:number
    private muscleCalCoefficient:number
    calories:number

     constructor(userSettings:TSettings){
        this.userSettings=userSettings
        this.weight=this.userSettings.weight
        this.height=this.userSettings.height
        this.age = this.userSettings.age
        this.gender=this.userSettings.gender
        this.goal=this.userSettings.goal
        this.weightCoefficient=10
        this.heightCoefficient=6.25
        this.ageCoefficient=5
        this.femaleCaloriesCoefficient=161
        this.maleCaloriesCoefficient=5
        this.weightCalCoefficient=1.375
        this.tonedCalCoefficient=1.55
        this.relaxCalCoefficient=1.2
        this.muscleCalCoefficient=1.725
        this.calories=0
        
     }
     getFemaleCalories(){
         const baseCalories=(this.weightCoefficient*this.weight)+(this.heightCoefficient*this.height)-(this.ageCoefficient*this.age)-this.femaleCaloriesCoefficient
         return baseCalories
        
     }
      getMaleCalories(){
        const baseCalories=(this.weightCoefficient*this.weight)+(this.heightCoefficient*this.height)-(this.ageCoefficient*this.age)-this.maleCaloriesCoefficient
        return baseCalories
     }
     getCalories(){      
         const baseCalories = this.gender==='male'?  this.getFemaleCalories() : this. getMaleCalories()
         if(this.goal==='weight'){
            this.calories=Math.floor(baseCalories*this.weightCalCoefficient)
         }else if(this.goal==='toned'){
            this.calories=Math.floor(baseCalories*this.tonedCalCoefficient)
         }else if(this.goal==='relax'){
            this.calories=Math.floor(baseCalories*this.relaxCalCoefficient)
         }else if(this.goal==='muscle'){
            this.calories=Math.floor(baseCalories* this.muscleCalCoefficient)
         }
         console.log('result',this.calories,this.goal,baseCalories)

        return this.calories

     }
     async getRecipeDate(){
      const calories=this.getCalories()
      const recipeData= await new ClientManager().getRecipe(calories);
      StorageManager.addItem('allRecipe', recipeData, 'local')
      console.log('recipe',StorageManager.getItem('allRecipe', 'local'))
      this.createUserMeal()
     }
     
     createUserMeal(){
        let periodUserMeal={}
        let dayMeals=['breakfast','lunch/dinner','snack']    
        let arrayDates=new DateManager(this.userSettings).getArrayDate()
        if(StorageManager.getItem('allRecipe', 'local')){        
           let allRecipe=StorageManager.getItem('allRecipe', 'local') as IDataExplore[]

           arrayDates.forEach((date)=>{   
            periodUserMeal[date]=[]         
            dayMeals.forEach((day)=>{
               if(day){
                  periodUserMeal[date].push(allRecipe!.find((meal)=>(meal!.recipe.mealType! as [])!.includes(day as never)) )
               }              
            })
           })
          
           StorageManager.addItem('periodUserMeal',periodUserMeal,'local')

         }

     }
  

  
  
}
export default CalculationCalories