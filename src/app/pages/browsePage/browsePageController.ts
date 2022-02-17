import BrowsePageView from './browsePageView';
import StorageManager from '../../services/storageManager';
import authManager from '../../services/authManager';
import { TToken, TSettings } from '../../services/types';

class BrowsePageController {
    private view: BrowsePageView;

    constructor() {
        this.view = new BrowsePageView();
    }

    public createPage() {
        const isLogin = this.checkAuth();
        this.view.render(isLogin, this.signUpHandler.bind(this));
    }

    private checkAuth(): boolean {
        let isLogin = false;
        const token = <TToken>StorageManager.getItem('token', 'local');
        const userSettings = <TSettings>StorageManager.getItem('userSettings', 'local');

        if (token && userSettings) {
            isLogin = true;
        }

        return isLogin;
    }

    private signUpHandler(): void {
        authManager.navigate('/register');
    }
}

export default BrowsePageController;
