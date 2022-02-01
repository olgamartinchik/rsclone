import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';

let search=''
class MealPageController {
    private view: MealPageView;

    private modal: MealPageModel;

    valueData: string;

    // searchingData: any;

    constructor() {
       
        this.view = new MealPageView();
        this.modal = new MealPageModel();
        this.valueData = '';
       
    }

    public async createPage() {
        const mealData=await this.modal.getUserMealData()
        const exploreData = await this.modal.getExploreData();
        const searchingData = await this.modal.getSearchingData(this.valueData ? this.valueData : 'brownie');

        this.view.render(
            mealData,
            this.handlerMealCard.bind(this),
            exploreData,
            this.handlerExploreCard.bind(this),
            searchingData,
            this.handlerSearchingCard.bind(this),
            this.handlerChange.bind(this)
        );
    }
    async handlerChange(e: Event) {     
        const value = (e.target as HTMLInputElement).value;
        search=value.toLowerCase().trim()
        // console.log('value', value,search);
      
        document.onkeyup=async (e:KeyboardEvent)=>{
            e = e || window.event;
            if (e.keyCode === 13) {
              const searchingMeals=document.querySelector('.searching-meals') as HTMLElement
              searchingMeals!.innerHTML=''    
              let data=await this.modal.getSearchingData(search);
              if(data){
                  if(data.length===0){
                searchingMeals!.innerHTML='No matches'
              }else{
                const searchingCards = this.view.getSearchingCards(data, this.handlerSearchingCard);            
                searchingMeals.append(...searchingCards)
              }
              }        
              console.log('data',data)
           }
           return false
        }
    }
    handlerMealCard(e: Event) {
        console.log('click');
    }

    handlerExploreCard(e: Event) {
        console.log('click');
    }

    handlerSearchingCard(e: Event) {
        console.log('click');
    }

 
 
}

export default MealPageController;
