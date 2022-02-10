import WorkoutManager from '../../services/workoutManager';
import { TSettings, TToken, TWorkoutProgram } from '../../services/types';
import Card from '../../components/card/card';
import storageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';

class ProgramPageModel {
    private wrManager: WorkoutManager;

    private currentWeek: number;

    private program: TWorkoutProgram;

    private cards: Array<Card[]>;

    private client: ClientManager;

    constructor() {
        this.wrManager = new WorkoutManager();
        this.client = new ClientManager();
        this.currentWeek = 0;
        this.program = [];
        this.cards = [];
    }

    public async getWeekTrainings(): Promise<Card[]> {
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
        this.cards = this.program.map((workoutPerWeek) => {
            return workoutPerWeek.map((card) => new Card(card));
        });
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
}

export default ProgramPageModel;
