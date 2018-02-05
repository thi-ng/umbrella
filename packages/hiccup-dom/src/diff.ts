import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isString } from "@thi.ng/checks/is-string";
import * as diff from "@thi.ng/diff";
import { TAG_REGEXP } from "@thi.ng/hiccup/api";

import { DEBUG } from "./api";
import { createDOM, removeAttribs, setAttrib, removeChild } from "./dom";

export function diffElement(parent: Element, prev: any, curr: any) {
    _diffElement(parent, prev, curr, 0);
}

function _diffElement(parent: Element, prev: any, curr: any, child: number) {
    const delta = diff.diffArray(prev, curr);
    const edits = delta.linear;
    const el = parent.children[child];
    if (delta.distance === 0) {
        return;
    }
    if (edits[0][0] !== 0 || prev[1].key !== curr[1].key || hasChangedEvents(prev[1], curr[1])) {
        DEBUG && console.log("replace:", prev, curr);
        releaseDeep(prev);
        removeChild(parent, child);
        createDOM(parent, curr, undefined, child);
        return;
    }
    if (prev.__release && prev.__release !== curr.__release) {
        releaseDeep(prev);
    }
    if (curr.__init && prev.__init !== curr.__init) {
        DEBUG && console.log("call __init", curr);
        const args = [el, ...(curr.__args)]; // Safari https://bugs.webkit.org/show_bug.cgi?format=multiple&id=162003
        curr.__init.apply(curr, args);
    }
    if (edits[1][0] !== 0) {
        diffAttributes(el, prev[1], curr[1]);
    }
    const equivKeys = extractEquivElements(edits);
    const n = edits.length;
    const noff = prev.length - 1;
    const offsets = [];
    let i, j, k, eq;
    for (i = noff; i >= 2; i--) {
        offsets[i] = i - 2;
    }
    for (i = 2; i < n; i++) {
        const e = edits[i], status = e[0], idx = e[1][0], val = e[1][1];
        // DEBUG && console.log(`edit: o:[${offsets.toString()}] i:${idx} s:${status}`, val);
        if (status === -1) {
            if (isArray(val)) {
                k = val[1].key;
                if (k !== undefined && equivKeys[k][2] !== undefined) {
                    eq = equivKeys[k];
                    k = eq[0];
                    // DEBUG && console.log(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);
                    _diffElement(el, prev[k], curr[eq[2]], offsets[k]);
                } else {
                    // DEBUG && console.log("remove @", offsets[idx], val);
                    releaseDeep(val);
                    removeChild(el, offsets[idx]);
                    for (j = noff; j >= idx; j--) {
                        offsets[j] = Math.max(offsets[j] - 1, 0);
                    }
                }
            } else if (isString(val)) {
                el.textContent = "";
            }
        } else if (status === 1) {
            if (isString(val)) {
                el.textContent = val;
            } else if (isArray(val)) {
                k = val[1].key;
                if (k === undefined || (k && equivKeys[k][0] === undefined)) {
                    // DEBUG && console.log("insert @", offsets[idx], val);
                    createDOM(el, val, undefined, offsets[idx]);
                    for (j = noff; j >= idx; j--) {
                        offsets[j]++;
                    }
                }
            }
        }
    }
}

function releaseDeep(tag: any) {
    if (isArray(tag)) {
        if ((<any>tag).__release) {
            // DEBUG && console.log("call __release", tag);
            (<any>tag).__release.apply(tag, (<any>tag).__args);
            delete (<any>tag).__release;
        }
        for (let i = tag.length - 1; i >= 2; i--) {
            releaseDeep(tag[i]);
        }
    }
}

function normalizeElement(spec: any[]) {
    let tag = spec[0];
    let content = spec.slice(1), c;
    let match, id, clazz;
    const attribs: any = {};
    if (!isString(tag) || !(match = TAG_REGEXP.exec(tag))) {
        throw new Error(`${tag} is not a valid tag name`);
    }
    tag = match[1];
    id = match[2];
    clazz = match[3];
    if (id) {
        attribs.id = id;
    }
    if (clazz) {
        attribs.class = clazz.replace(/\./g, " ");
    }
    c = content[0];
    if (c != null && c.constructor === Object) {
        Object.assign(attribs, c);
        content.shift();
    }
    return [tag, attribs, content.length > 0 ? content : undefined];
}

const NO_SPANS = { text: 1, textarea: 1 };

export function normalizeTree(el: any, path = [0], keys = true, span = true) {
    if (el == null) {
        return;
    }
    if (isArray(el)) {
        if (el.length === 0) {
            return;
        }
        const tag = el[0];
        let norm;
        if (isFunction(tag)) {
            return normalizeTree(tag.apply(null, el.slice(1)), path.slice(), keys, span);
        }
        if (!isString(tag)) {
            const args = el.slice(1);
            norm = normalizeTree(tag.render.apply(null, args), path.slice(), keys, span);
            if (norm !== undefined) {
                if (keys && norm[1].key === undefined) {
                    norm[1].key = path.join("-");
                }
                norm.__init = tag.init;
                norm.__release = tag.release;
                norm.__args = args;
            }
            return norm;
        }
        norm = normalizeElement(el);
        if (keys && norm[1].key === undefined) {
            norm[1].key = path.join("-");
        }
        if (norm[2]) {
            const children = norm[2].slice();
            const n = children.length;
            norm.length = 2;
            span = span && !NO_SPANS[norm[0]];
            for (let i = 0, j = 2, k = 0; i < n; i++) {
                let el = children[i];
                if (el != null) {
                    if (!isArray(el) && !isString(el) && isIterable(el)) {
                        for (let c of el) {
                            c = normalizeTree(c, [...path, k], keys, span);
                            if (c !== undefined) {
                                norm[j++] = c;
                            }
                            k++;
                        }
                    } else {
                        el = normalizeTree(el, [...path, k], keys, span);
                        if (el !== undefined) {
                            norm[j++] = el;
                        }
                        k++;
                    }
                }
            }
        }
        return norm;
    }
    if (isFunction(el)) {
        return normalizeTree(el(), path, keys, span);
    }
    return span ?
        ["span", keys ? { key: path.join("-") } : {}, el.toString()] :
        el.toString();
}

function hasChangedEvents(prev: any, curr: any) {
    for (let k in curr) {
        if (k.indexOf("on") === 0 && prev[k] !== curr[k]) {
            return true;
        }
    }
    return false;
}

function diffAttributes(el: Element, prev: any, curr: any) {
    const delta = diff.diffObject(prev, curr);
    let i, a, attribs;
    DEBUG && console.log("diff attribs:", delta);
    removeAttribs(el, delta.dels);
    for (attribs = delta.edits, i = attribs.length - 1; i >= 0; i--) {
        a = attribs[i];
        setAttrib(el, a[0], a[1]);
    }
    for (attribs = delta.adds, i = attribs.length - 1; i >= 0; i--) {
        a = attribs[i];
        setAttrib(el, a, curr[a]);
    }
}

function extractEquivElements(edits: diff.DiffLogEntry[]) {
    const equiv = {};
    let k;
    for (let i = edits.length - 1; i >= 0; i--) {
        const e = edits[i];
        const v = e[1][1];
        if (isArray(v) && (k = v[1].key)) {
            equiv[k] = equiv[k] || [, ,];
            equiv[k][e[0] + 1] = e[1][0];
        }
    }
    return equiv;
}
