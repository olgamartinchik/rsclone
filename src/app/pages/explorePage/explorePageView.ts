import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';

class ExplorePageView{
    private rootNode: HTMLElement;
    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }
    render(){
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu('Meal');
        navbar.addProfileLink('O');

        this.rootNode.insertAdjacentHTML(
            'beforeend',
            this.createContentExplore()
        );
        this.rootNode.append(footer.getTemplate());
    }
    createContentExplore(){
        // const main = new Node(this.rootNode, 'main', 'main-layout');
        // Node.setChild(main.node, 'h1', 'title-meal', 'EXPLORE');
        return `
        <main class="main-layuot">
        <section class="meal-type-section">
            <h1 class="title-type">balanced</h1>
        </section>
        <section class="meal-section">
            <div class="tabs-container">
                <ul class="diet-list">
                    <li class="active">balanced</li>
                    <li>high-fiber</li>
                    <li>high-protein</li>
                    <li>low-carb</li>
                    <li>low-fat</li>
                    <li>low-sodium</li>
                </ul>
            </div>
            <div class="explore-container">
                <div class="meal-card">
                    <div class="col s12 m6">
                        <div class="card">
                            <div class="card-image">
                                <img
                                    src="https://www.edamam.com/web-img/7ff/7ffa5b0f12fcbede921e187fdc2f5348.jpg"
                                />
                            </div>
                            <div class="card-content">
                                <h6 class="title-meal-card">BREAKFAST</h6>
                                <p class="subtitle-day-meal">Sausage, Cheese And Potato Breakfast Casserole</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="meal-card">
                    <div class="col s12 m6">
                        <div class="card">
                            <div class="card-image">
                                <img
                                    src="https://www.edamam.com/web-img/193/193f045bd47a8339cd0345b9e43b91eb.jpg"
                                />
                            </div>
                            <div class="card-content">
                                <h6 class="title-meal-card">Lunch</h6>
                                <p class="subtitle-day-meal">Party-Pan Pizza</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="meal-card">
                    <div class="col s12 m6">
                        <div class="card">
                            <div class="card-image">
                                <img
                                    src="https://www.edamam.com/web-img/3b6/3b655bdb110f68bff9b11fc3234e8a9e.jpg"
                                />
                            </div>
                            <div class="card-content">
                                <h6 class="title-meal-card">Snack</h6>
                                <p class="subtitle-day-meal">
                                    Sicilian-Style Spaghetti Alla Carrettiera (Fresh Tomato and Garlic Sauce) Recipe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
        `
    }
}

export default ExplorePageView