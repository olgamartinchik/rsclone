import statTemplate from './template';

class StatisticWorkoutWidget {
    public getWorkoutStat(minutes = 0, calories = 0): string {
        return statTemplate(minutes, calories);
    }
}

export default StatisticWorkoutWidget;
