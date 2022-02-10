import statTemplate from './template';

class StatisticWorkoutWidget {
    public getWorkoutStat(minutes: number = 0, calories: number = 0): string {
        return statTemplate(minutes, calories);
    }
}

export default StatisticWorkoutWidget;