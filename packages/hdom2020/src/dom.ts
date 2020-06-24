import { deref, isDeref, MaybeDeref } from "@thi.ng/api";
import {
    implementsFunction,
    isArray,
    isFunction,
    isNotStringAndIterable,
    isNumber,
    isString,
} from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { ATTRIB_JOIN_DELIMS, RE_TAG, SVG_NS, SVG_TAGS } from "@thi.ng/hiccup";
import type { NumOrElement } from "./api";
import { isComponent } from "./utils";

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
 * - `[function, ...args]`
 * - ES6 iterator of the above (as children only!)
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
): Promise<any> => {
    if (isArray(tree)) {
        const tag = tree[0];
        if (isString(tag)) {
            parent = $el(tag, tree[1], null, parent, idx);
            const n = tree.length;
            for (let i = 2; i < n; i++) {
                $tree(tree[i], parent);
            }
            return parent;
        }
        if (isComponent(tag)) {
            return tag.mount(parent, idx, ...tree.slice(1));
        }
        if (isFunction(tag)) {
            return $tree(tag.apply(null, tree.slice(1)), parent);
        }
        illegalArgs(`tag not supported: ${tag}`);
    }
    if (isComponent(tree)) {
        return tree.mount(parent, idx);
    }
    if (isDeref(tree)) {
        return $tree(tree.deref(), parent);
    }
    if (isNotStringAndIterable(tree)) {
        for (let t of tree) {
            $tree(t, parent);
        }
    }
    return tree != null
        ? $el("span", null, tree, <HTMLElement>parent, idx)
        : null;
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
        let [, mtag, id, clazz] = match;
        attribs = { ...attribs };
        id && (attribs.id = id);
        if (clazz) {
            clazz = clazz.replace(/\./g, " ");
            const aclass = attribs.class;
            if (aclass) {
                !isString(aclass) &&
                    (attribs.class = updateClasses("", aclass));
                attribs.class += " " + clazz;
            } else {
                attribs.class = clazz;
            }
        }
        tag = mtag;
    }
    const el = SVG_TAGS[tag]
        ? document.createElementNS(SVG_NS, tag)
        : document.createElement(tag);
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

export const $remove = (el: Element) => el.remove(); //el.parentNode!.removeChild(el);

export const $move = (
    el: Element,
    newParent: Element,
    idx: NumOrElement = -1
) => {
    $remove(el);
    $addChild(newParent, el, idx);
};

export const $clear = (el: Element) => ((el.innerHTML = ""), el);

export const $text = (el: HTMLElement, body: any) => {
    el.innerText = String(deref(body));
};

export const $html = (el: HTMLElement, body: MaybeDeref<string>) => {
    el.innerHTML = deref(body);
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
        id = id.substr(2);
        isArray(val)
            ? el.addEventListener(id, val[0], val[1])
            : el.addEventListener(id, val);
        return;
    }
    isFunction(val) && (val = val(attribs));
    isArray(val) && (val = val.join(ATTRIB_JOIN_DELIMS[id] || " "));
    switch (id) {
        case "class":
            el.className = isString(val)
                ? val
                : updateClasses(el.className, val);
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
        default:
            val === false || val == null
                ? el.removeAttribute(id)
                : el.setAttribute(id, val);
    }
};

const updateClasses = (existing: string, val: any) => {
    const classes = new Set(existing.split(" "));
    val = deref(val);
    if (isString(val)) {
        classes.add(val);
    } else {
        for (let id in val) {
            deref(val[id]) ? classes.add(id) : classes.delete(id);
        }
    }
    return [...classes].join(" ");
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
        let v = deref(attribs[id]);
        isFunction(v) && (v = v(attribs));
        data[id] = v;
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
