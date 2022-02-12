import ProfilePageView from './profilePageView';
import ProfilePageModel from './profilePageModel';

class ProfilePageController {
    private view: ProfilePageView;
    private files: Array<File>;
    private model: ProfilePageModel;

    constructor() {
        this.view = new ProfilePageView();
        this.model = new ProfilePageModel();
        this.files = [];
    }

    public createPage() {
        this.view.render(this.handleAvatarChange.bind(this));
    }

    private handleAvatarChange(e: Event): void {
        const clickedElement = <HTMLInputElement>e.target; 

        if (!(<FileList>clickedElement.files).length) {
            return;
        }

        this.getAvatarSrc(clickedElement);
        this.toggleEditIcon(clickedElement);
        this.handleAvatarDelete(clickedElement);
    }

    private getAvatarSrc(element: HTMLInputElement): void {
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
        this.model.updateUserInfo(this.files[0]);    
    }

    private toggleEditIcon(element: HTMLElement): void {
        const editIcon = <HTMLElement>(<HTMLElement>element.nextElementSibling).querySelector('.icon-upload');
        if (editIcon && editIcon.className.includes('pencil')) {
            editIcon.className = 'icon-upload icon delete modal-trigger';
            editIcon.setAttribute('data-target', 'modal7');
        } else {
            editIcon.className = 'icon-upload icon pencil';
            editIcon.removeAttribute('data-target');
        }
    }

    private handleAvatarDelete(element: HTMLElement): void {
        const agreeToDeleteBtn = <HTMLElement>document.querySelector('.modal-close');
        if (agreeToDeleteBtn) {
            agreeToDeleteBtn.onclick = () => this.deleteAvatar(element);
        }
    }

    private deleteAvatar(element: HTMLElement): void {
        const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
        const src = this.view.formAvatarSrc();
        avatarImg.src = src;
        this.toggleEditIcon(element);
        this.model.deleteAvatar(this.files[0]);
    }
}

export default ProfilePageController;
