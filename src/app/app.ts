import router, { Router } from './router/router';
import Config from './router/routes';

class App {
    private router: Router;

    private config: Config;

    constructor() {
        this.router = router;
        this.config = new Config();
    }

    public start(): void {
        const routes = this.config.getRoutes();

        this.router.addAllPath(routes);
    }
}

export default App;
