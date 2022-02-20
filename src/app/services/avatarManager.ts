import ClientManager from './clientManager';
import storageManager from './storageManager';
import { TToken, TSettings, TUser, TChangeUserDataForm } from './types';
import { Endpoints } from './constants';

export class AvatarManager {
    private clientManager: ClientManager;

    private files: Array<File>;

    private editProfileForm: TChangeUserDataForm;

    constructor() {
        this.clientManager = new ClientManager();
        this.files = [];
        this.editProfileForm = {
            userName: '',
            email: '',
            password: '',
            avatar: '',
            newPassword: '',
        };
    }

    public getAvatarFile(element: HTMLInputElement): Array<File> {
        this.files = Array.from(<FileList>element.files);
        this.files.forEach((file) => {
            if (!file.type.match('image')) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
                const src = <string>(<FileReader>e.target).result;
                avatarImg.src = src;
            };

            reader.readAsDataURL(file);
        });
        this.updateUserInfo(this.files[0]);
        this.setDeleteIcon();

        return this.files;
    }

    public setDeleteIcon(): void {
        const editIcon = <HTMLElement>document.querySelector('.icon-upload');

        if (editIcon) {
            editIcon.className = 'icon-upload icon delete modal-trigger';
            editIcon.setAttribute('data-target', 'modal7');
        }
    }

    public setUploadIcon(): void {
        const editIcon = <HTMLElement>document.querySelector('.icon-upload');

        if (editIcon && editIcon.className.includes('delete')) {
            editIcon.className = 'icon-upload icon pencil';
            editIcon.removeAttribute('data-target');
        }
    }

    public formAvatarSrc(): string {
        const avatar = (<TUser>storageManager.getItem('user', 'local')).avatar;
        const defaultAvatar = this.chooseDefaultAvatar();
        const src = avatar ? avatar : defaultAvatar;

        return src;
    }

    public chooseDefaultAvatar(): string {
        let defaultAvatar = '';
        const gender = (<TSettings>storageManager.getItem('userSettings', 'local')).gender;

        if (gender === 'female') {
            defaultAvatar = '../../../assets/img/avatar/female-avatar.png';
        } else if (gender === 'male') {
            defaultAvatar = '../../../assets/img/avatar/male-avatar.png';
        } else if (gender === 'other') {
            defaultAvatar = '../../../assets/img/avatar/other-avatar.png';
        }

        return defaultAvatar;
    }

    public async updateUserInfo(file: File): Promise<void> {
        const user = this.getUserData()!;
        const userName = user.name;

        const avatar = await this.clientManager.uploadAvatar(file);
        user.avatar = avatar.secure_url;

        this.updateUserDataForm(user);
        this.updateProfileIcon(user.avatar, userName);
        this.saveAvatarID(avatar.public_id);
    }

    private getTokenData(): TToken | void {
        return storageManager.getItem('token', 'local');
    }

    private getUserData(): TUser | void {
        return storageManager.getItem('user', 'local');
    }

    private async updateUserDataForm(user: TUser): Promise<void> {
        this.editProfileForm.userName = user.name;
        this.editProfileForm.email = user.email;
        this.editProfileForm.avatar = user.avatar!;

        await this.updateUserData(user);
    }

    private async updateUserData(user: TUser) {
        const userId = this.getTokenData()!.userID;

        await this.clientManager.changeData(
            Endpoints.changeUserData,
            'POST',
            userId,
            <TChangeUserDataForm>this.editProfileForm
        );

        storageManager.addItem('user', user, 'local');
    }

    private saveAvatarID(id: string) {
        storageManager.addItem('public_id', id, 'local');
    }

    public updateProfileIcon(avatar: string | undefined, name: string): void {
        const profileIcon = <HTMLElement>document.querySelector('.profile');
        if (avatar) {
            profileIcon.style.backgroundImage = `url(${avatar})`;
            profileIcon.innerHTML = '';
        } else {
            profileIcon.innerHTML = name.split('')[0];
            profileIcon.style.backgroundImage = '';
        }
    }

    public async deleteAvatar() {
        const user = this.getUserData()!;
        // const publicId = <string>storageManager.getItem('public_id', 'local');
        const userName = user.name;
        user.avatar = '';
        // await this.clientManager.deleteAvatar(publicId);
        // storageManager.deleteItem('public_id', 'local');

        this.updateUserDataForm(user);
        this.clearFileInput();
        this.setUploadIcon();
        this.updateProfileIcon(user.avatar, userName);
    }

    public clearFileInput(): void {
        const fileInput = <HTMLInputElement>document.querySelector('input[type=file]');
        fileInput.value = '';
    }
}

export default new AvatarManager();
