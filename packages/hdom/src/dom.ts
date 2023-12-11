import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArray } from "@thi.ng/checks/is-array";
import { isNotStringAndIterable } from "@thi.ng/checks/is-not-string-iterable";
import { isString } from "@thi.ng/checks/is-string";
import { ATTRIB_JOIN_DELIMS, SVG_TAGS } from "@thi.ng/hiccup/api";
import { css } from "@thi.ng/hiccup/css";
import { formatPrefixes } from "@thi.ng/hiccup/prefix";
import { XML_SVG } from "@thi.ng/prefixes/xml";
import type { HDOMImplementation, HDOMOpts } from "./api.js";

const maybeInitElement = <T>(el: T, tree: any) =>
	tree.__init && tree.__init.apply(tree.__this, [el, ...tree.__args]);

/**
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param parent - DOM element
 * @param tree - component tree
 * @param insert - child index
 */
export const createTree = <T>(
	opts: Partial<HDOMOpts>,
	impl: HDOMImplementation<T>,
	parent: T,
	tree: any,
	insert?: number,
	init = true
): any => {
	if (isArray(tree)) {
		const tag = tree[0];
		if (typeof tag === "function") {
			return createTree(
				opts,
				impl,
				parent,
				tag.apply(null, [opts.ctx, ...tree.slice(1)]),
				insert
			);
		}
		const attribs = tree[1];
		if (attribs.__impl) {
			return (<HDOMImplementation<any>>attribs.__impl).createTree(
				opts,
				parent,
				tree,
				insert,
				init
			);
		}
		const el = impl.createElement(parent, tag, attribs, insert);
		if (tree.length > 2) {
			const n = tree.length;
			for (let i = 2; i < n; i++) {
				createTree(opts, impl, el, tree[i], undefined, init);
			}
		}
		init && maybeInitElement<T>(el, tree);
		return el;
	}
	if (isNotStringAndIterable(tree)) {
		const res = [];
		for (let t of tree) {
			res.push(createTree(opts, impl, parent, t, insert, init));
		}
		return res;
	}
	if (tree == null) {
		return parent;
	}
	return impl.createTextElement(parent, tree);
};

/**
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param parent - DOM element
 * @param tree - component tree
 * @param index - child index
 */
export const hydrateTree = <T>(
	opts: Partial<HDOMOpts>,
	impl: HDOMImplementation<any>,
	parent: T,
	tree: any,
	index = 0
) => {
	if (isArray(tree)) {
		const el = impl.getChild(parent, index);
		if (typeof tree[0] === "function") {
			hydrateTree(
				opts,
				impl,
				parent,
				tree[0].apply(null, [opts.ctx, ...tree.slice(1)]),
				index
			);
		}
		const attribs = tree[1];
		if (attribs.__impl) {
			return (<HDOMImplementation<any>>attribs.__impl).hydrateTree(
				opts,
				parent,
				tree,
				index
			);
		}
		maybeInitElement(el, tree);
		for (let a in attribs) {
			a[0] === "o" && a[1] === "n" && impl.setAttrib(el, a, attribs[a]);
		}
		for (let n = tree.length, i = 2; i < n; i++) {
			hydrateTree(opts, impl, el, tree[i], i - 2);
		}
	} else if (isNotStringAndIterable(tree)) {
		for (let t of tree) {
			hydrateTree(opts, impl, parent, t, index);
			index++;
		}
	}
};

/**
 * Creates a new DOM element of type `tag` with optional `attribs`. If
 * `parent` is not `null`, the new element will be inserted as child at
 * given `insert` index. If `insert` is missing, the element will be
 * appended to the `parent`'s list of children. Returns new DOM node.
 *
 * If `tag` is a known SVG element name, the new element will be created
 * with the proper SVG XML namespace.
 *
 * @param parent - DOM element
 * @param tag - component tree
 * @param attribs - attributes
 * @param insert - child index
 */
export const createElement = (
	parent: Element,
	tag: string,
	attribs?: any,
	insert?: number
) => {
	const el = SVG_TAGS[tag]
		? document.createElementNS(XML_SVG, tag)
		: document.createElement(tag);
	attribs && setAttribs(el, attribs);
	return addChild(parent, el, insert);
};

export const createTextElement = (
	parent: Element,
	content: string,
	insert?: number
) => addChild(parent, document.createTextNode(content), insert);

export const addChild = (parent: Element, child: Node, insert?: number) =>
	parent
		? insert === undefined
			? parent.appendChild(child)
			: parent.insertBefore(child, parent.children[insert])
		: child;

export const getChild = (parent: Element, child: number) =>
	parent.children[child];

export const replaceChild = (
	opts: Partial<HDOMOpts>,
	impl: HDOMImplementation<any>,
	parent: Element,
	child: number,
	tree: any,
	init = true
) => (
	impl.removeChild(parent, child),
	impl.createTree(opts, parent, tree, child, init)
);

export const cloneWithNewAttribs = (el: Element, attribs: any) => {
	const res = <Element>el.cloneNode(true);
	setAttribs(res, attribs);
	el.parentNode!.replaceChild(res, el);
	return res;
};

export const setContent = (el: Element, body: any) => (el.textContent = body);

export const setAttribs = (el: Element, attribs: any) => {
	for (let k in attribs) {
		setAttrib(el, k, attribs[k], attribs);
	}
	return el;
};

/**
 * Sets a single attribute on given element. If attrib name is NOT an
 * event name (prefix: "on") and its value is a function, it is called
 * with given `attribs` object (usually the full attrib object passed to
 * {@link setAttribs}) and the function's return value is used as the actual
 * attrib value.
 *
 * Special rules apply for certain attributes:
 *
 * - "style": delegated to {@link setStyle}
 * - "value": delegated to {@link updateValueAttrib}
 * - attrib IDs starting with "on" are treated as event listeners
 *
 * If the given (or computed) attrib value is `false` or `undefined` the
 * attrib is removed from the element.
 *
 * @param el - DOM element
 * @param id - attribute name
 * @param val - attribute value
 * @param attribs - object of all attribs
 */
export const setAttrib = (el: Element, id: string, val: any, attribs?: any) => {
	implementsFunction(val, "deref") && (val = val.deref());
	if (id.startsWith("__")) return;
	const isListener = id[0] === "o" && id[1] === "n";
	if (isListener) {
		if (isString(val)) {
			el.setAttribute(id, val);
		} else {
			id = id.substring(2);
			isArray(val)
				? el.addEventListener(id, val[0], val[1])
				: el.addEventListener(id, val);
		}
		return el;
	}
	if (typeof val === "function") val = val(attribs);
	if (isArray(val)) val = val.join(ATTRIB_JOIN_DELIMS[id] || " ");
	switch (id) {
		case "style":
			setStyle(el, val);
			break;
		case "value":
			updateValueAttrib(<HTMLInputElement>el, val);
			break;
		case "prefix":
			el.setAttribute(id, isString(val) ? val : formatPrefixes(val));
			break;
		case "accesskey":
		case "accessKey":
			(<any>el).accessKey = val;
			break;
		case "contenteditable":
		case "contentEditable":
			(<any>el).contentEditable = val;
			break;
		case "tabindex":
		case "tabIndex":
			(<any>el).tabIndex = val;
			break;
		case "align":
		case "autocapitalize":
		case "checked":
		case "dir":
		case "draggable":
		case "hidden":
		case "id":
		case "indeterminate":
		case "lang":
		case "namespaceURI":
		case "scrollLeft":
		case "scrollTop":
		case "selectionEnd":
		case "selectionStart":
		case "slot":
		case "spellcheck":
		case "title":
			(<any>el)[id] = val;
			break;
		default:
			val === false || val == null
				? el.removeAttribute(id)
				: el.setAttribute(id, val === true ? id : val);
	}
	return el;
};

/**
 * Updates an element's `value` property. For form elements it too
 * ensures the edit cursor retains its position.
 *
 * @param el - DOM element
 * @param value - value
 */
export const updateValueAttrib = (el: HTMLInputElement, value: any) => {
	let ev;
	switch (el.type) {
		case "text":
		case "textarea":
		case "password":
		case "search":
		case "number":
		case "email":
		case "url":
		case "tel":
		case "date":
		case "datetime-local":
		case "time":
		case "week":
		case "month":
			if ((ev = el.value) !== undefined && typeof value === "string") {
				const off =
					value.length - (ev.length - (el.selectionStart || 0));
				el.value = value;
				el.selectionStart = el.selectionEnd = off;
				break;
			}
		default:
			el.value = value;
	}
};

export const removeAttribs = (el: Element, attribs: string[], prev: any) => {
	for (let i = attribs.length; i-- > 0; ) {
		const a = attribs[i];
		if (a[0] === "o" && a[1] === "n") {
			removeListener(el, a.substring(2), prev[a]);
		} else {
			el.hasAttribute(a) ? el.removeAttribute(a) : ((<any>el)[a] = null);
		}
	}
};

export const setStyle = (el: Element, styles: any) => (
	el.setAttribute("style", css(styles)), el
);

/**
 * Adds event listener (possibly with options).
 *
 * @param el - DOM element
 * @param id - event name (w/o `on` prefix)
 * @param listener -
 */
export const setListener = (
	el: Element,
	id: string,
	listener:
		| string
		| EventListener
		| [EventListener, boolean | AddEventListenerOptions]
) =>
	isString(listener)
		? el.setAttribute("on" + id, listener)
		: isArray(listener)
		? el.addEventListener(id, ...listener)
		: el.addEventListener(id, listener);

/**
 * Removes event listener (possibly with options).
 *
 * @param el - DOM element
 * @param id - event name (w/o `on` prefix)
 * @param listener -
 */
export const removeListener = (
	el: Element,
	id: string,
	listener: EventListener | [EventListener, boolean | AddEventListenerOptions]
) =>
	isArray(listener)
		? el.removeEventListener(id, ...listener)
		: el.removeEventListener(id, listener);

export const clearDOM = (el: Element) => (el.innerHTML = "");

export const removeChild = (parent: Element, childIdx: number) => {
	const n = parent.children[childIdx];
	n !== undefined && parent.removeChild(n);
};
