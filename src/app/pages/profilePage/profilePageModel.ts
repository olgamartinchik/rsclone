import ClientManager from '../../services/clientManager';
import storageManager from '../../services/storageManager';
import { TToken } from '../../services/types';

class ProfilePageModel {
    private clientManager: ClientManager;

    constructor() {
        this.clientManager = new ClientManager();
    }

    public async updateUserInfo(file: File): Promise<void> {
        const userData = <TToken>storageManager.getItem('token', 'local');
        const avatarSrc = await this.clientManager.uploadAvatar(file);
        userData.avatar = avatarSrc;
        storageManager.addItem('token', userData, 'local');
    }

    public deleteAvatar(file: File) {
        const userData = <TToken>storageManager.getItem('token', 'local');
        userData.avatar = null;
        this.clientManager.deleteAvatar(file);
        storageManager.addItem('token', userData, 'local');
    }
}

export default ProfilePageModel;
