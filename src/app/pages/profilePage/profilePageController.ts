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
    }

    private handleAvatarDelete(): void {
        this.deleteAvatar();
    }

    private deleteAvatar(): void {
        avatarManager.deleteAvatar();

        const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
        const src = avatarManager.chooseDefaultAvatar();
        avatarImg.src = src;
    }
}

export default ProfilePageController;
