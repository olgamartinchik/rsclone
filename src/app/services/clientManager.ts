import { TLoginForm } from '../services/types';

class ClientManager {
    private static _instance: ClientManager | null;
    text: string;

    constructor() {
        if (!ClientManager._instance) {
            ClientManager._instance = this;
        }
        this.text = '';
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
            // console.log('response', response);
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            // console.log('data', data.message, data);
            console.log('error', data.message);
            this.text = data.message;
            console.log(data.message);
            
            return data;
        } catch (e: any) {
            this.text = e.message;
            // this.createMessage(e.message)
            // console.log('error', e.message);
        }
    }

    public get message(): string {
        return this.text;
    }
}

export default ClientManager;
