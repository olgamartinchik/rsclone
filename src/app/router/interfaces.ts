import { RouteOption } from '../services/types';

export interface IRouter {
    addPath: (path: RegExp, callback: () => void) => void;
    removePath: (path: RegExp) => void;
    getPath: (path: RegExp | string) => string | void;
    getRoute: () => string;
    findCurrentRoute: (route: string) => object | void;
    navigate: (path?: string) => void;
    checkRoute: () => void;
}

export interface IRouterOptions {
    root: string;
    mode: string;
    routes: Array<RouteOption>;
}
