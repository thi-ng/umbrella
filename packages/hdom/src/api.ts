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
     * If true (default), each elements will receive an auto-generated
     * `key` attribute (unless one already exists).
     */
    // FIXME add/create NormalizeOpts?
    // keys?: boolean;
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
 * This interface defines the underlying target update operations used
 * by `diffElement()` and `createDOM()`. It allows thi.ng/hdom to be
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
     * methods and injects `key` attributes for `diffElement()` to later
     * identify changes in nesting order. During normalization any
     * embedded component functions are called with the given (optional)
     * user `ctx` object as first argument. For further details of the
     * default implementation, please see `normalizeTree()` in
     * `normalize.ts`.
     *
     * @param tree
     * @param ctx
     * @param path
     * @param keys
     * @param span
     */
    normalizeTree(tree: any, ctx?: any, path?: number[], keys?: boolean, span?: boolean): any[];
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
    createTree(parent: T, tree: any, insert?: number): T | T[];
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
     * A (potentially) optimized version of these 2 calls:
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
    replaceChild?(parent: T, child: number, newTree: any);
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
