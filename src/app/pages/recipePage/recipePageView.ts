import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import { IDataExplore } from '../../services/types';

class RecipePageView {
    private rootNode: HTMLElement;

    private rootNodeImgContainer: HTMLElement;

    private tabsArray: Array<string>;

    private rootNodeIngredientsList: HTMLElement;

    private rootNodeIngrDetailsList: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        this.rootNodeImgContainer = <HTMLElement>document.createElement('div');
        this.rootNodeImgContainer.className = 'image-container';
        this.tabsArray = ['ingredients', 'recipe-details'];
        this.rootNodeIngredientsList = <HTMLElement>document.createElement('ul');
        this.rootNodeIngredientsList.className = 'recipe-list';
        this.rootNodeIngrDetailsList = <HTMLElement>document.createElement('ul');
    }

    render(recipePageData: IDataExplore, backPage: string) {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('');
        navbar.addProfileLink('O');

        this.createContentExplore(recipePageData, backPage);

        this.rootNode.append(footer.getTemplate());
    }

    createContentExplore(recipePageData: IDataExplore, backPage: string) {
        const main = new Node(this.rootNode, 'main', 'main-layout recipe-main');
        const linkBack = new Node(main.node, 'a', '');
        linkBack.setAttribute('href', `${backPage}`);
        Node.setChild(linkBack.node, 'i', 'fas fa-long-arrow-alt-left black-arrow');
        const sectionAbout = new Node(main.node, 'section', 'about-section');
        Node.setChild(sectionAbout.node, 'h1', '', 'recipe');
        const aboutContainer = new Node(sectionAbout.node, 'div', 'about-container');
        const imgRecipe = new Node(aboutContainer.node, 'img', '');
        imgRecipe.setAttribute('alt', '');
        imgRecipe.setAttribute('src', `${recipePageData.recipe.image}`);

        const recipeSection = new Node(main.node, 'section', 'recipe-section');
        const recipeContainer = new Node(recipeSection.node, 'div', 'recipe-container');
        const titleRecipe = new Node(recipeContainer.node, 'div', 'title-recipe');
        Node.setChild(titleRecipe.node, 'h4', '', `${recipePageData.recipe.mealType}`);
        Node.setChild(titleRecipe.node, 'h2', '', `${recipePageData.recipe.label}`);
        titleRecipe.append(this.getImagesRecipe(recipePageData));
        const sourceContainer = new Node(titleRecipe.node, 'div', '');
        const titleSource = new Node(sourceContainer.node, 'h6', '', 'See source: ');
        const linkSource = new Node(titleSource.node, 'a', 'source-link', 'Original Recipe');
        linkSource.setAttribute('href', `${recipePageData.recipe.url}`);
        linkSource.setAttribute('target', '_blank');
        linkSource.setAttribute('rel', 'noopener noreferrer');

        const tabs = new Node(recipeContainer.node, 'div', 'tads-recipe');
        this.tabsArray.forEach((tab, ind) => {
            const input = new Node(tabs.node, 'input', '');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'tab-btn');
            input.setAttribute('id', `tab-btn-${ind + 1}`);
            input.setAttribute('value', '');
            if (ind === 0) {
                input.setAttribute('checked', 'true');
            }
            const label = new Node(tabs.node, 'label', '', `${tab}`);
            label.setAttribute('for', `tab-btn-${ind + 1}`);
        });
        //
        const recipeContent = new Node(tabs.node, 'div', 'content-recipe');
        recipeContent.setAttribute('id', 'content-1');
        const ingredientsContainer = new Node(recipeContent.node, 'div', 'ingredients-container');
        ingredientsContainer.append(this.getIngredientsList(recipePageData));

        const recipeDetails = new Node(tabs.node, 'div', 'content-recipe');
        recipeDetails.setAttribute('id', 'content-2');
        const detailsContainer = new Node(recipeDetails.node, 'div', 'recipe-details-container');
        detailsContainer.append(this.getListDetailsIngredients(recipePageData));
    }

    getImagesRecipe(recipePageData: IDataExplore) {
        this.rootNodeImgContainer.textContent = '';
        Array.from(recipePageData.recipe.ingredients!).forEach((ingredient) => {
            if (ingredient.image) {
                const image = new Node(this.rootNodeImgContainer, 'img', '');
                image.setAttribute('alt', '');

                image.setAttribute('src', `${ingredient.image}`);
            }
        });
        return this.rootNodeImgContainer;
    }

    getIngredientsList(recipePageData: IDataExplore) {
        this.rootNodeIngredientsList.textContent = '';
        Array.from(recipePageData.recipe.ingredientLines!).forEach((ingredient) => {
            const li = new Node(this.rootNodeIngredientsList, 'li', '', `${ingredient}`);
        });

        return this.rootNodeIngredientsList;
    }

    getDetailsIngredients(recipePageData: IDataExplore) {
        const detailsData = {};
        detailsData['Dish Type: '] = recipePageData.recipe.dishType;
        detailsData['Calories: '] =
            Math.round(Number(recipePageData.recipe.calories) / recipePageData.recipe.yield!) + ' kcal/1 per';
        detailsData['Number of servings: '] = recipePageData.recipe.yield;
        detailsData['Total Time: '] = recipePageData.recipe.totalTime + ' min';
        detailsData['Total Weight: '] = Math.round(Number(recipePageData.recipe.totalWeight)) + ' g';
        detailsData['Health Labels: '] = recipePageData.recipe.healthLabels?.join(', ');

        return detailsData;
    }

    getListDetailsIngredients(recipePageData: IDataExplore) {
        this.rootNodeIngrDetailsList.textContent = '';
        const detailsData = this.getDetailsIngredients(recipePageData);

        for (const detail in detailsData) {
            const li = new Node(this.rootNodeIngrDetailsList, 'li', '');
            Node.setChild(li.node, 'span', 'title-details', `${detail}`);
            Node.setChild(li.node, 'span', '', `${detailsData[detail]}`);
        }

        return this.rootNodeIngrDetailsList;
    }
}
export default RecipePageView;
