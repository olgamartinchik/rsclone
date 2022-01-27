import { TLoginForm, TToken } from '../services/types';

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

    public async postData(path: string, form: TLoginForm) {
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
}

export default ClientManager;
