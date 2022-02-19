import ExplorePageModel from './explorePageModel';
import ExplorePageView from './explorePageView';
import StorageApiManager from '../../services/storageManager';
import { IDataExplore } from '../../services/types';
class ExploreController {
    private view: ExplorePageView;

    private model: ExplorePageModel;

    dietData: Array<IDataExplore> | null | void;

    constructor() {
        this.view = new ExplorePageView();
        this.model = new ExplorePageModel();
        this.dietData = null;
    }

    public async createPage() {
        if (StorageApiManager.getItem('diet', 'local')) {
            const diet = StorageApiManager.getItem('diet', 'local') as string;

            this.view.render(diet);
            this.setBgExplorePage(diet);
            this.handlerTabs();
            this.model.getActiveClassTabs(diet);

            this.model.activeTabs();
            this.setCards(diet);
        }
    }

    handlerTabs() {
        const tabs = document.getElementsByClassName('tabs')[0];
        tabs.addEventListener('click', this.getDataDiet.bind(this));
    }

    getDataDiet(e: Event) {
        const allTabs = document.getElementsByClassName('tab-explore') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < allTabs.length; i++) {
            allTabs[i].style.backgroundColor = '';
        }
        if ((e.target as HTMLElement).closest('.tab-explore')) {
            const diet = ((e.target as HTMLElement).closest('.tab-explore') as HTMLElement).getAttribute('data-diet');
            this.setBgExplorePage(diet!);
            this.setTitleExplorePage(diet!);
            StorageApiManager.addItem('diet', diet, 'local');
            this.setCards(diet!);
        }
    }

    setBgExplorePage(diet: string) {
        const mealTypeSection = document.getElementsByClassName('meal-type-section')[0] as HTMLElement;
        (mealTypeSection.style as any).backgroundImage = `url(../../assets/exploreMeal/${diet}.jpg)`;
    }

    setTitleExplorePage(diet: string) {
        const title = document.getElementsByClassName('title-type')[0];
        title.textContent = diet;
    }

    async setCards(diet: string) {
        const containersCards = document.getElementsByClassName('diet-container');
        for (let i = 0; i < containersCards.length; i++) {
            if (containersCards[i].getAttribute('data-diet') === diet) {
                containersCards[i].innerHTML = '';

                if (StorageApiManager.getItem(`dietData-${diet}`, 'local')) {
                    this.dietData = StorageApiManager.getItem(`dietData-${diet}`, 'local');
                } else {
                    if (StorageApiManager.getItem('allRecipe', 'local')) {
                        const data = StorageApiManager.getItem('allRecipe', 'local') as IDataExplore[];
                        this.dietData = data.filter((meal) =>
                            String(meal.recipe.dietLabels!).toLowerCase().includes(diet)
                        );
                    }
                    if (this.dietData && (this.dietData as IDataExplore[]).length !== 0) {
                        StorageApiManager.addItem(`dietData-${diet}`, this.dietData, 'local');
                    }
                }

                if (this.dietData) {
                    const cards = this.view.getCardsDiet(this.dietData!, this.handlersDietCards);
                    containersCards[i].append(...cards);
                }
            }
        }
    }

    handlersDietCards(e: Event) {
        if ((e.target as HTMLElement).closest('.meal-card')) {
            const card = (e.target as HTMLElement).closest('.meal-card');
            const cardNum = card!.getAttribute('data-num');
            const localDiet = StorageApiManager.getItem('diet', 'local');
            const recipePageData = (StorageApiManager.getItem(`dietData-${localDiet}`, 'local') as Array<IDataExplore>)[
                Number(cardNum)
            ];

            StorageApiManager.addItem('recipePageData', recipePageData, 'local');
        }
    }
}
export default ExploreController;
