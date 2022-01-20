import { IWorkoutManager, TStrategies, TSettings, TWorkoutProgram, TWorkout } from './types';
import { IntensityType, WorkoutType } from './constants';
import trainingsData from './mocks/trainings.json';
import Utils from './utils';

class WorkoutManager implements IWorkoutManager {
    private strategies: TStrategies;

    private trainings: Array<TWorkout>;

    constructor() {
        this.trainings = trainingsData as Array<TWorkout>;
        this.strategies = {
            weight: [IntensityType.medium],
            toned: [IntensityType.medium, IntensityType.low],
            relax: [WorkoutType.meditation, WorkoutType.yoga, WorkoutType.stretch],
            muscle: [WorkoutType.strength, IntensityType.high],
        };
    }

    public getProgram(data: TSettings): TWorkoutProgram {
        const result: TWorkoutProgram = [];
        let filteredTrainings = this.getFilteredTrainings(data);
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

    private getFilteredTrainings(data: TSettings): TWorkout[] {
        this.trainings = Utils.shuffleArr<TWorkout>(this.trainings);
        const filterArr = this.strategies[data.goal];

        return this.trainings.filter(
            (training: TWorkout) => filterArr.includes(training.intensity) || filterArr.includes(training.type)
        );
    }
}

export default WorkoutManager;
