import WorkoutManager from '../../services/workoutManager';
import userSettings from '../../services/mocks/defaultData';
import { TWorkoutProgram } from '../../services/types';
import Card from '../../components/card/card';

class MainPageModel {
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

    public getWeekTrainings(): Card[] {
        this.program = this.wrManager.getProgram(userSettings);
        this.cards = this.program.map((workoutPerWeek) => {
            return workoutPerWeek.map((card) => new Card(card));
        });
        return this.cards[this.week];
    }

    public get week(): number {
        return this.currentWeek;
    }
}

export default MainPageModel;
