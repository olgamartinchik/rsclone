import {
    TLoginForm,
    TToken,
    TSettings,
    TWorkout,
    TAuthResult,
    TLoginResponse,
    TWorkoutProgram,
} from '../services/types';
import { API_ID, KEY_API } from '../configs/edamamConfig';

class ClientManager {
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

    public async postData(
        path: string,
        form: TLoginForm | TSettings
    ): Promise<void | TAuthResult | TSettings | TLoginResponse> {
        try {
            const response = await fetch(`https://rsclonebackend.herokuapp.com/api/${path}`, {
                method: 'POST',
                body: JSON.stringify({ ...form }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
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
            this.handleError(e);
        }
    }

    public async changeData(path: string, id: string, form: TLoginForm | TSettings): Promise<void | TSettings> {
        try {
            const response = await fetch(`https://rsclonebackend.herokuapp.com/api/${path}/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ ...form }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data;
        } catch (e: unknown) {
            this.handleError(e);
        }
    }

    public async getWorkouts(): Promise<void | TWorkout[]> {
        try {
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/workouts`);

            return (await res.json()) as TWorkout[];
        } catch (e: unknown) {
            this.handleError(e);
        }
    }

    public async getUserSettings(id: string): Promise<TSettings | void> {
        try {
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/userSettings/${id}`);

            return (await res.json()) as TSettings;
        } catch (e: unknown) {
            this.handleError(e);
        }
    }

    public async postProgram(program: TWorkoutProgram, id: string) {
        try {
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/workoutSettings`, {
                method: 'POST',
                body: JSON.stringify({ _id: id, program }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return await res.json();
        } catch (e: unknown) {
            this.handleError(e);
        }
    }

    public async getProgram(id: string): Promise<TWorkoutProgram | void> {
        try {
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/workoutSettings/${id}`);

            return (await res.json()).program as TWorkoutProgram;
        } catch (e: unknown) {
            this.handleError(e);
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
    // public async userData(from: string, to: string, mealType: string, calories: string) {
    //     try {
    //         const url = `https://api.edamam.com/search?q=all&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&imageSize=LARGE&mealType=${mealType}&calories=${calories}&dishType=Main course`;
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         return data.hits;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    // public async mealExploreData(from: string, to: string, diet = 'balanced',mealType='Breakfast') {
    //     try {
    //         const url = `https://api.edamam.com/search?q=all&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&diet=${diet}&dishType=Main course&mealType=${mealType}&imageSize=LARGE`;

    //         const response = await fetch(url);
    //         const data = await response.json();
    //         return data.hits;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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

    public async getRecipe(calories: number) {
        try {
            const caloriesForOneMeal = Math.floor(calories / 3);
            const url = `https://api.edamam.com/search?q=all&app_id=1ddd26bc&app_key=aa2a6148d30d95275813c6bc548941bf&from=0&to=100&imageSize=LARGE&calories=${String(
                caloriesForOneMeal
            )}-${String(caloriesForOneMeal + 300)}&Health=alcohol-free`;
            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.log(e);
        }
    }

    public async uploadAvatar(file: File, id: string) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/auth/avatar/${id}`, {
                method: 'POST',
                body: formData,
            });

            return await res.json();
        } catch (e: unknown) {
            this.handleError(e);
        }
    }

    public async deleteAvatar(file: File, id: string) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch(`https://rsclonebackend.herokuapp.com/api/auth/avatar/${id}`, {
                method: 'DELETE'
            });
            
            return await res.json();
        } catch (e: unknown) {
            this.handleError(e);
        }
    }

    private handleError(e: unknown) {
        if (e instanceof Error) {
            this.text = e.message;
        } else {
            this.text = String(e);
        }
    }
}

export default ClientManager;
