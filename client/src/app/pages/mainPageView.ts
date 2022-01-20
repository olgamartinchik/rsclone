import Card from '../components/card/card';

class MainPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(data: Card[], onclick: (e: Event) => void): void {
        this.rootNode.textContent = '';
        const cardElems = data.map((card) => card.getTemplate(onclick));
        const cardsWrapper = document.createElement('div');
        cardsWrapper.className = 'workout-list';
        cardsWrapper.append(...cardElems);
        this.rootNode.append(cardsWrapper);
    }
}

export default MainPageView;
