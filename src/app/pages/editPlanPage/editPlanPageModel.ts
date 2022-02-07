import ClientManager from '../../services/clientManager';
import StorageManager from '../../services/storageManager';
import { TSettings } from '../../services/types';
import { Endpoints } from '../../services/constants';
class EditPlanPageModel {
    public saveSettings(modifiedSettings: TSettings | void) {
        const clientManager = new ClientManager();
        StorageManager.addItem('userSettings', modifiedSettings, 'local');
        // clientManager.changeData(Endpoints.userSettings, (<TSettings>modifiedSettings).userId, <TSettings>modifiedSettings);
    }
}

export default EditPlanPageModel;
