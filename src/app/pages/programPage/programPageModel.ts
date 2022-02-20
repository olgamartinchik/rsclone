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

    constructor() {
        this.wrManager = new WorkoutManager();
        this.client = new ClientManager();
        this.dateMr = new DateManager();
        this.currentWeek = 0;
        this.program = [];
        this.cards = [];
    }

    public async getWeekTrainings(settings: TSettings): Promise<Card[]> {
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
            this.cards = tempCards
                .map((workoutPerWeek) => workoutPerWeek.map((card) => new Card(card.data, card.liked, card.completed)));
        } else {
            this.cards = this.program.map((workoutPerWeek) => workoutPerWeek.map((card) => new Card(card)));
        }
        if (settings.liked.length) {
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
        return this.cards[this.week].find((card: Card) => card.id === id);
    }

    public get week(): number {
        return this.currentWeek;
    }

    public get allCard(): Card[][] {
        return this.cards;
    }

    public async saveSettings(settings: TSettings): Promise<void> {
        storageManager.addItem('userSettings', settings, 'local');
        const userData = storageManager.getItem<TToken>('token', 'local');;
        if (userData) {
            await this.client.changeData('userSettings', userData.userID, settings);
        }
    }
}

export default ProgramPageModel;
