import { isArray as isa, isNotStringAndIterable as isi } from "@thi.ng/checks";
import { SVG_NS, SVG_TAGS } from "@thi.ng/hiccup";
import { css } from "@thi.ng/hiccup";
import { HDOMImplementation, HDOMOpts } from "./api";

const isArray = isa;
const isNotStringAndIterable = isi;

const maybeInitElement = <T>(el: T, tree: any) =>
    tree.__init && tree.__init.apply(tree.__this, [el, ...tree.__args]);

/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param parent
 * @param tree
 * @param insert
 */
export const createTree = <T>(
    opts: Partial<HDOMOpts>,
    impl: HDOMImplementation<T>,
    parent: T,
    tree: any,
    insert?: number
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
                insert
            );
        }
        const el = impl.createElement(parent, tag, attribs, insert);
        if (tree.length > 2) {
            const n = tree.length;
            for (let i = 2; i < n; i++) {
                createTree(opts, impl, el, tree[i]);
            }
        }
        maybeInitElement<T>(el, tree);
        return el;
    }
    if (isNotStringAndIterable(tree)) {
        const res = [];
        for (let t of tree) {
            res.push(createTree(opts, impl, parent, t));
        }
        return res;
    }
    if (tree == null) {
        return parent;
    }
    return impl.createTextElement(parent, tree);
};

/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param parent
 * @param tree
 * @param index
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
            a.indexOf("on") === 0 && impl.setAttrib(el, a, attribs[a]);
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
 * @param parent
 * @param tag
 * @param attribs
 * @param insert
 */
export const createElement = (
    parent: Element,
    tag: string,
    attribs?: any,
    insert?: number
) => {
    const el = SVG_TAGS[tag]
        ? document.createElementNS(SVG_NS, tag)
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
    tree: any
) => (
    impl.removeChild(parent, child), impl.createTree(opts, parent, tree, child)
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
 * `setAttribs`) and the function's return value is used as the actual
 * attrib value.
 *
 * Special rules apply for certain attributes:
 *
 * - "style": delegated to `setStyle()`
 * - "value": delegated to `updateValueAttrib()`
 * - attrib IDs starting with "on" are treated as event listeners
 *
 * If the given (or computed) attrib value is `false` or `undefined` the
 * attrib is removed from the element.
 *
 * @param el
 * @param id
 * @param val
 * @param attribs
 */
export const setAttrib = (el: Element, id: string, val: any, attribs?: any) => {
    if (id.startsWith("__")) return;
    const isListener = id.indexOf("on") === 0;
    if (!isListener && typeof val === "function") {
        val = val(attribs);
    }
    if (val !== undefined && val !== false) {
        switch (id) {
            case "style":
                setStyle(el, val);
                break;
            case "value":
                updateValueAttrib(<HTMLInputElement>el, val);
                break;
            case "accesskey":
                (<any>el).accessKey = val;
                break;
            case "contenteditable":
                (<any>el).contentEditable = val;
                break;
            case "tabindex":
                (<any>el).tabIndex = val;
                break;
            case "align":
            case "autocapitalize":
            case "checked":
            case "dir":
            case "draggable":
            case "hidden":
            case "id":
            case "lang":
            case "namespaceURI":
            case "scrollTop":
            case "scrollLeft":
            case "title":
                // TODO add more properties / enumerated attribs?
                (<any>el)[id] = val;
                break;
            default:
                isListener
                    ? setListener(el, id.substr(2), val)
                    : el.setAttribute(id, val === true ? "" : val);
        }
    } else {
        (<any>el)[id] != null ? ((<any>el)[id] = null) : el.removeAttribute(id);
    }
    return el;
};

/**
 * Updates an element's `value` property. For form elements it too
 * ensures the edit cursor retains its position.
 *
 * @param el
 * @param v
 */
export const updateValueAttrib = (el: HTMLInputElement, v: any) => {
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
            if ((ev = el.value) !== undefined && typeof v === "string") {
                const off = v.length - (ev.length - (el.selectionStart || 0));
                el.value = v;
                el.selectionStart = el.selectionEnd = off;
                break;
            }
        default:
            el.value = v;
    }
};

export const removeAttribs = (el: Element, attribs: string[], prev: any) => {
    for (let i = attribs.length; --i >= 0; ) {
        const a = attribs[i];
        if (a.indexOf("on") === 0) {
            removeListener(el, a.substr(2), prev[a]);
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
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
 */
export const setListener = (
    el: Element,
    id: string,
    listener: EventListener | [EventListener, boolean | AddEventListenerOptions]
) =>
    isArray(listener)
        ? el.addEventListener(id, ...listener)
        : el.addEventListener(id, listener);

/**
 * Removes event listener (possibly with options).
 *
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
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
