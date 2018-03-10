import { IObjectOf } from "@thi.ng/api/api";
import { EventDef, EffectDef, ViewTransform } from "@thi.ng/atom/api";
import { HTMLRouterConfig } from "@thi.ng/router/api";

import { App } from "./app";

export type AppComponent = (app: App) => any;

export type ViewSpec = string | [string, ViewTransform<any>];

export interface AppConfig {
    router: HTMLRouterConfig;
    events: IObjectOf<EventDef>;
    effects: IObjectOf<EffectDef>;
    components: IObjectOf<AppComponent>;
    domRoot: string | Element;
    initialState?: any;
    views?: IObjectOf<ViewSpec>;
}
