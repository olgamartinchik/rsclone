import MainPageController from './pages/mainPage/mainPageController';
import { Router } from './router/router';
import { RouteOption } from './services/types';

class App {
    private mainPageController: MainPageController;

    private router: Router | null;

    constructor() {
        this.mainPageController = new MainPageController();
        this.router = null;
    }

    public start(): void {
        const routes = this.getRoutes();

        this.router = new Router({
            root: 'main',
            mode: 'hash',
            routes,
        });
    }

    private getRoutes(): Array<RouteOption> {
        const currRoutes: Array<RouteOption> = [
            {
                path: /main/,
                callback: () => this.mainPageController.createPage(),
            },
            {
                path: /program/,
                callback: () => this.mainPageController.createPage(),
            },
            {
                path: /profile/,
                callback: () => console.log('profile page'),
            },
            {
                path: /settings/,
                callback: () => console.log('settings page'),
            },
            {
                path: /browse\/workout\/(\d{1,2})/,
                callback: (...args) => console.log('workout page', args),
            },
            {
                path: /browse/,
                callback: () => console.log('browse page'),
            },
            {
                path: /meal\/(\d{1,2})/,
                callback: (...args) => console.log('meal page', args),
            },
            {
                path: /meal/,
                callback: () => console.log('meals page'),
            },
            {
                path: /inprogress\/(\d{1,2})/,
                callback: (...args) => console.log('progress page', args),
            },
        ];

        return currRoutes;
    }
}

export default App;
