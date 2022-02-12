import ProfilePageView from './profilePageView';

class ProfilePageController {
    private view: ProfilePageView;
    private files: Array<File>;

    constructor() {
        this.view = new ProfilePageView();
        this.files = [];
    }

    public createPage() {
        this.view.render(this.handleAvatarChange.bind(this), this.handleDeleteIconClick.bind(this));
    }

    private handleAvatarChange(e: Event): void {
        const clickedElement = <HTMLInputElement>e.target; 

        if (!(<FileList>clickedElement.files).length) {
            return;
        }

        this.getAvatarSrc(clickedElement);
        this.toggleEditIcon(clickedElement);
    }

    private getAvatarSrc(element: HTMLInputElement): void {
        this.files = Array.from(<FileList>element.files);
        this.files.forEach((file) => {
            if (!file.type.match('image')) {
              return
            }
      
            const reader = new FileReader();
            reader.onload = e => {
                const src = <string>(<FileReader>e.target).result;
                const avatarImg = <HTMLImageElement>document.querySelector('.profile-avatar');
                avatarImg.src = src;
            }

            reader.readAsDataURL(file);
        });    
    }

    private toggleEditIcon(element: HTMLElement): void {
        const editIcon = <HTMLElement>(<HTMLElement>element.nextElementSibling).querySelector('.icon-upload');
        if (editIcon && editIcon.className.includes('pencil')) {
            editIcon.className = 'icon-upload icon delete';
        } else {
            editIcon.className = 'icon-upload icon pencil';
        }
    }

    handleDeleteIconClick(): void {
        console.log('click');
    }
}

export default ProfilePageController;
