import { TLoginForm, TToken, TSettings, TWorkout, TAuthResult } from '../services/types';
import { API_ID, KEY_API } from '../configs/edamamConfig';

class ClientManager {
    getMealTemplate(arg0: string, arg1: string, mealType: string) {
        throw new Error('Method not implemented.');
    }

    private static _instance: ClientManager | null;

    text: string;

    tokenInfo: TToken;

    isSuccess: boolean;

    constructor() {
        if (!ClientManager._instance) {
            ClientManager._instance = this;
        }
        this.text = '';
        this.tokenInfo = {
            userID: '',
            jwtToken: '',
        };
        this.isSuccess = true;
        return ClientManager._instance;
    }

    public async postData(path: string, form: TLoginForm | TSettings): Promise<void | TAuthResult> {
        try {
            const response = await fetch(`https://rsclonebackend.herokuapp.com/api/${path}`, {
                method: 'POST',
                body: JSON.stringify({ ...form }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            // console.log(data);
            if (!response.ok) {
                this.isSuccess = false;
                throw new Error(data.message || 'Something went wrong');
            }

            this.isSuccess = true;
            this.text = data.message;
            this.tokenInfo.jwtToken = data.token;
            this.tokenInfo.userID = data.userId;

            return data;
        } catch (e: unknown) {
            if (e instanceof Error) {
                this.text = e.message;
            } else {
                this.text = String(e);
            }
        }
    }

    public async getWorkouts(): Promise<void | TWorkout[]> {
        try {
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/workouts`);

            return (await res.json()) as TWorkout[];
        } catch (e: unknown) {
            if (e instanceof Error) {
                this.text = e.message;
            } else {
                this.text = String(e);
            }
        }
    }

    public async getUserSettings(id: string): Promise<TSettings | void> {
        try {
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/userSettings/${id}`);
            return (await res.json()) as TSettings;
        } catch (e: unknown) {
            if (e instanceof Error) {
                this.text = e.message;
            } else {
                this.text = String(e);
            }
        }
    }

    public get result(): boolean {
        return this.isSuccess;
    }

    public get message(): string {
        return this.text;
    }

    public get token(): TToken {
        return this.tokenInfo;
    }
    public async userData(from: string, to: string, mealType: string, calories: string) {
        try {
            const url = `https://api.edamam.com/search?q=all&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&imageSize=LARGE&mealType=${mealType}&calories=${calories}&dishType=Main course`;
            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.log(e);
        }
    }
    public async mealExploreData(from: string, to: string, diet = 'balanced',mealType='Breakfast') {
        try {
            const url = `https://api.edamam.com/search?q=all&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&diet=${diet}&dishType=Main course&mealType=${mealType}&imageSize=LARGE`;

            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.log(e);
        }
    }

    public async searchingData(from: string, to: string, meal = 'Salad') {
        try {
            const url = `https://api.edamam.com/search?q=${meal}&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&imageSize=LARGE`;

            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.log(e);
        }
    }

  
}

export default ClientManager;
