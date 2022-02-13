import ClientManager from "./clientManager";
import storageManager from "./storageManager";
import { TToken, TSettings } from "./types";

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
    
    return this.files;    
  }

  public toggleEditIcon(element: HTMLElement): void {
      const editIcon = <HTMLElement>(<HTMLElement>element.nextElementSibling).querySelector('.icon-upload');
      if (editIcon && editIcon.className.includes('pencil')) {
          editIcon.className = 'icon-upload icon delete modal-trigger';
          editIcon.setAttribute('data-target', 'modal7');
      } else {
          editIcon.className = 'icon-upload icon pencil';
          editIcon.removeAttribute('data-target');
      }
  }

  public formAvatarSrc(): string {
    const avatar = (<TToken>storageManager.getItem('token', 'local')).avatar;
    const gender = (<TSettings>storageManager.getItem('userSettings', 'local')).gender;
    let defaultAvatar = '';

    if (gender === 'female') {
        defaultAvatar = '../../../assets/img/avatar/female-avatar.png';
    } else if (gender === 'male') {
        defaultAvatar = '../../../assets/img/avatar/male-avatar.png';
    } else if (gender === 'other') {
        defaultAvatar = '../../../assets/img/avatar/other-avatar.png';
    }  
    
    const src = (avatar) ? avatar : defaultAvatar;   

    return src;
  }

  public async updateUserInfo(file: File): Promise<void> {
    const userData = <TToken>storageManager.getItem('token', 'local');
    const userId = (<TToken>storageManager.getItem('token', 'local')).userID
    const avatarSrc = await this.clientManager.uploadAvatar(file, userId);
    userData.avatar = avatarSrc;
    storageManager.addItem('token', userData, 'local');
  }

  public deleteAvatar(file: File) {
      const userData = <TToken>storageManager.getItem('token', 'local');
      const userId = (<TToken>storageManager.getItem('token', 'local')).userID
      userData.avatar = null;
      this.clientManager.deleteAvatar(file);
      storageManager.addItem('token', userData, 'local');
  }
}

export default new AvatarManager();