import { IDataExplore } from '../../services/types';
import MealPageModel from './mealPageModel';
import MealPageView from './mealPageView';

class MealPageController {
    private view: MealPageView;
    private modal: MealPageModel;
    inputValue: string;
    mealData:IDataExplore[]|null;
    exploreData:IDataExplore[]|null;
    searchingData:IDataExplore[]|null;


    constructor() {       
        this.view = new MealPageView();
        this.modal = new MealPageModel();
        this.inputValue = '';
        this.mealData=null;
        this.exploreData=null;
        this.searchingData=null;
        if (localStorage.getItem('mealData')){
            this.mealData=JSON.parse(localStorage.getItem('mealData')!)
        }
        if (localStorage.getItem('exploreData')){
            this.exploreData=JSON.parse(localStorage.getItem('exploreData')!)
        }
        if (localStorage.getItem('searchingData')){
            this.searchingData=JSON.parse(localStorage.getItem('searchingData')!)
        }
       
    }

    public async createPage() {
        if(!this.mealData||this.mealData.length===0){
             this.mealData=await this.modal.getUserMealData()
             localStorage.setItem('mealData', JSON.stringify(this.mealData))
        }
       if(!this.exploreData||this.exploreData.length===0){
            this.exploreData = await this.modal.getExploreData();
            localStorage.setItem('exploreData', JSON.stringify(this.exploreData))
       }
       if(!this.searchingData||this.searchingData.length===0){
        this.searchingData = await this.modal.getSearchingData( 'brownie');
        localStorage.setItem('searchingData', JSON.stringify(this.searchingData))
       }
       
        this.view.render(
            this.mealData!,
            this.handlerMealCard.bind(this),
            this.exploreData!,
            this.handlerExploreCard.bind(this),
            this.searchingData!,
            this.handlerSearchingCard.bind(this),
            this.handlerChange.bind(this),
            this.handlerBtn.bind(this)
        );
    }
    async handlerChange(e: Event) {     
        const value = (e.target as HTMLInputElement).value;
        this.inputValue=value.toLowerCase().trim()     
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

    async handlerBtn(){
        console.log('click')        
        if(this.inputValue){
            const searchingMeals=document.querySelector('.searching-meals') as HTMLElement
            searchingMeals!.innerHTML=''
            this.searchingData=await this.modal.getSearchingData(this.inputValue);
            localStorage.setItem('searchingData', JSON.stringify(this.searchingData))
            if(this.searchingData){
                if(this.searchingData.length===0){
                    searchingMeals!.innerHTML='No matches'
                }else{
                    const searchingCards = this.view.getSearchingCards(this.searchingData, this.handlerSearchingCard);            
                    searchingMeals.append(...searchingCards)
                }
            }
        }      
    } 
}

export default MealPageController;
