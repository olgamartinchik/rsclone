import ClientManager from '../../services/clientManager'
class MealPageModel {
    mealExploreData:ClientManager
    dishTypeArray:string[]
    // exploreDataArray:object[]
    constructor(){
        // this.exploreDataArray=[]
        this.mealExploreData=new ClientManager()
        this.dishTypeArray=['Desserts','Main course','Pancake','Salad','Starter','Soup','Preps','Omelet','Biscuits and cookies','Cereals']
        // ,'Salad','Starter','Soup','Preps','Omelet','Biscuits and cookies','Cereals','Condiments and sauces','Drinks'
    }
   async getExploreData() {
        console.log('data is being loaded');
        let data:Array<any>=[]
        for(let dishType of  this.dishTypeArray){
            let recipe=await this.mealExploreData.mealExploreData('0','1',dishType)
            if(recipe){
                data.push(...recipe)
            }
        }
        
        setTimeout(()=>console.log(data),1000)        
        return  data   
    }
}

export default MealPageModel;
