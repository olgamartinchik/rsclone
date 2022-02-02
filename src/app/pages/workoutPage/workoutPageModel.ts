import Card from '../../components/card/card';
import storageManager from '../../services/storageManager';

class WorkoutPageModel {
    private cards: Array<Card[]>;

    constructor() {
        this.cards = [];
    }

    public getData() {
        const data = storageManager.getItem<Array<Card[]>>('workout-cards', 'local');
        if (data) {
            this.cards = data;
        }
    }

    public getCardById(id: string): Card | void {
        let currCard!: Card;
        this.cards.forEach((card: Card[]) => {
            const cardElem = card.find((elem: Card) => elem.id === id);

            if (cardElem) {
                currCard = cardElem;
            }
        });

        return currCard;
    }
}

export default WorkoutPageModel;
