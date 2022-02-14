import EditProfilePageView from './editProfilePageView';
import avatarManager from '../../services/avatarManager';

class EditProfilePageController {
    private view: EditProfilePageView;
    private files: Array<File>;

    constructor() {
        this.view = new EditProfilePageView();
        this.files = [];
    }

    public createPage() {
        this.view.render(this.handleAvatarChange.bind(this), this.handleAvatarDelete.bind(this), this.handleCalenderClick.bind(this));
    }

    private handleAvatarChange(e: Event): void {
        const clickedElement = <HTMLInputElement>e.target; 

        if (!(<FileList>clickedElement.files).length) {
            return;
        }

        this.files = avatarManager.getAvatarFile(clickedElement);
        avatarManager.toggleEditIcon();
    }

    private handleAvatarDelete(): void { 
        this.deleteAvatar();
    }

    private async deleteAvatar(): Promise<void> {
        await avatarManager.deleteAvatar(this.files[0]);

        const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
        const src = avatarManager.formAvatarSrc();
        avatarImg.src = src;
        avatarManager.toggleEditIcon();
    }

    private handleCalenderClick(): void {
        
    }
}

export default EditProfilePageController;
