import Button from '../../components/Button';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';
import cardResult from '../../components/cardResult/cardResult';

class MainPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(signUpHandler: () => void): void {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Team', 'Login'], true);
        navbar.generateMenu(false);
        if (navbar.button) {
            navbar.button.button.node.onclick = () => signUpHandler();
        }

        this.createMainLayout(signUpHandler);

        this.rootNode.append(footer.getTemplate());
    }

    private createMainLayout(signUpHandler: () => void) {
        const main = new Node(this.rootNode, 'main', '');
        const sectionPromo = new Node(main.node, 'section', 'promo');
        const promoWrapper = new Node(sectionPromo.node, 'section', 'wrapper promo-wrapper');
        promoWrapper.node.insertAdjacentHTML('afterbegin', this.getPromoSectionTitle());
        const btnContainer = new Node(promoWrapper.node, 'div', 'btn-container');
        const btnSignUp = new Button(btnContainer.node, 'Signup for free');
        btnSignUp.button.node.onclick = () => signUpHandler();

        const sectionResults = new Node(main.node, 'section', 'results');
        const resultsWrapper = new Node(sectionResults.node, 'div', 'wrapper results-wrapper');
        resultsWrapper.node.insertAdjacentHTML('afterbegin', this.getResultsSectionTitle());
        const resultsContent = new Node(resultsWrapper.node, 'div', 'results-content');
        resultsContent.node.insertAdjacentHTML('beforeend', cardResult.getTemplate());
    }

    private getPromoSectionTitle() {
        return `
        <h1 class="title promo-title">
            #1 Free Fitness App.
            <br class="mb-hide" />
            Work Out Anytime. Anywhere.
          </h1>
          <h1 class="title promo-title-tablet">
            #1 Free
            <br class="mb-hide" />
            Fitness App.
          </h1>
          <p class="subtitle">Unlimited access to the world’s best workouts from celebrity trainers</p>
        `;
    }

    private getResultsSectionTitle() {
        return `
        <h2 class="title results-title">Get FitOn. Get Results.</h2>
          <p class="subtitle results-subtitle">
            Join 10+ million members on the top digital fitness platform and stay toned, lose weight, get
            strong, reduce stress, and reach your goals.
          </p>
        `;
    }
}

export default MainPageView;
