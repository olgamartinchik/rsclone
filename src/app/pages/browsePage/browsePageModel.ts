import Card from '../../components/card/card';
import ClientManager from '../../services/clientManager';
import CloudinaryManager from '../../services/cloudinarySDK';
import Utils from '../../services/utils';
import { TSettings, TToken, TWorkout, TStatData, TProgressData, TProgress } from '../../services/types';
import storageManager from '../../services/storageManager';

class BrowsePageModel {
    private clientManager: ClientManager;

    private cards: Array<Card>;

    private sdk: CloudinaryManager;

    private currentCardId: string;

    private type: string;

    constructor() {
        this.clientManager = new ClientManager();
        this.sdk = new CloudinaryManager();
        this.cards = [];
        this.currentCardId = '';
        this.type = '';
    }

    public async getData() {
        const data = await this.clientManager.getWorkouts();
        if (data) {
            this.cards = data.map((item) => {
                return new Card(item);
            });
        }
    }

    public getRandomWorkout(): Card {
        const index = Utils.randomInteger(0, 44);
        this.currentCardId = this.cards[index].id!;
        return this.cards[index];
    }

    public getCardById(id: string): Card | void {
        let currCard!: Card;
        this.cards.forEach((card: Card) => {
            if (card.id === id) {
                currCard = card;
            }
        });

        return currCard;
    }

    public getVideoLink(): string {
        const card = this.getCardById(this.currentCardId);
        let url = '';
        if (card) {
            url = this.sdk.getVideoUrl(card.data.title);
        }

        return url;
    }

    public async getSettingsData(): Promise<void | TSettings> {
        let settings = storageManager.getItem<TSettings>('userSettings', 'local');
        if (!settings) {
            const userData = this.getUserData();
            if (userData) {
                settings = await this.clientManager.getUserSettings(userData.userID);
            }
        }

        return settings;
    }

    public getUserData(): TToken | void {
        return storageManager.getItem<TToken>('token', 'local');
    }

    public async saveSettings(settings: TSettings): Promise<void> {
        storageManager.addItem('userSettings', settings, 'local');
        const userData = this.getUserData();
        if (userData) {
            await this.clientManager.changeData('userSettings', 'PATCH', userData.userID, settings);
        }
    }

    public async updateWorkoutData(card: Card): Promise<void> {
        const program = storageManager.getItem<Array<TWorkout[]>>('workout-program', 'local');
        if (program) {
            Utils.iterateDoubleArr<TWorkout>(program, (workout) => {
                if (workout._id === card.id) {
                    workout.completed = true;
                    card.data.completed = true;
                }
            });
            card.completed = true;
            card.data.completed = true;
            storageManager.addItem('workout-program', program, 'local');
            storageManager.addItem('workout-cards', this.cards, 'local');
            const userData = this.getUserData();
            if (userData) {
                await this.clientManager.updateProgram(program, userData.userID);
            }
        }
    }

    public async updateSettingsData(dataStat: TStatData): Promise<void> {
        const settings = storageManager.getItem<TSettings>('userSettings', 'local');
        if (settings) {
            this.setStatData(settings, dataStat);
            storageManager.addItem('userSettings', settings, 'local');

            const userData = this.getUserData();
            if (userData) {
                this.clientManager.changeData('userSettings', 'PATCH', userData.userID, settings);
            }
        }
    }

    private setStatData(settings: TSettings, dataStat: TStatData): void {
        settings.weekProgress.minutes += dataStat.time;
        settings.weekProgress.workoutsCompleted += 1;
        settings.weekProgress.calories += dataStat.calories;
        settings.caloriesBurned += dataStat.calories;
        settings.completedWorkouts += 1;
        const date = Utils.getCurrentISODate();
        const weekIndex = storageManager.getItem<number>('numWeek', 'local');

        if (weekIndex !== undefined) {
            if (!settings.progress[weekIndex]) {
                settings.progress.push({ minutes: [], calories: [], workoutsCompleted: 0 });
            }
            const currWeek = settings.progress[weekIndex];
            const currDate = currWeek.minutes.find((weekItem) => weekItem[date]);
            const currCalories = currWeek.calories.find((weekItem) => weekItem[date]);
            this.setData(currDate, date, dataStat.time, currWeek, 'minutes');
            this.setData(currCalories, date, dataStat.calories, currWeek, 'calories');
            currWeek.workoutsCompleted += 1;
        }
    }

    private setData(data: TProgressData | void, key: string, value: number, progress: TProgress, type: string): void {
        if (data) {
            if (data[key]) {
                data[key] += value;
            } else {
                data[key] = value;
            }
        } else {
            progress[type].push({ [key]: value });
        }
    }
}

export default BrowsePageModel;
