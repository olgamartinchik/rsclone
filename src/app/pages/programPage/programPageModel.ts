import WorkoutManager from '../../services/workoutManager';
import userSettings from '../../services/mocks/defaultData';
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
        const program = this.getProgram();

        if (!program && data) {
            this.program = await this.wrManager.getProgram(data);
        } else if (program) {
            this.program = program;
        }
        this.cards = this.program.map((workoutPerWeek) => {
            return workoutPerWeek.map((card) => new Card(card));
        });
        this.saveData();
        return this.cards[this.week];
    }

    private getProgram() {
        return storageManager.getItem<TWorkoutProgram>('workout-program', 'local');
    }

    private saveData(): void {
        storageManager.addItem('workout-cards', this.cards, 'local');
        storageManager.addItem('workout-program', this.program, 'local');
    }

    private async getSettingsData(): Promise<TSettings | void> {
        let settings = storageManager.getItem<TSettings>('userSettings', 'local');
        if (!settings) {
            const userData = storageManager.getItem<TToken>('token', 'local');
            if (userData) {
                settings = await this.client.getUserSettings(userData.userID);
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
