import { equiv } from "@thi.ng/equiv";
import * as isa from "@thi.ng/checks/is-array";
import * as iss from "@thi.ng/checks/is-string";
import * as diff from "@thi.ng/diff";

import {
    createDOM,
    removeAttribs,
    removeChild,
    setAttrib
} from "./dom";

const isArray = isa.isArray;
const isString = iss.isString;
const diffArray = diff.diffArray;
const diffObject = diff.diffObject;

const SEMAPHORE = Symbol("SEMAPHORE");

/**
 * Takes a DOM root element and two hiccup trees, `prev` and `curr`.
 * Recursively computes diff between both trees and applies any
 * necessary changes to reflect `curr` tree in real DOM.
 *
 * For newly added components, calls `init` with created DOM element
 * (plus user provided context and any other args) for any components
 * with `init` life cycle method. Likewise, calls `release` on
 * components with `release` method when the DOM element is removed.
 *
 * Important: The actual DOM element given is assumed to exactly
 * represent the state of the `prev` tree. Since this function does NOT
 * track the real DOM at all, the resulting changes will result in
 * potentially undefined behavior if there're discrepancies.
 *
 * @param root
 * @param prev previous tree
 * @param curr current tree
 */
export function diffElement(root: Element, prev: any, curr: any) {
    _diffElement(root, prev, curr, 0);
}

function _diffElement(parent: Element, prev: any, curr: any, child: number) {
    const delta = diffArray(prev, curr, equiv, true);
    if (delta.distance === 0) {
        return;
    }
    const edits = delta.linear;
    const el = parent.children[child];
    let i, j, k, eq, e, status, idx, val;
    if (edits[0][0] !== 0 || (i = prev[1]).key !== (j = curr[1]).key) {
        // DEBUG && console.log("replace:", prev, curr);
        releaseDeep(prev);
        removeChild(parent, child);
        createDOM(parent, curr, child);
        return;
    }
    if ((i = prev.__release) && i !== curr.__release) {
        releaseDeep(prev);
    }
    if (edits[1][0] !== 0) {
        diffAttributes(el, prev[1], curr[1]);
    }
    const equivKeys = extractEquivElements(edits);
    const n = edits.length;
    const noff = prev.length - 1;
    const offsets = new Array(noff + 1);
    for (i = noff; i >= 2; i--) {
        offsets[i] = i - 2;
    }
    for (i = 2; i < n; i++) {
        e = edits[i], status = e[0], val = e[2];
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
                    idx = e[1];
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
                    idx = e[1];
                    // DEBUG && console.log("insert @", offsets[idx], val);
                    createDOM(el, val, offsets[idx]);
                    for (j = noff; j >= idx; j--) {
                        offsets[j]++;
                    }
                }
            }
        }
    }
    if ((i = curr.__init) && i != prev.__init) {
        // DEBUG && console.log("call __init", curr);
        i.apply(curr, [el, ...(curr.__args)]);
    }
}

function releaseDeep(tag: any) {
    if (isArray(tag)) {
        if ((<any>tag).__release) {
            // DEBUG && console.log("call __release", tag);
            (<any>tag).__release.apply(tag, (<any>tag).__args);
            delete (<any>tag).__release;
        }
        for (let i = tag.length; --i >= 2;) {
            releaseDeep(tag[i]);
        }
    }
}

function diffAttributes(el: Element, prev: any, curr: any) {
    let i, e, edits;
    const delta = diffObject(prev, curr);
    removeAttribs(el, delta.dels, prev);
    let value = SEMAPHORE;
    for (edits = delta.edits, i = edits.length; --i >= 0;) {
        e = edits[i];
        const a = e[0];
        if (a.indexOf("on") === 0) {
            el.removeEventListener(a.substr(2), prev[a]);
        }
        if (a !== "value") {
            setAttrib(el, a, e[1], curr);
        } else {
            value = e[1];
        }
    }
    for (edits = delta.adds, i = edits.length; --i >= 0;) {
        e = edits[i];
        if (e !== "value") {
            setAttrib(el, e, curr[e], curr);
        } else {
            value = curr[e];
        }
    }
    if (value !== SEMAPHORE) {
        setAttrib(el, "value", value, curr);
    }
}

function extractEquivElements(edits: diff.DiffLogEntry<any>[]) {
    let k, v, e, ek;
    const equiv = {};
    for (let i = edits.length; --i >= 0;) {
        e = edits[i];
        v = e[2];
        if (isArray(v) && (k = v[1].key) !== undefined) {
            ek = equiv[k];
            !ek && (equiv[k] = ek = [, ,]);
            ek[e[0] + 1] = e[1];
        }
    }
    return equiv;
}
