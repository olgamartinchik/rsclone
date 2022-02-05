import { RouteOption } from '../services/types';

export interface IRouter {
    addPath: (path: RegExp, callback: () => void, isAuth?: boolean | null) => void;
    removePath: (path: RegExp) => void;
    getPath: (path: RegExp | string) => string | void;
    getRoute: () => string;
    navigate: (path?: string) => void;
    checkRoute: () => void;
}

export interface IRouterOptions {
    root: string;
    routes?: RouteOption[];
}
