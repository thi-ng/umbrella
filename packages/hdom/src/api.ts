import { IObjectOf } from "@thi.ng/api/api";

export interface ILifecycle {
    init?(el: Element, ctx: any, ...args: any[]);
    render(ctx: any, ...args: any[]): any;
    release?(ctx: any, ...args: any[]);
}

export interface HDOMBehaviorAttribs {
    /**
     * HDOM behavior control attribute. If true (default), the element
     * will be fully processed by `diffTree()`. If false, no diff will
     * be computed and the `replaceChild()` operation will be called in
     * the currently active hdom target.
     */
    __diff?: boolean;
    /**
     * HDOM behavior control attribute. If present, the element and all
     * of its children will be processed by the given
     * `HDOMImplementation` instead of the default implementation.
     */
    __impl?: HDOMImplementation<any>;
    /**
     * HDOM behavior control attribute.
     */
    __normalize?: boolean;
    /**
     * HDOM behavior control attribute.
     */
    __release?: boolean;
}

export interface ComponentAttribs extends HDOMBehaviorAttribs {
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
    root?: Element | string;
    /**
     * Arbitrary user context object, passed to all component functions
     * embedded in the tree.
     */
    ctx?: any;
    /**
     * If true (default), each elements will receive an auto-generated
     * `key` attribute (unless one already exists).
     */
    keys?: boolean;
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
     * Allow further custom opts.
     */
    [id: string]: any;
}

/**
 * This interface defines the underlying target update operations used
 * by `diffTree()` and `createDOM()`. It allows thi.ng/hdom to be
 * used as general purpose tree definition & differential update
 * mechanism, rather than being restricted to only work with an HTML
 * DOM. See `DEFAULT_IMPL` (diff.ts) for the default implementations
 * dealing with the latter. Note: Depending on use case and tree
 * configuration, not all of these methods are required.
 *
 * Custom element-local implementations can also be provided via the
 * special `__impl` hdom element/component attribute. In this case the
 * element itself and all of its children will be processed with those
 * custom operations.
 */
export interface HDOMImplementation<T> {
    /**
     * Normalizes given hdom tree, expands Emmet-style tags, embedded
     * iterables, component functions, component objects with life cycle
     * methods and injects `key` attributes for `diffTree()` to later
     * identify changes in nesting order. During normalization any
     * embedded component functions are called with the given (optional)
     * user `ctx` object as first argument. For further details of the
     * default implementation, please see `normalizeTree()` in
     * `normalize.ts`.
     *
     * @param tree
     * @param opts
     */
    normalizeTree(opts: Partial<HDOMOpts>, tree: any): any[];
    /**
     * Realizes the given hdom tree in the target below the `parent`
     * node, e.g. in the case of the browser DOM, creates all required
     * DOM elements encoded by the hdom tree. If `parent` is null the
     * result tree won't be attached to any parent. See `createDOM()`
     * for further details. If `insert` is given, the new elements will
     * be inserted at given child index.
     *
     * @param parent
     * @param tree
     * @param insert
     */
    createTree(opts: Partial<HDOMOpts>, parent: T, tree: any, insert?: number): T | T[];
    /**
     *
     * @param opts
     * @param parent
     * @param tree
     * @param idx
     */
    hydrateTree(opts: Partial<HDOMOpts>, parent: T, tree: any, idx?: number);
    /**
     *
     * @param opts
     * @param impl
     * @param parent
     * @param prev
     * @param curr
     * @param child
     */
    diffTree(
        opts: Partial<HDOMOpts>,
        impl: HDOMImplementation<T>,
        parent: T,
        prev: any[],
        curr: any[],
        child: number);
    /**
     * A (potentially) optimized version of these 2 operations in
     * sequence:
     *
     * ```
     * impl.removeChild(parent, child);
     * impl.createTree(parent, child, newTree);
     * ```
     *
     * @param parent
     * @param child
     * @param newTree
     */
    replaceChild?(opts: Partial<HDOMOpts>, parent: T, child: number, newTree: any);
    /**
     * Retrieves child of `parent` node at index `i`.
     *
     * @param parent
     * @param i
     */
    getChild?(parent: T, i: number): T;
    /**
     * Removes the child of `parent` at index `i` in the target.
     *
     * @param parent
     * @param i
     */
    removeChild?(parent: T, i: number);
    /**
     * Sets the given attribute `id` to new `value`. Note: `value`
     * itself can be a function and if so, the default behavior is to
     * call this function with also provided `attribs` object to allow
     * it to produce a derived value. See `setAttrib()` (dom.ts) for
     * details.
     *
     * @param element
     * @param id
     * @param value
     * @param attribs
     */
    setAttrib?(element: T, id: string, value: any, attribs?: any);
    /**
     * Removes given `attribs` from target `element`. The attributes
     * from the previous tree are provided for reference (e.g. to be
     * able to remove DOM event listeners).
     *
     * @param element
     * @param attribs
     * @param prevAttribs
     */
    removeAttribs?(element: T, attribs: string[], prevAttribs: any);
    /**
     * Sets target `element`'s text/body content.
     * @param element
     * @param value
     */
    setContent?(element: T, value: any);
}

export const DEBUG = false;
