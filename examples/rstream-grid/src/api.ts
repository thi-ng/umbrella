import type { Fn, IObjectOf, Path } from "@thi.ng/api";
import type { IView } from "@thi.ng/atom";
import { EffectDef, EventBus, EventDef } from "@thi.ng/interceptors";

/**
 * Function signature for main app components.
 * I.e. components representing different app states linked to router.
 */
export type AppComponent = (ctx: AppContext, ...args: any[]) => any;

/**
 * Derived view configurations.
 */
export type ViewSpec = string | Path | [string | Path, Fn<any, any>];

/**
 * Structure of the overall application config object.
 * See `src/config.ts`.
 */
export interface AppConfig {
    rootComponent: AppComponent;
    domRoot: string | Element;
    effects: IObjectOf<EffectDef>;
    events: IObjectOf<EventDef>;
    initialState: any;
    ui: UIAttribs;
    views: Partial<Record<keyof AppViews, ViewSpec>>;
}

/**
 * Base structure of derived views exposed by the base app.
 * Add more declarations here as needed.
 */
export interface AppViews extends Record<keyof AppViews, IView<any>> {
    svg: IView<any[]>;
    cols: IView<number>;
    rows: IView<number>;
    theta: IView<number>;
    stroke: IView<number>;
}

/**
 * Helper interface to pre-declare keys of shared UI attributes for
 * components and so enable autocomplete & type safety.
 *
 * See `AppConfig` above and its use in `src/config.ts` and various
 * component functions.
 */
export interface UIAttribs {
    button: any;
    buttongroup: any;
    footer: any;
    link: any;
    root: any;
    slider: { root: any; range: any; label: any; number: any };
    sidebar: any;
}

/**
 * Structure of the context object passed to all component functions
 */
export interface AppContext {
    bus: EventBus;
    views: AppViews;
    ui: UIAttribs;
}
