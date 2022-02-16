import ExplorePageModel from '../explorePage/explorePageModel';
import RecipePageModel from './recipePageModel';
import RecipePageView from './recipePageView';
import StorageApiManager from '../../services/storageManager';
import { IDataExplore } from '../../services/types';

class RecipePageController {
    private view: RecipePageView;

    private model: RecipePageModel;

    constructor() {
        this.view = new RecipePageView();
        this.model = new RecipePageModel();
    }

    public async createPage() {
        let backPage = '';
        if (StorageApiManager.getItem('backPage', 'local')) {
            backPage = StorageApiManager.getItem('backPage', 'local') as string;
        } else {
            backPage = '#meal';
        }
        if (StorageApiManager.getItem('recipePageData', 'local')) {
            const recipePageData = StorageApiManager.getItem('recipePageData', 'local') as IDataExplore;
            this.view.render(recipePageData, backPage);
        }
    }
}
export default RecipePageController;
