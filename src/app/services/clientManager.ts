import { TLoginForm, TToken, TSettings } from '../services/types';
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

    public async postData(path: string, form: TLoginForm | TSettings) {
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
        } catch (e: any) {
            this.text = e.message;
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

    public async mealExploreData(dishType = 'Salad', from = '0', to = '1') {
        try {
            const url = `https://api.edamam.com/search?q=all&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&dishType=${dishType}&imageSize=LARGE`;

            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.log(e);
        }
    }

    public async searchingData(meal = 'Salad', from = '0', to = '10') {
        try {
            const url = `https://api.edamam.com/search?q=${meal}&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&imageSize=LARGE`;

            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.log(e);
        }
    }

    public async userData(mealType: string, calories: string, from = '0', to = '1') {
        try {
            const url = `https://api.edamam.com/search?q=all&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&imageSize=LARGE&mealType=${mealType}&calories=${calories}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.log(e);
        }
    }
}

export default ClientManager;
