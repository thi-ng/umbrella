import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isString } from "@thi.ng/checks/is-string";
import { SVG_TAGS, SVG_NS } from "@thi.ng/hiccup/api";
import { css } from "@thi.ng/hiccup/css";
import { map } from "@thi.ng/iterators/map";

export function createDOM(parent: Element, tag: any, opts?: any, insert?: number) {
    if (isArray(tag)) {
        if (isFunction(tag[0])) {
            return createDOM(parent, tag[0].apply(null, tag.slice(1), opts));
        }
        const el = createElement(parent, tag[0], tag[1], insert);
        if ((<any>tag).__init) {
            const args = [el, ...((<any>tag).__args)]; // Safari https://bugs.webkit.org/show_bug.cgi?format=multiple&id=162003
            (<any>tag).__init.apply(tag, args);
        }
        if (tag[2]) {
            const n = tag.length;
            for (let i = 2; i < n; i++) {
                createDOM(el, tag[i], opts);
            }
        }
        return el;
    }
    if (!isString(tag) && isIterable(tag)) {
        return [...(map((x) => createDOM(parent, x, opts), tag))];
    }
    if (tag == null) {
        return parent;
    }
    return createTextElement(parent, tag);
}

export function createElement(parent: Element, tag: string, attribs?: any, insert?: number) {
    const el = SVG_TAGS[tag] ?
        document.createElementNS(SVG_NS, tag) :
        document.createElement(tag);
    if (parent) {
        if (insert === undefined) {
            parent.appendChild(el);
        } else {
            parent.insertBefore(el, parent.children[insert]);
        }
    }
    if (attribs) {
        setAttribs(el, attribs);
    }
    return el;
}

export function createTextElement(parent: Element, content: string, insert?: number) {
    const el = document.createTextNode(content);
    if (parent) {
        if (insert === undefined) {
            parent.appendChild(el);
        } else {
            parent.insertBefore(el, parent.children[insert]);
        }
    }
    return el;
}

export function cloneWithNewAttribs(el: Element, attribs: any) {
    const res = <Element>el.cloneNode(true);
    setAttribs(res, attribs);
    el.parentNode.replaceChild(res, el);
    return res;
}

export function setAttribs(el: Element, attribs: any) {
    for (let k in attribs) {
        setAttrib(el, k, attribs[k], attribs);
    }
    return el;
}

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
export function setAttrib(el: Element, id: string, val: any, attribs?: any) {
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
            default:
                if (isListener) {
                    el.addEventListener(id.substr(2), val);
                } else {
                    el.setAttribute(id, val);
                }
        }
    } else {
        el.removeAttribute(id);
    }
    return el;
}

export function updateValueAttrib(el: HTMLInputElement, v: any) {
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
}

export function removeAttribs(el: Element, attribs: string[]) {
    for (let i = attribs.length - 1; i >= 0; i--) {
        el.removeAttribute(attribs[i]);
    }
}

export function setStyle(el: Element, styles: any) {
    el.setAttribute("style", css(styles));
    return el;
}

export function clearDOM(el: Element) {
    el.innerHTML = "";
}

export function removeChild(parent: Element, childIdx: number) {
    const n = parent.children[childIdx];
    if (n !== undefined) {
        n.remove();
    }
}
