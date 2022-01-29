import {exploreCardTemplate,mealCardTemplate} from './templateMealCard'
class MealCard{
    private rootNode: HTMLElement;
    private data: any;
    constructor(data:any){
        this.data=data
        this.rootNode=document.createElement('div')
        this.rootNode.className = 'explore-card';
    }

    public getExploreTemplate(onclick: (e: Event) => void):HTMLElement{
        this.rootNode.onclick = (e: Event) => onclick(e);
        this.rootNode.insertAdjacentHTML('afterbegin', exploreCardTemplate(this.data));
        console.log('this.rootNode',this.rootNode)
        return this.rootNode;
    }
    public getMealTemplate(){
        
    }
   
}
export default MealCard