import EditProfilePageView from './editProfilePageView';
import EditProfilePageModel from './editProfilePageModel';
import avatarManager from '../../services/avatarManager';
import { TSettings, TUser } from '../../services/types';

class EditProfilePageController {
    private view: EditProfilePageView;
    private files: Array<File>;
    private model: EditProfilePageModel;
    private settings: void | TSettings;
    private modifiedUserSettings: void | TSettings;
    private user: void | TUser;
    private modifiedUser: void | TUser;

    constructor() {
        this.view = new EditProfilePageView();
        this.model = new EditProfilePageModel();
        this.files = [];
        this.settings = this.model.getSettingsData();
        this.modifiedUserSettings = this.getModifiedUserSettings();
        this.user = this.model.getUserData();
        this.modifiedUser = this.getModifiedUser();
    }

    public createPage() {
        this.settings = <TSettings>this.model.getSettingsData();
        this.user = <TUser>this.model.getUserData();
        this.modifiedUserSettings = this.getModifiedUserSettings();
        this.modifiedUser = this.getModifiedUser();
        this.view.render(this.settings, this.user, this.handleAvatarChange.bind(this), this.handleAvatarDelete.bind(this), this.handleCalenderClick.bind(this));
    }

    private getModifiedUserSettings(): TSettings | void {
        return Object.assign({}, this.settings);
    }

    private getModifiedUser(): TUser | void {
        return Object.assign({}, this.user);
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
        const src = avatarManager.chooseDefaultAvatar();
        avatarImg.src = src;
        avatarManager.toggleEditIcon();
    }

    private handleCalenderClick(): void {
        
    }
}

export default EditProfilePageController;
