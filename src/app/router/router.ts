import { RouteOption } from '../services/types';
import { IRouter, IRouterOptions } from './interfaces';

export class Router implements IRouter {
    private routes: Array<RouteOption>;

    private mode: string | null;

    private root: string;

    private current: string | null;

    private intervalId: ReturnType<typeof setInterval> | null;

    constructor(options: IRouterOptions) {
        this.routes = options.routes;
        this.mode = null;
        this.root = '/';
        this.mode = window.history.length ? 'history' : 'hash';
        if (options.root) {
            this.root = options.root;
        }
        if (options.mode) {
            this.mode = options.mode;
        }
        this.current = null;
        this.intervalId = null;
        this.listen();
    }

    addPath(path: RegExp, callback: () => void): void {
        this.routes.push({
            path,
            callback,
        });
    }

    removePath(path: RegExp): void {
        const routeToDelete = this.routes.find((route: RouteOption) => route.path === path);
        if (routeToDelete) {
            this.routes.splice(this.routes.indexOf(routeToDelete), 1);
        }
    }

    getPath(path: RegExp | string): string {
        return path.toString().replace(/^\//, '').replace(/\\/, '').replace(/\/$/, '');
    }

    getRoute(): string {
        let route = '';

        if (this.mode === 'history') {
            route = this.getPath(decodeURI(window.location.pathname + window.location.search));
            route = route.replace(/\?(.*)$/, '');
            route = this.root !== '/main' ? route.replace(this.root, '/main') : route;
        } else {
            const match = window.location.href.match(/#(.*)$/);
            route = match && match[1] ? match[1] : '/main';
        }

        return this.getPath(route);
    }

    findCurrentRoute(route: string): object | void {
        if (!route) {
            return {};
        }
        const currRoute = this.routes.find((item) => item.path.test(route));
        if (currRoute) {
            return currRoute;
        }
    }

    navigate(path = ''): void {
        if (this.mode === 'history') {
            window.history.pushState(null, '', this.root + this.getPath(path));
        } else {
            window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#/${this.getPath(path)}`;
        }
    }

    listen(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(this.checkRoute.bind(this), 50);
    }

    checkRoute(): void {
        if (this.current === this.getRoute()) {
            return;
        }

        this.current = this.getRoute();
        
        this.routes.some((route) => {
            if (this.current) {
                const match = this.current.match(route.path) as [];

                if (match) {
                    const currRoute = match.shift();
                    this.navigate(currRoute);

                    route.callback.apply({}, match);
                    return this;
                }
                this.navigate(this.root);

                return false;
            }
        });
    }
}
