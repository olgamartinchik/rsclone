import Config from '../router/config';
import StorageManager from './storageManager';
import router, { Router } from '../router/router';
import { TToken } from './types';

class AuthManager {
    private router: Router;

    private config: Config;

    private isLogin: boolean;

    constructor() {
        this.router = router;
        this.config = new Config();
        this.isLogin = false;
    }

    public checkAuth(): void {
        const token = StorageManager.getItem('token', 'local') as TToken;
        if (token && token.jwtToken.length > 0) this.isLogin = true;
        this.setRouter();
    }

    private setRouter(): void {
        const routes = this.config.getRoutes();

        if (this.isLogin) this.router = new Router({ root: '/program' });

        this.router.addAllPath(routes);
    }
}

export default new AuthManager();
