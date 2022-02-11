import ClientManager from "../../services/clientManager";
import { IDataExplore } from "../../services/types";
import Utils from "../../services/utils";

class ExplorePageModel{
    exploreDietData:ClientManager
    mealType:Array<string>;
    constructor(){
    this.mealType = ['Breakfast', 'Lunch', 'Snack'];
    this.exploreDietData=new ClientManager()
    }
    getData() {
        console.log('data is being loaded');
    }
//    async getDataExplore(diet:string){
//        const dietData:Array<IDataExplore>=[];
//         let randomNum=Utils.randomInteger(1, 50)
//         for(let type of this.mealType){
//         let data =await this.exploreDietData.mealExploreData(String(randomNum),String(randomNum+1),diet,type)
//         dietData.push(...data)
//         }
        
//         return dietData
//     }
    
}
export default ExplorePageModel