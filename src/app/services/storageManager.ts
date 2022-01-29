import { StoragesHandler } from './types';

interface IStorageApiManager {
    addItem: <T>(key: string, value: T, storageType: string) => void;
    deleteItem: (key: string, storageType: string) => void;
    getItem: <T>(key: string, storageType: string) => T | void;
}

class StorageApiManager implements IStorageApiManager {
    private readonly prefix: string;

    private readonly storage: StoragesHandler;

    constructor() {
        this.prefix = 'fitOnTeam-';
        this.storage = {
            session: sessionStorage,
            local: localStorage,
        };
    }

    public addItem<T>(key: string, value: T, storageType: string): void {
        const storage = this.storage[storageType];
        if (this.isStorageAvailable(storage)) {
            storage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
        } else {
            console.log(`some error occured during saving data to ${storage}`);
        }
    }

    public deleteItem(key: string, storageType: string): void {
        const storage = this.storage[storageType];
        if (this.isStorageAvailable(storage)) {
            storage.removeItem(`${this.prefix}${key}`);
        } else {
            console.log(`some error occured during deleting data to ${storage}`);
        }
    }

    public getItem<T>(key: string, storageType: string): T | void {
        const storage = this.storage[storageType];
        if (this.isStorageAvailable(storage)) {
            return <T>JSON.parse(storage.getItem(`${this.prefix}${key}`));
        } else {
            console.log(`cannot get data from ${storage}`);
        }
    }

    private isStorageAvailable(st: Storage): boolean {
        const storage = st;
        try {
            const test = `${this.prefix}test-storage`;
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                (e.code === 22 ||
                    e.code === 1014 ||
                    e.name === 'QuotaExceededError' ||
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                storage &&
                storage.length !== 0
            );
        }
    }
}

export default new StorageApiManager();