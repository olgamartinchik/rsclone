import storageManager from '../../services/storageManager';
import { TSettings, TUser } from '../../services/types';

class EditProfilePageModel {
    
    
    public getSettingsData(): TSettings | void {
        return storageManager.getItem('userSettings', 'local');
    }

    public getUserData(): TUser | void {
        return storageManager.getItem('user', 'local');
    }
}

export default EditProfilePageModel;
