import { TBadge, TProgressData } from './types';
import { WorkoutType, BadgeSrc, BadgeName, BadgeText, BadgeActiveSrc } from './constants';

export default class Utils {
    static getChunks<T>(dataArr: T[], chunk: number): Array<T[]> {
        return dataArr.reduce((resultArray: Array<T[]>, item: T, index: number) => {
            const chunkIndex = Math.floor(index / chunk);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [];
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
        }, [] as Array<T[]>);
    }

    static shuffleArr<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    static randomInteger(min: number, max: number): number {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    static getMonth(month: string): number {
        let targetMonth = 0;
        switch (month) {
            case 'Jan':
                targetMonth = 0;
                break;
            case 'Feb':
                targetMonth = 1;
                break;
            case 'Mar':
                targetMonth = 2;
                break;
            case 'Apr':
                targetMonth = 3;
                break;
            case 'May':
                targetMonth = 4;
                break;
            case 'Jun':
                targetMonth = 5;
                break;
            case 'Jul':
                targetMonth = 6;
                break;
            case 'Aug':
                targetMonth = 7;
                break;
            case 'Sep':
                targetMonth = 8;
                break;
            case 'Oct':
                targetMonth = 9;
                break;
            case 'Nov':
                targetMonth = 10;
                break;
            case 'Dec':
                targetMonth = 11;
                break;
        }
        return targetMonth;
    }

    static getTime(time: number): string {
        let minutes = Math.floor(time / 60);
        let seconds = Math.round(time % 60);
        if (seconds === 60) {
            seconds = 0;
            minutes += 1;
        }

        return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
    }

    static compareObjects<T>(object1: T, object2: T): boolean {
        const props1 = Object.getOwnPropertyNames(object1);
        const props2 = Object.getOwnPropertyNames(object2);

        if (props1.length !== props2.length) {
            return false;
        }

        for (let i = 0; i < props1.length; i += 1) {
            const prop = props1[i];
            const bothAreObjects = typeof object1[prop] === 'object' && typeof object2[prop] === 'object';

            if (
                (!bothAreObjects && object1[prop] !== object2[prop]) ||
                (bothAreObjects && !this.compareObjects(object1[prop], object2[prop]))
            ) {
                return false;
            }
        }

        return true;
    }

    static getKeyByValue<T>(object: T, value: string | number | Array<WorkoutType>) {
        return Object.keys(object).find((key) => object[key] === value);
    }

    static getBadges(): Array<TBadge> {
        const badges = [
            {
                src: BadgeSrc.oneWorkout,
                srcActive: BadgeActiveSrc.oneWorkout,
                name: BadgeName.oneWorkout,
                text: BadgeText.oneWorkout,
                modalId: 'modal1',
            },
            {
                src: BadgeSrc.fiveWorkouts,
                srcActive: BadgeActiveSrc.fiveWorkouts,
                name: BadgeName.fiveWorkouts,
                text: BadgeText.fiveWorkouts,
                modalId: 'modal2',
            },
            {
                src: BadgeSrc.tenWorkouts,
                srcActive: BadgeActiveSrc.tenWorkouts,
                name: BadgeName.tenWorkouts,
                text: BadgeText.tenWorkouts,
                modalId: 'modal3',
            },
            {
                src: BadgeSrc.twentyWorkouts,
                srcActive: BadgeActiveSrc.twentyWorkouts,
                name: BadgeName.twentyWorkouts,
                text: BadgeText.twentyWorkouts,
                modalId: 'modal4',
            },
            {
                src: BadgeSrc.fiftyWorkouts,
                srcActive: BadgeActiveSrc.fiftyWorkouts,
                name: BadgeName.fiftyWorkouts,
                text: BadgeText.fiftyWorkouts,
                modalId: 'modal5',
            },
            {
                src: BadgeSrc.hundredWorkouts,
                srcActive: BadgeActiveSrc.hundredWorkouts,
                name: BadgeName.hundredWorkouts,
                text: BadgeText.hundredWorkouts,
                modalId: 'modal6',
            },
        ];

        return badges;
    }

    static getTimeDiffInSeconds(startTime: number): number {
        return Math.round((Date.now() - startTime) / 60000);
    }

    static getCaloriesPerSecond(weight: number, mets: number): number {
        return +((weight * mets) / 60).toFixed(2);
    }

    static getCurrentISODate(): string {
        const date = new Date().toISOString();
        return date.slice(0, date.indexOf('T'));
    }

    static getISODate(dateNum: number): string {
        const date = new Date(dateNum).toISOString();
        return date.slice(0, date.indexOf('T'));
    }

    static getWeekDays(startDate: string, weekIndex: number): [string[], string[]] {
        const DAYS_NUMBER = 7;
        const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
        const WEEK_MILLISECONDS = DAY_MILLISECONDS * DAYS_NUMBER;
        let start = new Date(Number(startDate)).getTime();
        const res = new Array(DAYS_NUMBER);
        const weekDays: string[] = [];
        let i = 0;
        while (i < weekIndex) {
            start += WEEK_MILLISECONDS;
            i += 1;
        }
        for (let k = 0; k < res.length; k += 1) {
            weekDays.push(new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(start)).slice(0, 3));
            res[k] = Utils.getISODate(start);
            start += DAY_MILLISECONDS;
        }

        return [<string[]>res, weekDays];
    }

    static getWeekValues(keys: string[], values: TProgressData[]): number[] {
        return keys.map((key: string) => {
            const currValue = values.find((val) => val[key]);
            if (currValue) {
                return currValue[key];
            } else {
                return 0;
            }
        });
    }

    static countValuesSum(arr: TProgressData[]): number {
        return arr.reduce((prev, next) => prev + Object.values(next).reduce((a, b) => a + b), 0);
    }

    static iterateDoubleArr<T>(arr: T[][], callback: (elem: T, parentElem: T[], index: number) => void): void {
        arr.forEach((elem, index) => {
            elem.forEach((item) => callback(item, elem, index));
        });
    }
}
