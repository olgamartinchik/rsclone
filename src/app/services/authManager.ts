import Config from '../router/config';
import storageManager from './storageManager';
import router, { Router } from '../router/router';
import ClientManager from './clientManager';
import { RouteOption, TToken, TSettings } from './types';

export class AuthManager {
    private config: Config;

    private isLogin: boolean;

    private router: Router;

    private clientManager: ClientManager;

    constructor(isLogin: boolean) {
        this.router = router;
        this.config = new Config();
        this.isLogin = isLogin;
        this.clientManager = new ClientManager();
    }

    public navigate(path?: string | undefined): void {
        this.checkAuth();

        if (path) this.router.navigate(path);
    }

    private checkAuth(): void {
        this.isLogin = false;
        const token = <TToken>storageManager.getItem('token', 'local');
        const userSettings = <TSettings>storageManager.getItem('userSettings', 'local');
        if (token && !userSettings) {
            this.saveUserSettings(token);
        }
        if (token && userSettings) {
            this.isLogin = true;
        }

        this.setRouter();
    }

    private async saveUserSettings(token: TToken): Promise<void> {
        const userSettings = await this.clientManager.getUserSettings(token.userID);
        if (userSettings) {
            storageManager.addItem('userSettings', userSettings, 'local');
        }
    }

    private setRouter(): void {
        this.definePaths();
        this.setRootPath();
    }

    private definePaths(): void {
        const allRoutes = this.config.getRoutes();
        const routes = [] as RouteOption[];
        allRoutes.forEach((route) => {
            if (route.isAuth === this.isLogin || route.isAuth === null) {
                routes.push(route);
            }
        });

        this.router.addAllPath(routes);
    }

    private setRootPath(): void {
        const rootPath = this.isLogin ? '/program' : ' ';
        this.router.setRoot(rootPath);
    }
}

export default new AuthManager(false);
