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
        this.view.render(this.handleAvatarChange.bind(this));
    }

    private handleAvatarChange(e: Event): void {
        const clickedElement = <HTMLInputElement>e.target; 

        if (!(<FileList>clickedElement.files).length) {
            return;
        }

        this.files = avatarManager.getAvatarFile(clickedElement);
        avatarManager.toggleEditIcon(clickedElement);
        this.handleAvatarDelete(clickedElement);
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
        const src = avatarManager.formAvatarSrc();
        avatarImg.src = src;
        this.toggleEditIcon(element);
        avatarManager.deleteAvatar(this.files[0]);
    }
}

export default EditProfilePageController;
