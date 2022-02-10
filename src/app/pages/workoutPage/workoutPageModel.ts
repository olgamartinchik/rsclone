import Card from '../../components/card/card';
import storageManager from '../../services/storageManager';
import CloudinaryManager from '../../services/cloudinarySDK';

class WorkoutPageModel {
    private cards: Array<Card[]>;

    private sdk: CloudinaryManager;

    constructor() {
        this.cards = [];
        this.sdk = new CloudinaryManager();
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

    public getVideoLink(id: string): string {
        const card = this.getCardById(id);
        let url = '';
        if (card) {
            url = this.sdk.getVideoUrl(card.data.title);
        }

        return url;
    }
}

export default WorkoutPageModel;
