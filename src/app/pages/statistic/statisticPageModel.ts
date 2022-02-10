import storageManager from '../../services/storageManager';
import { TSettings, TToken } from '../../services/types';
import ClientManager from '../../services/clientManager';

class StatisticPageModel {
    private settings: TSettings | null;

    private client: ClientManager;

    constructor() {
        this.settings = null;
        this.client = new ClientManager();
    }

    public async getSettings(): Promise<null | TSettings> {
        const settings = storageManager.getItem<TSettings>('userSettings', 'local');
        if (settings) {
            this.settings = settings;
        } else {
            const userData = storageManager.getItem<TToken>('token', 'local');
            if (userData) {
                  const data = await this.client.getUserSettings(userData.userID);
                 if(data) {
                    this.settings = data;
                }
            }
            
        }

        return this.settings;
    }
}

export default StatisticPageModel;
