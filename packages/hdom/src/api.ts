import { IObjectOf } from "@thi.ng/api/api";

export interface ILifecycle {
    /**
     * Component init method. Called with the actual DOM element,
     * hdom user context and any other args when the component is
     * first used, but **after** `render()` has been called once already.
     */
    init?(el: Element, ctx: any, ...args: any[]);

    /**
     * Returns the hdom tree of this component.
     * Note: Always will be called first (prior to `init`/`release`)
     * to obtain the actual component definition used for diffing.
     * Therefore might have to include checks if any local state
     * has already been initialized via `init`. This is the only
     * mandatory method which MUST be implemented.
     *
     * `render` is executed before `init` because `normalizeTree()`
     * must obtain the component's hdom tree first before it can
     * determine if an `init` is necessary. `init` itself will be
     * called from `diffTree`, `createDOM` or `hydrateDOM()` in a later
     * phase of processing.
     *
     * `render` should ALWAYS return an array or another function,
     * else the component's `init` or `release` fns will NOT be able
     * to be called later. E.g. If the return value of `render`
     * evaluates as a string or number, the return value should be
     * wrapped as `["span", "foo"]`. If no `init` or `release` are
     * used, this requirement is relaxed.
     */
    render(ctx: any, ...args: any[]): any;

    /**
     * Called when the underlying DOM of this component is removed
     * (or replaced). Intended for cleanup tasks.
     */
    release?(ctx: any, ...args: any[]);
}

export interface HDOMBehaviorAttribs {
    /**
     * HDOM behavior control attribute. If true (default), the element
     * will be fully processed by `diffTree()`. If false, no diff will
     * be computed and the `replaceChild()` operation will be called in
     * the currently active hdom target implementation.
     */
    __diff?: boolean;
    /**
     * HDOM behavior control attribute. If present, the element and all
     * of its children will be processed by the given
     * `HDOMImplementation` instead of the default implementation.
     */
    __impl?: HDOMImplementation<any>;
    /**
     * HDOM behavior control attribute. If `false`, the current
     * element's children will not be normalized. Use this when you're
     * sure that all children are already in canonical format (incl.
     * `key` attributes). See `normalizeTree()` for details.
     */
    __normalize?: boolean;
    /**
     * HDOM behavior control attribute. If `false`, hdom will not
     * attempt to call `release()` lifecycle methods on this element or
     * any of its children.
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
