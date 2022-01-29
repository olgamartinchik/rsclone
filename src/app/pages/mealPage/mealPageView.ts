import MealCard from '../../components/card/mealCard';
import footer from '../../components/footer/footer';
import header from '../../components/header/header';
import NavBar from '../../components/header/navbar';
import Node from '../../components/Node';

class MealPageView {
    private rootNode: HTMLElement;
    // getExploreTemplate:Node<HTMLElement>
    cardsWrapper!: Node<HTMLElement>;
    contentBlock!: Node<HTMLElement>;
    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
        // this.getExploreTemplate=mew MealCard()
    }

    render(exploreData:object[],onclick: (e: Event) => void) {
        this.rootNode.textContent = '';
        this.rootNode.append(header.getTemplate());

        const navWrapper = this.rootNode.querySelector('.nav-wrapper') as HTMLElement;
        const navbar = new NavBar(navWrapper, ['Program', 'Browse', 'Meal', 'Settings'], false, [
            'user',
            'browse',
            'meal',
            'settings',
        ]);
        navbar.generateMenu();
        navbar.addProfileLink('O');
        // this.rootNode.insertAdjacentHTML('beforeend', this.getSectionForDayMeals() );
        // `<main class="main-page"><span>This is Meal Page!</span></main>`
        this.createContentMeal(exploreData,onclick)

        this.rootNode.append(footer.getTemplate());
    }
    createContentMeal(exploreData:object[],onclick: (e: Event) => void){
        const main=new Node(this.rootNode, 'main', 'main-page');
        const sectionUserMeal=new Node(main.node, 'section', 'section meal-section');
        const cardsUserMealContainer=new Node(sectionUserMeal.node, 'div', 'meal-card-container');    
        Node.setChild(cardsUserMealContainer.node, 'h5', 'title-meal', 'YOUR MEALS');
        Node.setChild(cardsUserMealContainer.node, 'div', 'divider', '');
        const dayMealContainer=new Node(cardsUserMealContainer.node, 'div', 'day-meals'); 

        const sectionExplore=new Node(main.node, 'section', 'section meal-section');
        const mealExploreContainer=new Node(sectionExplore.node, 'div', 'meal-explore-container');
        const exploreContainer=new Node(mealExploreContainer.node, 'div', 'meal-explore');
        Node.setChild(exploreContainer.node, 'h5', 'title-meal', 'EXPLORE');
        const cardsExploreContainer=new Node(exploreContainer.node, 'div', 'explore-container');
        
        let cards=this.getExploreCards(exploreData,onclick)
        cardsExploreContainer.node.append(...cards)
        console.log('cards',cards)


        const sectionSearch=new Node(main.node, 'section', 'section meal-section');
        const searchContainer=new Node(sectionSearch.node, 'div', 'meal-card-container searching-container');
        Node.setChild(searchContainer.node, 'h5', 'title-meal', 'Find the recipe');
        searchContainer.node.insertAdjacentHTML('beforeend',this.getInputContainer())
    }
    getInputContainer(){
        return `
        <div class="input-wrapper">
            <input type="text" class="search-meals" placeholder="For example: brownie" />
         </div>
        `
    }
  
    getExploreCards(exploreData:object[],onclick: (e: Event) => void ){
        console.log('exploreData',exploreData)
      let cards=  exploreData.map(data=>new MealCard(data).getExploreTemplate(onclick)
       )
        
        console.log('cards1',cards)
        
        return cards
    }

}

export default MealPageView;
