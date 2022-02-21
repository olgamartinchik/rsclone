import WorkoutManager from '../../services/workoutManager';
import { TSettings, TToken, TWorkout, TWorkoutProgram } from '../../services/types';
import Card from '../../components/card/card';
import storageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';
import DateManager from '../../services/datesManager';

class ProgramPageModel {
    private wrManager: WorkoutManager;

    private dateMr: DateManager;

    private currentWeek: number;

    private program: TWorkoutProgram;

    private cards: Array<Card[]>;

    private client: ClientManager;

    private allCards: Card[];

    constructor() {
        this.wrManager = new WorkoutManager();
        this.client = new ClientManager();
        this.dateMr = new DateManager();
        this.currentWeek = 0;
        this.program = [];
        this.cards = [];
        this.allCards = [];
    }

    public async getWeekTrainings(settings: TSettings): Promise<Card[]> {
        await this.createAllCards();
        this.currentWeek = this.dateMr.getNumWeek(settings);
        const data = await this.getSettingsData();
        const program = await this.getProgram();

        if (!program && data) {
            this.program = await this.wrManager.getProgram(data);
            const userData = storageManager.getItem<TToken>('token', 'local');
            if (userData) {
                await this.client.postProgram(this.program, userData.userID);
            }
        } else if (program) {
            this.program = program;
        }

        const tempCards = storageManager.getItem<Card[][]>('workout-cards', 'local');
        if (tempCards && tempCards.length) {
            this.cards = tempCards.map((workoutPerWeek) =>
                workoutPerWeek.map((card) => new Card(card.data, card.liked, card.completed))
            );
        } else {
            this.cards = this.program.map((workoutPerWeek) => workoutPerWeek.map((card) => new Card(card)));
        }
        if (settings.liked && settings.liked.length) {
            this.cards.forEach((cardArr: Card[]) => {
                cardArr.forEach((card: Card) => {
                    const favCard = settings.liked.find((fav) => fav === card.id);
                    if (favCard) {
                        card.liked = true;
                    }
                });
            });
        }

        this.saveData();
        return this.cards[this.week];
    }

    private async getProgram(): Promise<TWorkoutProgram | void> {
        let program = storageManager.getItem<TWorkoutProgram>('workout-program', 'local');
        if (!program) {
            const userData = storageManager.getItem<TToken>('token', 'local');
            if (userData) {
                program = await this.client.getProgram(userData.userID);
            }
        }

        return program;
    }

    public async createAllCards(): Promise<void> {
        const tempCards = storageManager.getItem<Card[]>('all-cards', 'local');
        if (tempCards) {
            this.allCards = tempCards;
        } else {
            const workouts = await this.client.getWorkouts();
            if (workouts)
                workouts.forEach((workoutElem) => {
                    this.allCards.push(new Card(workoutElem));
                });
            storageManager.addItem('all-cards', this.allCards, 'local');
        }
    }

    private saveData(): void {
        storageManager.addItem('workout-cards', this.cards, 'local');
        storageManager.addItem('workout-program', this.program, 'local');
    }

    public async getSettingsData(): Promise<TSettings | void> {
        let settings = storageManager.getItem<TSettings>('userSettings', 'local');
        if (!settings) {
            const userData = storageManager.getItem<TToken>('token', 'local');

            if (userData) {
                settings = await this.client.getUserSettings(userData.userID);
                storageManager.addItem('userSettings', settings, 'local');
            }
        }
        return settings;
    }

    public getCardById(id: string): Card | void {
        return this.allCards.find((card: Card) => card.id === id);
    }

    public get week(): number {
        return this.currentWeek;
    }

    public get allCard(): Card[][] {
        return this.cards;
    }

    public get getAllCards(): Card[] {
        return this.allCards;
    }

    public async saveSettings(settings: TSettings): Promise<void> {
        storageManager.addItem('userSettings', settings, 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');
        if (userData) {
            await this.client.changeData('userSettings', 'PATCH', userData.userID, settings);
        }
    }

    public saveAllCards(): void {
        storageManager.addItem('all-cards', this.allCards, 'local');
    }
}

export default ProgramPageModel;
