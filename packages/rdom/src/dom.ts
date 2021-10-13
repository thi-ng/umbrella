import type { IObjectOf } from "@thi.ng/api";
import { deref, isDeref, MaybeDeref } from "@thi.ng/api/deref";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isNotStringAndIterable } from "@thi.ng/checks/is-not-string-iterable";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import { unsupported } from "@thi.ng/errors/unsupported";
import {
    ATTRIB_JOIN_DELIMS,
    NO_SPANS,
    RE_TAG,
    SVG_TAGS,
} from "@thi.ng/hiccup/api";
import { mergeClasses, mergeEmmetAttribs } from "@thi.ng/hiccup/attribs";
import { formatPrefixes } from "@thi.ng/hiccup/prefix";
import { XML_SVG, XML_XLINK, XML_XMLNS } from "@thi.ng/prefixes/xml";
import type { NumOrElement } from "./api.js";
import { isComponent } from "./checks.js";

/**
 * hdom-style DOM tree creation from hiccup format. Returns DOM element
 * of `tree` root. See {@link $el} for further details.
 *
 * @remarks
 * Supports elements given in these forms:
 *
 * - {@link IComponent} instance
 * - {@link IDeref} instance (must resolve to another supported type in
 *   this list)
 * - `["div#id.class", {...attribs}, ...children]`
 * - `[IComponent, ...mountargs]`
 * - `[function, ...args]`
 * - ES6 iterable of the above (for child values only!)
 *
 * Any other values will be cast to strings and added as spans to
 * current `parent`.
 *
 * @param tree
 * @param parent
 * @param idx
 */
export const $tree = async (
    tree: any,
    parent: Element,
    idx: NumOrElement = -1
): Promise<any> =>
    isArray(tree)
        ? $treeElem(tree, parent, idx)
        : isComponent(tree)
        ? tree.mount(parent, idx)
        : isDeref(tree)
        ? $tree(tree.deref(), parent)
        : isNotStringAndIterable(tree)
        ? $treeIter(tree, parent)
        : tree != null
        ? $el("span", null, tree, <HTMLElement>parent, idx)
        : null;

const $treeElem = (tree: any, parent: Element, idx: NumOrElement) => {
    const tag = tree[0];
    // [tag, attribs, ...body]
    return isString(tag)
        ? $treeTag(tree, parent, idx)
        : // [icomponent, ...args]
        isComponent(tag)
        ? tag.mount(parent, idx, ...tree.slice(1))
        : // [fn, ...args]
        isFunction(tag)
        ? $tree(tag.apply(null, tree.slice(1)), parent)
        : // unsupported
          unsupported(`tag: ${tag}`);
};

const $treeTag = (tree: any, parent: Element, idx: NumOrElement) => {
    const n = tree.length;
    const { 0: tag, 1: attribs, 2: body } = tree;
    if (n === 3 && (isString(body) || isNumber(body))) {
        // emmet-free base tag
        const tmp = /^\w+/.exec(tag);
        if (tmp && NO_SPANS[tmp[0]]) {
            // don't wrap single body in <span> here
            parent = $el(tag, attribs, body, parent, idx);
            return parent;
        }
    }
    parent = $el(tag, attribs, null, parent, idx);
    for (let i = 2; i < n; i++) {
        $tree(tree[i], parent);
    }
    return parent;
};

const $treeIter = (tree: any, parent: Element) => {
    for (let t of tree) {
        $tree(t, parent);
    }
    return null;
};

/**
 * Create a single DOM element and optionally attaches it to `parent`.
 *
 * @remarks
 * Supports Emmet-style tag names in this form: `tag#id.class1.class2`.
 * `attribs` is a plain object of element attributes. See
 * {@link $attribs} for further details.
 *
 * If `parent` is given, but no `idx` arg, the new element will be
 * appended as child.
 *
 * @param tag
 * @param attribs
 * @param body
 * @param parent
 * @param idx
 */
export const $el = (
    tag: string,
    attribs: any,
    body?: any,
    parent?: Element,
    idx: NumOrElement = -1
) => {
    const match = RE_TAG.exec(tag);
    if (match) {
        attribs = mergeEmmetAttribs({ ...attribs }, match[2], match[3]);
        tag = match[1];
    }
    let el: Element;
    const qidx = tag.indexOf(":");
    if (qidx < 0) {
        el = SVG_TAGS[tag]
            ? document.createElementNS(XML_SVG, tag)
            : document.createElement(tag);
    } else {
        el = document.createElementNS(PREFIXES[tag.substr(0, qidx)], tag);
    }
    attribs && $attribs(el, attribs);
    body != null && $text(<any>el, body);
    parent && $addChild(parent, el, idx);
    return el;
};

export const $addChild = (
    parent: Element,
    child: Element,
    idx: NumOrElement = -1
) => {
    isNumber(idx)
        ? idx < 0 || idx >= parent.children.length
            ? parent.appendChild(child)
            : parent.insertBefore(child, parent.children[idx])
        : parent.insertBefore(child, idx);
};

export const $remove = (el: Element) => el.remove();

export const $moveTo = (
    newParent: Element,
    el: Element,
    idx: NumOrElement = -1
) => {
    $remove(el);
    $addChild(newParent, el, idx);
};

export const $clear = (el: Element) => ((el.innerHTML = ""), el);

/**
 * Same as `el.innerText = body`, however if `body` is an
 * {@link @thi.ng/api#IDeref} it'll be automatically deref'd.
 *
 * @param el
 * @param body
 */
export const $text = (el: HTMLElement, body: any) => {
    el.innerText = String(deref(body));
};

/**
 * Same as `el.innerHtml = body`, use with caution! If `body` is an
 * {@link @thi.ng/api#IDeref} it'll be automatically deref'd.
 *
 * @param elß
 * @param body
 */

export const $html = (el: HTMLElement, body: MaybeDeref<string>) => {
    el.innerHTML = String(deref(body));
};

/**
 * Takes an object of attributes and applies them to given DOM element.
 *
 * @remarks
 * The following rules & transformations are applied (in the stated
 * order):
 *
 * - {@link @thi.ng/api#IDeref} values are `deref`d
 * - attributes prefixed with `on` are considered event listeners and
 *   can either have a function value or tuple of `[listener, opts]`,
 *   where `opts` are the standard `.addEventListener()` options
 * - function values for any other attribs are first called with the
 *   entire `attribs` object and return value used
 * - array values are converted into space-delimited string
 *
 * CSS classs are to given as `class` attribute, with its value either a
 * string or an object of booleans. If the latter, the given class names
 * are either added to or removed from the current list of classes.
 *
 * CSS style rules can be defined via the `style` attrib. Please
 * {@link $style} for further details.
 *
 * Data attributes are to be given as object under the `data` attribute
 * name, with its values being merged with the element's current
 * `dataset` property.
 *
 * Depending on element type the `value` attribute will be updated
 * keeping the current cursor position / selection intact.
 *
 * @param el
 * @param attribs
 */
export const $attribs = (el: Element, attribs: any) => {
    for (let id in attribs) {
        setAttrib(el, id, attribs[id], attribs);
    }
};

const setAttrib = (el: Element, id: string, val: any, attribs: any) => {
    implementsFunction(val, "deref") && (val = val.deref());
    const isListener = id.startsWith("on");
    if (isListener) {
        if (isString(val)) {
            el.setAttribute(id, val);
        } else {
            id = id.substr(2);
            isArray(val)
                ? el.addEventListener(id, val[0], val[1])
                : el.addEventListener(id, val);
        }
        return;
    }
    isFunction(val) && (val = val(attribs));
    isArray(val) && (val = val.join(ATTRIB_JOIN_DELIMS[id] || " "));
    switch (id) {
        case "class":
            el.className = isString(val)
                ? val
                : mergeClasses(el.className, val);
            break;
        case "style":
            $style(el, val);
            break;
        case "value":
            updateValueAttrib(<HTMLInputElement>el, val);
            break;
        case "data":
            updateDataAttribs(<HTMLElement>el, val);
            break;
        case "prefix":
            el.setAttribute(id, isString(val) ? val : formatPrefixes(val));
            break;
        case "accessKey":
        case "autocapitalize":
        case "checked":
        case "contentEditable":
        case "dir":
        case "draggable":
        case "hidden":
        case "id":
        case "indeterminate":
        case "lang":
        case "scrollLeft":
        case "scrollTop":
        case "selectionEnd":
        case "selectionStart":
        case "slot":
        case "spellcheck":
        case "tabIndex":
        case "title":
            (<any>el)[id] = val;
            break;
        default: {
            const idx = id.indexOf(":");
            if (idx < 0) {
                val === false || val == null
                    ? el.removeAttribute(id)
                    : el.setAttribute(id, val);
            } else {
                const ns = PREFIXES[id.substr(0, idx)];
                val === false || val == null
                    ? el.removeAttributeNS(ns, id)
                    : el.setAttributeNS(ns, id, val);
            }
        }
    }
};

const updateValueAttrib = (el: HTMLInputElement, value: any) => {
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
            if ((ev = el.value) !== undefined && isString(value)) {
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

const updateDataAttribs = (el: HTMLElement, attribs: any) => {
    const data = el.dataset;
    for (let id in attribs) {
        const v = deref(attribs[id]);
        data[id] = isFunction(v) ? v(attribs) : v;
    }
};

/**
 * Takes an object (or string) of CSS properties, compiles them into a
 * single CSS string and sets it as `style` attribute on the given
 * element.
 *
 * @remarks
 * All property values can be {@link @thi.ng/api#IDeref} values, in
 * which case they're are first `deref`d before use. If the value is a
 * function, it will be called with the entire `rules` object as arg and
 * the return value used.
 *
 * @param el
 * @param rules
 */
export const $style = (el: Element, rules: string | any) => {
    if (isString(rules)) {
        el.setAttribute("style", rules);
    } else {
        const style: any = (<HTMLElement>el).style;
        for (let id in rules) {
            let v = deref(rules[id]);
            isFunction(v) && (v = v(rules));
            style[id] = v != null ? v : "";
        }
    }
};

/**
 * @internal
 */
const PREFIXES: IObjectOf<string> = {
    svg: XML_SVG,
    xlink: XML_XLINK,
    xmlns: XML_XMLNS,
};

/**
 * Registers an XML namespace prefix and its URL for later use, e.g. to
 * define namespaced elements/attributes.
 *
 * @param prefix
 * @param url
 */
export const registerPrefix = (prefix: string, url: string) => {
    assert(
        !PREFIXES[prefix],
        `${prefix} already registered: ${PREFIXES[prefix]}`
    );
    PREFIXES[prefix] = url;
};
