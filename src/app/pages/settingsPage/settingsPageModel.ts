import storageManager from '../../services/storageManager';
import ClientManager from '../../services/clientManager';
import { TSettings } from '../../services/types';
import { Endpoints } from '../../services/constants';

class SettingsPageModel {
    private settings: TSettings | void;

    constructor() {
        this.settings = storageManager.getItem('userSettings', 'local');
    }

    public getData(): TSettings | void {
        return (this.settings = storageManager.getItem('userSettings', 'local'));
    }

    public async saveSettings(modifiedSettings: TSettings | void) {
        const clientManager = new ClientManager();
        storageManager.addItem('userSettings', modifiedSettings, 'local');
        await clientManager.changeData(
            Endpoints.userSettings,
            'PATCH',
            (<TSettings>modifiedSettings).userId,
            <TSettings>modifiedSettings
        );
    }
}

export default SettingsPageModel;
