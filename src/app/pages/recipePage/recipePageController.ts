import RecipePageModel from "./recipePageModel";
import RecipePageView from "./recipePageView";

class RecipePageController{
    private view: RecipePageView;
    private model: RecipePageModel;
    constructor(){
      this.view=new RecipePageView()
      this.model=new RecipePageModel()
    }
    public async createPage() {
        this.view.render()
    }
}
export default RecipePageController