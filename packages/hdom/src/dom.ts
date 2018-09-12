import * as isa from "@thi.ng/checks/is-array";
import * as isf from "@thi.ng/checks/is-function";
import * as isi from "@thi.ng/checks/is-not-string-iterable";
import * as iss from "@thi.ng/checks/is-string";
import { SVG_NS, SVG_TAGS } from "@thi.ng/hiccup/api";
import { css } from "@thi.ng/hiccup/css";
import { HDOMImplementation, HDOMOpts } from "./api";

const isArray = isa.isArray;
const isFunction = isf.isFunction;
const isNotStringAndIterable = isi.isNotStringAndIterable
const isString = iss.isString;

/**
 * Creates an actual DOM tree from given hiccup component and `parent`
 * element. Calls `init` with created element (user provided context and
 * other args) for any components with `init` life cycle method. Returns
 * created root element(s) - usually only a single one, but can be an
 * array of elements, if the provided tree is an iterable. Creates DOM
 * text nodes for non-component values. Returns `parent` if tree is
 * `null` or `undefined`.
 *
 * @param parent
 * @param tree
 * @param insert
 */
export const createDOM = (opts: Partial<HDOMOpts>, parent: Element, tree: any, insert?: number) => {
    if (isArray(tree)) {
        const tag = tree[0];
        if (isFunction(tag)) {
            return createDOM(opts, parent, tag.apply(null, [opts.ctx, ...tree.slice(1)]), insert);
        }
        const attribs = tree[1];
        if (attribs.__impl) {
            return (<HDOMImplementation<any>>attribs.__impl).createTree(opts, parent, tree, insert);
        }
        const el = createElement(parent, tag, attribs, insert);
        if ((<any>tree).__init) {
            // TODO hdom ctx?
            (<any>tree).__init.apply((<any>tree).__this, [el, ...(<any>tree).__args]);
        }
        if (tree.length > 2) {
            const n = tree.length;
            for (let i = 2; i < n; i++) {
                createDOM(opts, el, tree[i]);
            }
        }
        return el;
    }
    if (isNotStringAndIterable(tree)) {
        const res = [];
        for (let t of tree) {
            res.push(createDOM(opts, parent, t));
        }
        return res;
    }
    if (tree == null) {
        return parent;
    }
    return createTextElement(parent, tree);
};

/**
 * Takes a DOM root element and normalized hdom tree, then walks tree
 * and initializes any event listeners and components with lifecycle
 * `init` methods. Assumes that an equivalent DOM (minus listeners)
 * already exists (e.g. generated via SSR) when called. Any other
 * discrepancies between the pre-existing DOM and the hdom tree will
 * cause undefined behavior.
 *
 * @param parent
 * @param tree
 * @param i
 */
export const hydrateDOM = (opts: Partial<HDOMOpts>, parent: Element, tree: any, i = 0) => {
    if (isArray(tree)) {
        const el = parent.children[i];
        if (isFunction(tree[0])) {
            hydrateDOM(opts, parent, tree[0].apply(null, [opts.ctx, ...tree.slice(1)]), i);
        }
        const attribs = tree[1];
        if (attribs.__impl) {
            return (<HDOMImplementation<any>>attribs.__impl).hydrateTree(opts, parent, tree, i);
        }
        if ((<any>tree).__init) {
            // TODO hdom ctx?
            (<any>tree).__init.apply((<any>tree).__this, [el, ...(<any>tree).__args]);
        }
        const attr = tree[1];
        for (let a in attr) {
            if (a.indexOf("on") === 0) {
                el.addEventListener(a.substr(2), attr[a]);
            }
        }
        for (let n = tree.length, i = 2; i < n; i++) {
            hydrateDOM(opts, el, tree[i], i - 2);
        }
    } else if (isNotStringAndIterable(tree)) {
        for (let t of tree) {
            hydrateDOM(opts, parent, t, i);
            i++;
        }
    }
};

export const createElement = (parent: Element, tag: string, attribs?: any, insert?: number) => {
    const el = SVG_TAGS[tag] ?
        document.createElementNS(SVG_NS, tag) :
        document.createElement(tag);
    if (parent) {
        if (insert == null) {
            parent.appendChild(el);
        } else {
            parent.insertBefore(el, parent.children[insert]);
        }
    }
    if (attribs) {
        setAttribs(el, attribs);
    }
    return el;
};

export const createTextElement = (parent: Element, content: string, insert?: number) => {
    const el = document.createTextNode(content);
    if (parent) {
        if (insert === undefined) {
            parent.appendChild(el);
        } else {
            parent.insertBefore(el, parent.children[insert]);
        }
    }
    return el;
};

export const getChild = (parent: Element, child: number) =>
    parent.children[child];

export const replaceChild = (opts: Partial<HDOMOpts>, parent: Element, child: number, tree: any) => {
    removeChild(parent, child);
    createDOM(opts, parent, tree, child);
};

export const cloneWithNewAttribs = (el: Element, attribs: any) => {
    const res = <Element>el.cloneNode(true);
    setAttribs(res, attribs);
    el.parentNode.replaceChild(res, el);
    return res;
};

export const setContent = (el: Element, body: any) =>
    el.textContent = body;

export const setAttribs = (el: Element, attribs: any) => {
    for (let k in attribs) {
        setAttrib(el, k, attribs[k], attribs);
    }
    return el;
};

/**
 * Sets a single attribute on given element. If attrib name is NOT
 * an event name and its value is a function, it is called with
 * given `attribs` object (usually the full attrib object passed
 * to `setAttribs`) and the function's return value is used as attrib
 * value.
 *
 * Special rules apply for certain attributes:
 *
 * - "style": see `setStyle()`
 * - "value": see `updateValueAttrib()`
 * - attrib IDs starting with "on" are treated as event listeners
 *
 * If the given (or computed) attrib value is `false` or `undefined`
 * the attrib is removed from the element.
 *
 * @param el
 * @param id
 * @param val
 * @param attribs
 */
export const setAttrib = (el: Element, id: string, val: any, attribs?: any) => {
    const isListener = id.indexOf("on") === 0;
    if (!isListener && isFunction(val)) {
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
            case "checked":
                // TODO add more native attribs?
                el[id] = val;
                break;
            default:
                if (isListener) {
                    el.addEventListener(id.substr(2), val);
                } else {
                    el.setAttribute(id, val);
                }
        }
    } else {
        el[id] != null ? (el[id] = null) : el.removeAttribute(id);
    }
    return el;
};

export const updateValueAttrib = (el: HTMLInputElement, v: any) => {
    switch (el.type) {
        case "text":
        case "textarea":
        case "password":
        case "email":
        case "url":
        case "tel":
        case "search":
            if (el.value !== undefined && isString(v)) {
                const e = el as HTMLInputElement;
                const off = v.length - (e.value.length - e.selectionStart);
                e.value = v;
                e.selectionStart = e.selectionEnd = off;
            }
        default:
            el.value = v;
    }
};

export const removeAttribs = (el: Element, attribs: string[], prev: any) => {
    for (let i = attribs.length; --i >= 0;) {
        const a = attribs[i];
        if (a.indexOf("on") === 0) {
            el.removeEventListener(a.substr(2), prev[a]);
        } else {
            el[a] ? (el[a] = null) : el.removeAttribute(a);
        }
    }
};

export const setStyle = (el: Element, styles: any) =>
    (el.setAttribute("style", css(styles)), el);

export const clearDOM = (el: Element) =>
    el.innerHTML = "";

export const removeChild = (parent: Element, childIdx: number) => {
    const n = parent.children[childIdx];
    if (n !== undefined) {
        n.remove();
    }
};
