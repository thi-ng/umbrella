import { IObjectOf } from "@thi.ng/api/api";

export interface ILifecycle {
    init?(el: Element, ctx: any, ...args: any[]);
    render(ctx: any, ...args: any[]): any;
    release?(ctx: any, ...args: any[]);
}

export interface ComponentAttribs {
    class?: string;
    disabled?: boolean;
    href?: string;
    id?: string;
    key?: string;
    style?: string | IObjectOf<string | number>;
    [_: string]: any;
}

export interface HDOMOpts {
    /**
     * Root element or ID (default: "app").
     */
    root: Element | string;
    /**
     * Arbitrary user context object, passed to all component functions
     * embedded in the tree.
     */
    ctx?: any;
    /**
     * If true (default), text content will be wrapped in `<span>`
     */
    span?: boolean;
    /**
     * If true (default false), the first frame will only be used to
     * inject event listeners.
     *
     * *Important:* Enabling this option assumes that an equivalent DOM
     * (minus listeners) already exists (i.e. generated via SSR) when
     * hdom's `start()` function is called. Any other discrepancies
     * between the pre-existing DOM and the hdom trees will cause
     * undefined behavior.
     */
    hydrate?: boolean;
    /**
     * If true (default), the hdom component tree will be first
     * normalized before diffing (using `normalizeTree()`). Unless you
     * know what you're doing, it's best to leave this enabled.
     */
    normalize?: boolean;
}

export const DEBUG = false;
