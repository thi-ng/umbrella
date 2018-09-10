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
     * If true (default), all text content will be wrapped in `<span>`
     * elements. Spans will never be created inside <option>, <textarea>
     * or <text> elements.
     */
    span?: boolean;
    /**
     * If true (default false), the first frame will only be used to
     * inject event listeners, using the `hydrateDOM()` function.
     *
     * *Important:* Enabling this option assumes that an equivalent DOM
     * (minus event listeners) already exists (e.g. generated via SSR /
     * hiccup's `serialize()`) when hdom's `start()` function is called.
     * Any other discrepancies between the pre-existing DOM and the hdom
     * trees will cause undefined behavior.
     */
    hydrate?: boolean;
    /**
     * If true (default), the hdom component tree will be first
     * normalized before diffing (using `normalizeTree()`). Unless you
     * know what you're doing, it's best to leave this enabled.
     */
    normalize?: boolean;
}

/**
 * This interface defines the underlying DOM update operations used by
 * `diffElement()`. See `DEFAULT_OPS` (diff.ts) for the default
 * implementations.
 */
export interface HDOMOps<T> {
    createTree(element: T, tree: any, insert?: number): T | T[];
    getChild(element: T, child: number): T;
    removeChild(element: T, child: number);
    replaceChild(element: T, child: number, newTree: any);
    setAttrib(element: T, id: string, value: any, attribs?: any);
    removeAttribs(element: T, attribs: string[], prevAttribs: any);
    setContent(element: T, value: any);
}

export const DEBUG = false;
