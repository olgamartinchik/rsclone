import ClientManager from './clientManager';
import CloudinaryManager from './cloudinarySDK';
import storageManager from './storageManager';
import { TToken, TSettings, TUser } from './types';

export class AvatarManager {
    private clientManager: ClientManager;

    private files: Array<File>;

    private cloudinaryManager: CloudinaryManager;

    constructor() {
        this.clientManager = new ClientManager();
        this.cloudinaryManager = new CloudinaryManager();
        this.files = [];
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

    // public toggleEditIcon(): void {
    //     const editIcon = <HTMLElement>document.querySelector('.icon-upload');

    //     if (editIcon && editIcon.className.includes('pencil')) {
    //         editIcon.className = 'icon-upload icon delete modal-trigger';
    //         editIcon.setAttribute('data-target', 'modal7');
    //     } else {
    //         editIcon.className = 'icon-upload icon pencil';
    //         editIcon.removeAttribute('data-target');
    //     }
    // }

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
        const user = <TUser>storageManager.getItem('user', 'local');
        const userId = (<TToken>storageManager.getItem('token', 'local')).userID;
        const userName = (<TUser>storageManager.getItem('user', 'local')).name;

        const avatar = await this.clientManager.uploadAvatar(file);
        user.avatar = avatar.secure_url;
        storageManager.addItem('user', user, 'local');
        this.updateProfileIcon(user.avatar, userName);
        this.saveAvatarID(avatar.public_id);
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
        const user = <TUser>storageManager.getItem('user', 'local');
        const publicId = <string>storageManager.getItem('public_id', 'local');
        const userName = (<TUser>storageManager.getItem('user', 'local')).name;
        user.avatar = '';
        // await this.clientManager.deleteAvatar(publicId);
        storageManager.deleteItem('public_id', 'local');
        storageManager.addItem('user', user, 'local');
        this.setUploadIcon();
        this.updateProfileIcon(user.avatar, userName);
    }
}

export default new AvatarManager();
