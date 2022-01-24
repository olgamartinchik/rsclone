import cardResultTemplate from './template';
import { TCardResultValues } from './types';

class CardResult {
    private values: TCardResultValues[];

    constructor() {
        this.values = [
            {
                title: 'Best Workouts',
                subTitle: 'Train your mind and body with personalized fitness plans.',
            },
            {
                title: 'Best Meditation',
                subTitle: 'Reduce stress and be more mindful with soothing video meditations.',
            },
            {
                title: 'Best Trainers',
                subTitle: 'Work out with celebrities and world-class trainers.',
            },
            {
                title: 'Always On',
                subTitle: 'Anytime, anywhere. No equipment required.',
            },
        ];
    }

    public set addCard(value: TCardResultValues) {
        this.values.push(value);
    }

    public getTemplate(): string {
        return this.values.reduce(
            (prev, next, index) => prev + cardResultTemplate(next.title, next.subTitle, index + 1),
            ''
        );
    }
}

export default new CardResult();
