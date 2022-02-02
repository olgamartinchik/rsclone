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
}
