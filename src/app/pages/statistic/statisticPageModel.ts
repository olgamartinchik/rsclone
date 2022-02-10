import Card from '../../components/card/card';
import storageManager from '../../services/storageManager';
import CloudinaryManager from '../../services/cloudinarySDK';
import { TToken, TWorkoutProgram } from '../../services/types';
import ClientManager from '../../services/clientManager';

class StatisticPageModel {
    private cards: Array<Card[]>;

    private sdk: CloudinaryManager;

    private client: ClientManager;

    constructor() {
        this.cards = [];
        this.sdk = new CloudinaryManager();
        this.client = new ClientManager();
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

    public async updateWorkoutData(card: Card): Promise<void> {
        const program = storageManager.getItem<TWorkoutProgram>('workout-program', 'local');
        if (program) {
            program.forEach((workoutWeek) => {
                workoutWeek.forEach((workout) => {
                    if (workout._id === card.id) {
                        workout.completed = true;
                    }
                });
            });
            storageManager.addItem('workout-program', program, 'local');
            const userData = storageManager.getItem<TToken>('token', 'local');
            if (userData) {
                await this.client.updateProgram(program, userData.userID);
            }
        }
        storageManager.addItem('workout-cards', this.cards, 'local');
    }
}

export default StatisticPageModel;
