import ProfilePageView from './profilePageView';
import avatarManager from '../../services/avatarManager';
import storageManager from '../../services/storageManager';
import { TToken } from '../../services/types';

class ProfilePageController {
    private view: ProfilePageView;
    private files: Array<File>;

    constructor() {
        this.view = new ProfilePageView();
        this.files = [];
    }

    public createPage() {
        this.view.render(this.handleAvatarChange.bind(this), this.handleAvatarDelete.bind(this));
    }

    private handleAvatarChange(e: Event): void {
        const clickedElement = <HTMLInputElement>e.target; 
        const avatar = (<TToken>storageManager.getItem('token', 'local')).avatar; 

        if (!(<FileList>clickedElement.files).length) {
            return;
        }

        this.files = avatarManager.getAvatarFile(clickedElement);
    }

    private handleAvatarDelete(e: Event): void { 
        this.deleteAvatar();
    }

    private async deleteAvatar(): Promise<void> {
        await avatarManager.deleteAvatar(this.files[0]);

        const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
        const src = avatarManager.chooseDefaultAvatar();
        avatarImg.src = src;
    }
}

export default ProfilePageController;
