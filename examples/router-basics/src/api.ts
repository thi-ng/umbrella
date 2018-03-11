import { IObjectOf } from "@thi.ng/api/api";
import { EventDef, EffectDef, ViewTransform, IView } from "@thi.ng/atom/api";
import { HTMLRouterConfig, RouteMatch } from "@thi.ng/router/api";

import { App } from "./app";

// general types defined for the base app

/**
 * Function signature for main app components.
 * I.e. components representing different app states linked to router.
 */
export type AppComponent = (app: App, ui: any) => any;

/**
 * Derived view configurations.
 */
export type ViewSpec = string | [string, ViewTransform<any>];

/**
 * Structure of the overall application config object
 */
export interface AppConfig {
    router: HTMLRouterConfig;
    events: IObjectOf<EventDef>;
    effects: IObjectOf<EffectDef>;
    components: IObjectOf<AppComponent>;
    domRoot: string | Element;
    initialState?: any;
    views?: IObjectOf<ViewSpec>;
    ui: any;
}

/**
 * Base structure of derived views exposed by the base app
 */
export interface AppViews {
    route: IView<RouteMatch>;
    routeComponent: IView<any>;
    [id: string]: IView<any>;
}

/// demo app related types

/**
 * Types for status line component
 */
export enum StatusType {
    DONE,
    INFO,
    SUCCESS,
    ERROR
}
