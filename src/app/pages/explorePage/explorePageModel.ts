import ClientManager from "../../services/clientManager";
import { IDataExplore } from "../../services/types";
import Utils from "../../services/utils";

class ExplorePageModel{
    constructor(){
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
    getActiveClassTabs(diet:string){
        const allTabs=document.getElementsByClassName('tab-explore')  as HTMLCollectionOf<HTMLElement>     
       for(let i=0; i<allTabs.length; i++){
        allTabs[i].classList.remove('active')       
           if(allTabs[i].getAttribute('data-diet')===diet){
            allTabs[i].classList.add('active')
                allTabs[i].style.backgroundColor='rgba(246, 178, 181, 0.2)'            
           }
       }

     
    }
    
}
export default ExplorePageModel