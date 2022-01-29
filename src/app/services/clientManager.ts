import { TLoginForm, TToken } from '../services/types';
import {API_ID,KEY_API} from '../configs/edamamConfig'

class ClientManager {
    private static _instance: ClientManager | null;

    text: string;

    tokenInfo: TToken;

    constructor() {
        if (!ClientManager._instance) {
            ClientManager._instance = this;
        }
        this.text = '';
        this.tokenInfo = {
            userID: '',
            jwtToken: '',
        };
        return ClientManager._instance;
    }

    public async postData(path: string, form: TLoginForm) {
        // console.log('form', form);
        try {
            const response = await fetch(`https://rsclonebackend.herokuapp.com/api/auth/${path}`, {
                method: 'POST',
                body: JSON.stringify({ ...form }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            this.text = data.message;
            this.tokenInfo.jwtToken = data.token;
            this.tokenInfo.userID = data.userId;

            return data;
        } catch (e: any) {
            this.text = e.message;
        }
    }

    public get message(): string {
        return this.text;
    }

    public get token(): TToken {
        return this.tokenInfo;
    }
    public async mealExploreData(from='0',to='1',dishType='Salad'){
        
        try{
            const url = `https://api.edamam.com/search?q=all&app_id=${API_ID}&app_key=${KEY_API}&from=${from}&to=${to}&dishType=${dishType}`;

            const response = await fetch(url);
            const data = await response.json();
            return data.hits
        }catch(e){
            console.log(e)
        }
    }
}

export default ClientManager;
