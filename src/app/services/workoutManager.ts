import { IWorkoutManager, TStrategies, TSettings, TWorkoutProgram, TWorkout } from './types';
import { IntensityType, WorkoutType } from './constants';
import trainingsData from './mocks/trainings.json';
import Utils from './utils';
import ClientManager from './clientManager';

class WorkoutManager implements IWorkoutManager {
    private strategies: TStrategies;

    private trainings: TWorkout[];

    private clientManager: ClientManager;

    constructor() {
        this.trainings = [];
        this.clientManager = new ClientManager();
        this.strategies = {
            weight: [IntensityType.medium],
            toned: [IntensityType.medium, IntensityType.low],
            relax: [WorkoutType.meditation, WorkoutType.yoga, WorkoutType.stretch],
            muscle: [WorkoutType.strength, IntensityType.high],
        };
    }

    private async getTrainings(): Promise<void> {
        if (!this.trainings.length) {
            const data = await this.clientManager.getWorkouts();
            if (data) {
                this.trainings = data;
            } else {
                this.trainings = <TWorkout[]>trainingsData;
            }
        }
    }

    public async getProgram(data: TSettings): Promise<TWorkoutProgram> {
        const result: TWorkoutProgram = [];
        let filteredTrainings = await this.getFilteredTrainings(data);
        const chunk = data.workoutsNumber;
        const maxTrainingsPerChunks = Math.floor(filteredTrainings.length / chunk) * chunk;

        if (filteredTrainings.length > maxTrainingsPerChunks) {
            filteredTrainings.length = maxTrainingsPerChunks;
        }
        while (result.length < data.duration) {
            filteredTrainings = Utils.shuffleArr<TWorkout>(filteredTrainings);
            result.push(...Utils.getChunks<TWorkout>(filteredTrainings, chunk));
        }

        result.length = data.duration;

        return result;
    }

    private async getFilteredTrainings(data: TSettings): Promise<TWorkout[]> {
        await this.getTrainings();
        this.trainings = Utils.shuffleArr<TWorkout>(this.trainings);
        const filterArr = this.strategies[data.goal];

        return this.trainings.filter(
            (training: TWorkout) => filterArr.includes(training.intensity) || filterArr.includes(training.type)
        );
    }
}

export default WorkoutManager;
