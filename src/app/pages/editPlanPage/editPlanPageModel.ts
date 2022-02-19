import ClientManager from '../../services/clientManager';
import StorageManager from '../../services/storageManager';
import { TSettings } from '../../services/types';
import { Endpoints } from '../../services/constants';

class EditPlanPageModel {
    public async saveSettings(modifiedSettings: TSettings | void) {
        const clientManager = new ClientManager();
        StorageManager.addItem('userSettings', modifiedSettings, 'local');
        await clientManager.changeData(
            Endpoints.userSettings,
            (<TSettings>modifiedSettings).userId,
            <TSettings>modifiedSettings
        );
        this.updateWorkoutProgram();
    }

    public updateWorkoutProgram(): void {
        StorageManager.deleteItem('workout-cards', 'local');
        StorageManager.deleteItem('workout-program', 'local');
    }
}

export default EditPlanPageModel;
