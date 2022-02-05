import Config from '../router/config';
import StorageManager from './storageManager';
import router, { Router } from '../router/router';
import { RouteOption, TToken } from './types';

export class AuthManager {
    private config: Config;

    private isLogin: boolean;

    private router: Router;

    constructor(isLogin: boolean) {
        this.router = router;
        this.config = new Config();
        this.isLogin = isLogin;
    }

    public navigate(path?: string | undefined): void {
        this.checkAuth();
        //    const router = (this.isLogin) ? this.setAuthRouter() : this.setNewUserRouter();

        // console.log(this.isLogin);
        // console.log(this.router);
        if (path) this.router.navigate(path);
    }

    private checkAuth(): void {
        this.isLogin = false;
        const token = StorageManager.getItem('token', 'local') as TToken;
        if (token && token.jwtToken.length > 0) this.isLogin = true;

        this.setRouter();
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
