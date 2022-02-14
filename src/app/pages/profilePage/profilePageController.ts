import ProfilePageView from './profilePageView';
import avatarManager from '../../services/avatarManager';

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
        if (!(<FileList>clickedElement.files).length) {
            return;
        }

        this.files = avatarManager.getAvatarFile(clickedElement);
        avatarManager.toggleEditIcon();
    }

    private handleAvatarDelete(e: Event): void { 
        this.deleteAvatar();
    }

    private async deleteAvatar(): Promise<void> {
        await avatarManager.deleteAvatar(this.files[0]);

        const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
        const src = avatarManager.formAvatarSrc();
        avatarImg.src = src;
        avatarManager.toggleEditIcon();
    }
}

export default ProfilePageController;
