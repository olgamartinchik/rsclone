import WorkoutManager from '../../services/workoutManager';
import userSettings from '../../services/mocks/defaultData';
import { TSettings, TWorkoutProgram } from '../../services/types';
import Card from '../../components/card/card';
import storageManager from '../../services/storageManager';

class ProgramPageModel {
    private wrManager: WorkoutManager;

    private currentWeek: number;

    private program: TWorkoutProgram;

    private cards: Array<Card[]>;

    constructor() {
        this.wrManager = new WorkoutManager();
        this.currentWeek = 0;
        this.program = [];
        this.cards = [];
    }

    public async getWeekTrainings(): Promise<Card[]> {
        const data = this.getSettingsData();
        const program = this.getProgram();

        if (!program) {
            this.program = await this.wrManager.getProgram(data);
        } else {
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

    private getSettingsData(): TSettings {
        const data = storageManager.getItem<TSettings>('userSettings', 'local');
        return data ? data : userSettings;
    }

    public getCardById(id: string): Card | void {
        return this.cards[this.week].find((card: Card) => card.id === id);
    }

    public get week(): number {
        return this.currentWeek;
    }
}

export default ProgramPageModel;
