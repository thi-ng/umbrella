import type { IObjectOf } from "@thi.ng/api";

export interface ILifecycle {
	/**
	 * Component init method. Called with the actual DOM element, hdom
	 * user context and any other args when the component is first used,
	 * but **after** `render()` has been called once already AND all of
	 * the components children have been realized. Therefore, if any
	 * children have their own `init` lifecycle method, these hooks will
	 * be executed before that of the parent.
	 */
	init?(el: Element, ctx: any, ...args: any[]): void;

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
	release?(ctx: any, ...args: any[]): void;
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
	 * HDOM behavior control attribute. If true, the element will not be
	 * diffed and simply skipped. IMPORTANT: This attribute is only
	 * intended for cases when a component / tree branch should not be
	 * updated, but MUST NEVER be enabled when that component is first
	 * included in the tree. Doing so will result in undefined future
	 * behavior.
	 *
	 * Note, skipped elements and their children are being normalized,
	 * but are ignored during diffing. Therefore, if this attribute is
	 * enabled the element should either have no children OR the
	 * children are the same (type) as when the attribute is disabled
	 * (i.e. when `__skip` is falsy).
	 */
	__skip?: boolean;
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
	/**
	 * Currently only used by {@link @thi.ng/hiccup# | @thi.ng/hiccup}. No relevance for hdom. If
	 * `false`, the element and its children will be omitted from the
	 * serialized result.
	 */
	__serialize?: boolean;
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
	 * Root element or ID
	 * @defaultValue "app"
	 */
	root?: Element | string;
	/**
	 * Arbitrary user context object, passed to all component functions
	 * embedded in the tree.
	 */
	ctx?: any;
	/**
	 * Attempts to auto-expand/deref the given keys in the user supplied
	 * context object (`ctx` option) prior to *each* tree normalization.
	 * All of these values should implement the
	 * {@link @thi.ng/api#IDeref} interface (e.g. atoms, cursors, views,
	 * rstreams etc.). This feature can be used to define dynamic
	 * contexts linked to the main app state, e.g. using derived views
	 * provided by {@link @thi.ng/atom# | @thi.ng/atom}.
	 *
	 * @defaultValue none
	 */
	autoDerefKeys: PropertyKey[];
	/**
	 * If true, each elements will receive an auto-generated
	 * `key` attribute (unless one already exists).
	 *
	 * @defaultValue true
	 */
	keys?: boolean;
	/**
	 * If true, all text content will be wrapped in `<span>`
	 * elements. Spans will never be created inside <option>, <textarea>
	 * or <text> elements.
	 *
	 * @defaultValue true
	 */
	span?: boolean;
	/**
	 * If true, the first frame will only be used to inject event
	 * listeners, using the `hydrateDOM()` function.
	 *
	 * *Important:* Enabling this option assumes that an equivalent DOM
	 * (minus event listeners) already exists (e.g. generated via SSR /
	 * hiccup's `serialize()`) when hdom's `start()` function is called.
	 * Any other discrepancies between the pre-existing DOM and the hdom
	 * trees will cause undefined behavior.
	 *
	 * @defaultValue false
	 */
	hydrate?: boolean;

	/**
	 * Allow further custom opts.
	 */
	[id: string]: any;
}

/**
 * This interface defines the underlying target update operations used
 * by `diffTree()` and `createDOM()`. It allows {@link @thi.ng/hdom# | @thi.ng/hdom} to
 * be used as general purpose tree definition & differential update
 * mechanism, rather than being restricted to only work with an HTML
 * DOM. See {@link DEFAULT_IMPL} for the default implementations dealing
 * with the latter. Note: Depending on use case and tree configuration,
 * not all of these methods are required.
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
	 * Implementations MUST check for the presence of the `__impl`
	 * control attribute on each branch. If given, the current
	 * implementation MUST delegate to the `normalizeTree()` method of
	 * the specified implementation and not descent into that branch
	 * further itself.
	 *
	 * Furthermore, if (and only if) an element has the `__normalize`
	 * control attrib set to `false`, the normalization of that
	 * element's children MUST be skipped.
	 *
	 * Calling this function is a prerequisite before passing a
	 * component tree to `diffTree()`. Recursively expands given hiccup
	 * component tree into its canonical form:
	 *
	 * ```
	 * ["tag", { attribs }, ...body]
	 * ```
	 *
	 * - resolves Emmet-style tags (e.g. from `div#id.foo.bar`)
	 * - adds missing attribute objects (and `key` attribs)
	 * - merges Emmet-style classes with additional `class` attrib
	 *   values (if given), e.g. `["div.foo", { class: "bar" }]` =>
	 *   `["div", {class: "bar foo" }]`
	 * - evaluates embedded functions and replaces them with their
	 *   result
	 * - calls the `render` life cycle method on component objects and
	 *   uses result
	 * - consumes iterables and normalizes their individual values
	 * - calls `deref()` on elements implementing the `IDeref` interface
	 *   and uses returned results
	 * - calls `toHiccup()` on elements implementing the `IToHiccup`
	 *   interface and uses returned results
	 * - calls `.toString()` on any other non-component value and by
	 *   default wraps it in `["span", x]`. The only exceptions to this
	 *   are: `button`, `option`, `textarea` and SVG `text` elements,
	 *   for which spans are never created.
	 *
	 * Additionally, unless the `keys` option is explicitly set to
	 * false, an unique `key` attribute is created for each node in the
	 * tree. This attribute is used by `diffTree` to determine if a
	 * changed node can be patched or will need to be moved, replaced or
	 * removed.
	 *
	 * In terms of life cycle methods: `render` should ALWAYS return an
	 * array or another function, else the component's `init` or
	 * `release` fns will NOT be able to be called. E.g. If the return
	 * value of `render` evaluates as a string or number, it should be
	 * wrapped as `["span", "foo"]` or an equivalent wrapper node. If no
	 * `init` or `release` methods are used, this requirement is
	 * relaxed.
	 *
	 * See `normalizeElement` (normalize.ts) for further details about
	 * the canonical element form.
	 *
	 * @param tree - component tree
	 * @param opts - hdom config options
	 */
	normalizeTree(opts: Partial<HDOMOpts>, tree: any): any[];

	/**
	 * Realizes the given hdom tree in the target below the `parent`
	 * node, e.g. in the case of the browser DOM, creates all required
	 * DOM elements encoded by the given hdom tree.
	 *
	 * @remarks
	 * If `parent` is null the result tree won't be attached to any
	 * parent. If `child` is given, the new elements will be inserted at
	 * given child index.
	 *
	 * For any components with `init` life cycle methods, the
	 * implementation MUST call `init` with the created element, the
	 * user provided context (obtained from `opts`) and any other args.
	 * `createTree()` returns the created root element(s) - usually only
	 * a single one, but can be an array of elements, if the provided
	 * tree is an iterable of multiple roots. The default implementation
	 * creates text nodes for non-component values. Returns `parent` if
	 * tree is `null` or `undefined`.
	 *
	 * Implementations MUST check for the presence of the `__impl`
	 * control attribute on each branch. If given, the current
	 * implementation MUST delegate to the `createTree()` method of the
	 * specified implementation and not descent into that branch further
	 * itself.
	 *
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param tree - component tree
	 * @param child - child index
	 * @param init - true, if {@link ILifecycle.init} methods are called
	 */
	createTree(
		opts: Partial<HDOMOpts>,
		parent: T,
		tree: any,
		child?: number,
		init?: boolean
	): T | T[];

	/**
	 * Takes a target root element and normalized hdom tree, then walks
	 * tree and initializes any event listeners and components with life
	 * cycle `init` methods. Assumes that an equivalent "DOM" (minus
	 * listeners) already exists when this function is called. Any other
	 * discrepancies between the pre-existing DOM and the hdom tree
	 * might cause undefined behavior.
	 *
	 * Implementations MUST check for the presence of the `__impl`
	 * control attribute on each branch. If given, the current
	 * implementation MUST delegate to the `hydrateTree()` method of the
	 * specified implementation and not descent into that branch further
	 * itself.
	 *
	 * @param opts - hdom config options
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param tree - component tree
	 * @param child - child index
	 */
	hydrateTree(
		opts: Partial<HDOMOpts>,
		parent: T,
		tree: any,
		child?: number
	): void;

	/**
	 * Takes an `HDOMOpts` options object, a `parent` element and two
	 * normalized hiccup trees, `prev` and `curr`. Recursively computes
	 * diff between both trees and applies any necessary changes to
	 * reflect `curr` tree, based on the differences to `prev`, in
	 * target (browser DOM when using the `DEFAULT_IMPL`
	 * implementation).
	 *
	 * All target modification operations are delegated to the given
	 * implementation. `diffTree()` merely manages which elements or
	 * attributes need to be created, updated or removed and this NEVER
	 * involves any form of tracking of the actual underlying target
	 * data structure (e.g. the real browser DOM). hdom in general and
	 * `diffTree()` specifically are stateless. The only state available
	 * is implicitly defined by the two trees given (prev / curr).
	 *
	 * Implementations MUST check for the presence of the `__impl`
	 * control attribute on each branch. If present AND different than
	 * the current implementation, the latter MUST delegate to the
	 * `diffTree()` method of the specified implementation and not
	 * descent into that branch further itself.
	 *
	 * Furthermore, if (and only if) an element has the `__diff` control
	 * attribute set to `false`, then:
	 *
	 * 1) Computing the difference between old & new branch MUST be
	 *    skipped
	 * 2) The implementation MUST recursively call any `release` life
	 *    cycle methods present anywhere in the current `prev` tree
	 *    (branch). The recursive release process itself is implemented
	 *    by the exported `releaseDeep()` function in `diff.ts`. Custom
	 *    implementations are encouraged to reuse this, since that
	 *    function also takes care of handling the `__release` attrib:
	 *    if the attrib is present and set to false, `releaseDeep()`
	 *    will not descend into the branch any further.
	 * 3) Call the current implementation's `replaceChild()` method to
	 *    replace the old element / branch with the new one.
	 *
	 * @param opts - hdom config options
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param prev - previous component tree
	 * @param curr - current component tree
	 * @param child - child index
	 */
	diffTree(
		opts: Partial<HDOMOpts>,
		parent: T,
		prev: any[],
		curr: any[],
		child?: number
	): void;

	/**
	 * Creates a new element of type `tag` with optional `attribs`. If
	 * `parent` is not `null`, the new element will be inserted as child
	 * at given `insert` index. If `child` is missing, the element will
	 * be appended to the `parent`'s list of children. Returns new
	 * target DOM node.
	 *
	 * In the default implementation, if `tag` is a known SVG element
	 * name, the new element will be created with the proper SVG XML
	 * namespace.
	 *
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param tag - element tag name
	 * @param attribs - element attributes
	 * @param child - child index
	 */
	createElement(parent: T, tag: string, attribs?: any, child?: number): T;

	/**
	 * Creates and appends the given `content` as text child node to
	 * `parent` in the target.
	 *
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param content - content
	 */
	createTextElement(parent: T, content: string): T;

	/**
	 * Attempts to find an element with the given `id` attribute in the
	 * implementation's tree. In the default implementation this is
	 * merely delegated to `document.getElementById()`.
	 *
	 * @param id - element ID
	 */
	getElementById(id: string): T | null;

	/**
	 * A (potentially) optimized version of these 2 operations in
	 * sequence:
	 *
	 * ```
	 * impl.removeChild(parent, child);
	 * impl.createTree(parent, child, newTree);
	 * ```
	 *
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param child - child index
	 * @param newTree - component tree
	 */
	replaceChild(
		opts: Partial<HDOMOpts>,
		parent: T,
		child: number,
		newTree: any,
		init?: boolean
	): T | T[];

	/**
	 * Retrieves child of `parent` node at index `i`.
	 *
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param i - child index
	 */
	getChild(parent: T, i: number): T;

	/**
	 * Removes the child of `parent` at index `i` in the target.
	 *
	 * @param parent - parent node in target (e.g. DOM element)
	 * @param i - child index
	 */
	removeChild(parent: T, i: number): void;

	/**
	 * Sets the given attribute `id` to new `value`. Note: `value`
	 * itself can be a function and if so, the default behavior is to
	 * call this function with the also provided `attribs` object to
	 * allow it to produce a derived value. See `setAttrib()` (dom.ts)
	 * for details.
	 *
	 * @param element - target element / DOM node
	 * @param id - attribute name
	 * @param value - attribute value
	 * @param attribs - object with all attribs
	 */
	setAttrib(element: T, id: string, value: any, attribs?: any): void;

	/**
	 * Removes given `attribs` from target `element`. The attributes
	 * from the previous tree are provided for reference (e.g. to be
	 * able to remove DOM event listeners).
	 *
	 * @param element - target element / DOM node
	 * @param attribs - element attributes
	 * @param prevAttribs - previous attributes
	 */
	removeAttribs(element: T, attribs: string[], prevAttribs: any): void;

	/**
	 * Sets target `element`'s text / body content. Note: In the default
	 * browser DOM implementation, this will implicitly remove any
	 * existing child elements in the target. In practice this function
	 * is only applied to `["span"]` elements, since (by default) any
	 * body content is automatically wrapped in such by
	 * `normalizeTree()`.
	 *
	 * @param element - target element / DOM node
	 * @param value - new content
	 */
	setContent(element: T, value: any): void;
}
