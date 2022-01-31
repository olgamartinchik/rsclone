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
}
