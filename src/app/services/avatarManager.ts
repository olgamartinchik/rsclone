import ClientManager from "./clientManager";
import storageManager from "./storageManager";
import { TToken, TSettings, TUser } from "./types";

export class AvatarManager {
  private clientManager: ClientManager;
  private files: Array<File>;

  constructor() {
      this.clientManager = new ClientManager();
      this.files = [];
  }

  public getAvatarFile(element: HTMLInputElement): Array<File> {
    this.files = Array.from(<FileList>element.files);
    this.files.forEach((file) => {
        if (!file.type.match('image')) {
          return
        }
        
        const reader = new FileReader();
        reader.onload = e => {
            const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
            const src = <string>(<FileReader>e.target).result;
            avatarImg.src = src;
        }

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
    
    if (editIcon && editIcon.className.includes('pencil')) {
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

  public formAvatarSrc(userId: string): string {
    const avatar = (<TToken>storageManager.getItem('token', 'local')).avatar;
    const defaultAvatar = this.chooseDefaultAvatar();
    const src = (avatar) ? `https://rsclonebackend.herokuapp.com/api/avatar/${userId}` : defaultAvatar;   

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
    const userData = <TToken>storageManager.getItem('token', 'local');
    const userId = (<TToken>storageManager.getItem('token', 'local')).userID;
    const userName = (<TUser>storageManager.getItem('user', 'local')).name;
    await this.clientManager.uploadAvatar(file, userId);
    userData.avatar = 'uploaded';
    storageManager.addItem('token', userData, 'local');
    this.updateProfileIcon(userData.avatar, userName, userData.userID);
  }

  private updateProfileIcon(avatar: string | null, name: string, userId: string): void {
    const profileIcon = <HTMLElement>document.querySelector('.profile');
    if (avatar) {
      profileIcon.style.backgroundImage = `url(https://rsclonebackend.herokuapp.com/api/avatar/${userId})`;
      profileIcon.innerHTML = '';
    } else {
        profileIcon.innerHTML = name.split('')[0];
        profileIcon.style.backgroundImage = '';
    }
  }

  public async deleteAvatar(file: File) {
      const userData = <TToken>storageManager.getItem('token', 'local');
      const userId = (<TToken>storageManager.getItem('token', 'local')).userID;
      const userName = (<TUser>storageManager.getItem('user', 'local')).name;
      userData.avatar = null;
      await this.clientManager.deleteAvatar(file, userId);
      storageManager.addItem('token', userData, 'local');
      this.setUploadIcon();
      this.updateProfileIcon(userData.avatar, userName, userData.userID);
  }
}

export default new AvatarManager();