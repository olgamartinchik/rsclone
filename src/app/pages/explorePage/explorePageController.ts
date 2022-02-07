import ExplorePageModel from "./explorePageModel";
import ExplorePageView from "./explorePageView";

class ExploreController{
    private view: ExplorePageView;
    private model: ExplorePageModel;
    constructor(){
      this.view=new ExplorePageView()
      this.model=new ExplorePageModel()
    }
    public async createPage() {
        this.view.render('balanced')
        this.setBgExplorePage('balanced')
            this.activeTabs()
        this. handlerTabs()
       
    }
    activeTabs(){     
        const tabs=document.getElementsByClassName('tabs')[0] as HTMLElement
        if(tabs){
            M.Tabs.init(tabs, {
                swipeable: true,
                duration: 300,
            });
        }
    }
  
    handlerTabs(){
        const tabs=document.getElementsByClassName('tabs')[0]
        tabs.addEventListener('click', this.getDataDiet.bind(this))
    }
    getDataDiet(e:Event){
        if((e.target as HTMLElement).closest('.tab-explore')){
            let data=((e.target as HTMLElement).closest('.tab-explore') as HTMLElement).getAttribute('data-diet') 
            this.setBgExplorePage(data!)
            this.setTitleExplorePage(data!)
        }

    }
    setBgExplorePage(diet:string){
        const mealTypeSection=document.getElementsByClassName('meal-type-section')[0] as HTMLElement
        (mealTypeSection.style as any).backgroundImage=`url(../../assets/exploreMeal/${diet}.jpg)`
    }
    setTitleExplorePage(diet:string){
        const title=document.getElementsByClassName('title-type')[0]
        title.textContent=diet
    }
}
export default ExploreController