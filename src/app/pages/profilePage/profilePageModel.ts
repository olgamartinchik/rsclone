import storageManager from '../../services/storageManager';
import { TSettings } from '../../services/types';

class ProfilePageModel {
    public getSettingsData(): TSettings | void {
        return storageManager.getItem<TSettings>('userSettings', 'local');
    }
}

export default ProfilePageModel;
