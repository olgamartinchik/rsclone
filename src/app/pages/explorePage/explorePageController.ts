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
        this.view.render()
    }
}
export default ExploreController