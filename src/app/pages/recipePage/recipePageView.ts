import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import storageManager from '../../services/storageManager';
import { TUser } from '../../services/types';

class RecipePageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render() {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());
        const user = <TUser>storageManager.getItem('user', 'local');

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu(true);
        navbar.addProfileLink(user.userName.split('')[0]);

        this.rootNode.insertAdjacentHTML('beforeend', this.createContentExplore());
        this.rootNode.append(footer.getTemplate());
    }

    createContentExplore() {
        // const main = new Node(this.rootNode, 'main', 'main-layout');
        // Node.setChild(main.node, 'h1', 'title-meal', 'Recipe');
        return `
        <main class="main-layuot">
        <section class="about-section">
            <div class="about-container">
                <img src="https://www.edamam.com/web-img/493/4938d6e06c358d491bc82704a2a5a74a.jpg" alt="" />
                <h1>Oven-Roasted Tomato Sauce With Salami, Olives, and Pecorino Recipe</h1>
            </div>
        </section>
        <section class="recipe-section">
            <div class="recipe-container">
                <div class="ingredients-container">
                    <ul>
                        <li>"1 pound cherry or grape tomatoes, halved if they’re large"</li>
                        <li>"2 1/2 tablespoons olive oil"</li>
                        <li>"1 1/4 tablespoons sherry vinegar"</li>
                        <li>"1 teaspoon maple syrup"</li>
                        <li>"2 sprigs fresh thyme"</li>
                        <li>"Kosher salt and freshly ground black pepper"</li>
                        <li>"4 ounces Genoa salami, diced"</li>
                        <li>"1 medium white onion, finely chopped (about 1 cup)"</li>
                        <li>"1 medium clove garlic, minced (about 1 teaspoon)"</li>
                        <li>"2 teaspoons capers, drained and chopped"</li>
                        <li>"1/4 cup pitted, sliced kalamata olives"</li>
                        <li>"1 anchovy, mashed into a paste"</li>
                        <li>"2 tablespoons dry white wine"</li>
                        <li>"12 ounces to 1 pound dry spaghetti"</li>
                        <li>"1 teaspoon zest from 1 lemon"</li>
                        <li>"2 tablespoon finely grated Pecorino cheese"</li>
                    </ul>
                </div>
                <div class="recipe-details-container">
                    <ul>
                        <li>Meal Type: Breakfast</li>
                        <li>Dish Type: Dessert</li>
                        <li>Calories: 2305</li>
                        <li>Number of servings: 4</li>
                        <li>Total Time: 90</li>
                        <li>Total Weight: 1232</li>
                        <li>
                            Health Labels: "Egg-Free", , "Peanut-Free" , "Tree-Nut-Free" , "Soy-Free" ,
                            "Shellfish-Free" , "Pork-Free" , "Crustacean-Free" , "Celery-Free" , "Mustard-Free" ,
                            "Sesame-Free" , "Lupine-Free" , "Mollusk-Free"
                        </li>
                    </ul>
                </div>
            </div>
            <div class="image-container">
                <img src="https://www.edamam.com/food-img/23e/23e727a14f1035bdc2733bb0477efbd2.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/4d6/4d651eaa8a353647746290c7a9b29d84.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/5f6/5f69b84c399d778c4728e9ab4f8065a2.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/ced/ced25c45453a118e531c8aaf33e2ee38.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/3e7/3e7cf3c8d767a90b906447f5e74059f7.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/b1e/b1e1be598ceb08d50d9c1f5d49b49f6a.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/205/205e6bf2399b85d34741892ef91cc603.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/6ee/6ee142951f48aaf94f4312409f8d133d.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/627/627582f390a350d98c367f89c3a943fe.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/822/8221f2141e8dafd469414b20777735ca.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/903/903f0e875a690dce724b7f4b6f09f931.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/a71/a718cf3c52add522128929f1f324d2ab.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/296/296ff2b02ef3822928c3c923e22c7d19.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/70a/70acba3d4c734d7c70ef4efeed85dc8f.jpg" alt="" />
                <img src="https://www.edamam.com/food-img/71a/71a53d043eded9a8914415178a07f879.jpg" alt="" />
            </div>
            <div>
                <h6>
                    See source:
                    <a
                        href="http://www.seriouseats.com/recipes/2014/10/oven-roasted-tomato-sauce-salami-olive-pecorino-recipe.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Original Site</a
                    >
                </h6>
            </div>
        </section>
    </main>
        `;
    }
}
export default RecipePageView;
