import { IObjectOf, SEMAPHORE } from "@thi.ng/api/api";
import * as isa from "@thi.ng/checks/is-array";
import * as iss from "@thi.ng/checks/is-string";
import { DiffLogEntry } from "@thi.ng/diff/api";
import { diffArray } from "@thi.ng/diff/array";
import { diffObject } from "@thi.ng/diff/object";
import { equiv } from "@thi.ng/equiv";
import { HDOMImplementation } from "./api";
import { normalizeTree } from "./normalize";

import {
    createDOM,
    getChild,
    removeAttribs,
    removeChild,
    replaceChild,
    setAttrib,
    setContent,
} from "./dom";

const isArray = isa.isArray;
const isString = iss.isString;
const max = Math.max;

const DEFAULT_IMPL: HDOMImplementation<any> = {
    createTree: createDOM,
    normalizeTree,
    getChild,
    replaceChild,
    removeChild,
    setContent,
    removeAttribs,
    setAttrib,
};

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
 * @param impl hdom implementation
 */
export const diffElement = <T>(
    root: T,
    prev: any[],
    curr: any[],
    impl: HDOMImplementation<T> = DEFAULT_IMPL) =>
    _diffElement(impl, root, prev, curr, 0);

const _diffElement = <T>(
    impl: HDOMImplementation<T>,
    parent: T,
    prev: any[],
    curr: any[],
    child: number) => {

    if (curr[1].__diff === false) {
        releaseDeep(prev);
        impl.replaceChild(parent, child, curr);
        return;
    }
    // TODO use optimized equiv?
    const delta = diffArray(prev, curr, equiv, true);
    if (delta.distance === 0) {
        return;
    }
    const edits = delta.linear;
    const el = impl.getChild(parent, child);
    let i: number;
    let j: number;
    let idx: number;
    let k: string;
    let eq: any[];
    let e: DiffLogEntry<any>;
    let status: number;
    let val: any;
    if (edits[0][0] !== 0 || prev[1].key !== curr[1].key) {
        // DEBUG && console.log("replace:", prev, curr);
        releaseDeep(prev);
        impl.replaceChild(parent, child, curr);
        return;
    }
    if ((val = (<any>prev).__release) && val !== (<any>curr).__release) {
        releaseDeep(prev);
    }
    if (edits[1][0] !== 0) {
        diffAttributes(impl, el, prev[1], curr[1]);
    }
    const equivKeys = extractEquivElements(edits);
    const numEdits = edits.length;
    const prevLength = prev.length - 1;
    const offsets = new Array(prevLength + 1);
    for (i = prevLength; i >= 2; i--) {
        offsets[i] = i - 2;
    }
    for (i = 2; i < numEdits; i++) {
        e = edits[i];
        status = e[0];
        val = e[2];

        // DEBUG && console.log(`edit: o:[${offsets.toString()}] i:${idx} s:${status}`, val);

        // element removed?
        if (status === -1) {
            if (isArray(val)) {
                k = val[1].key;
                if (k !== undefined && equivKeys[k][2] !== undefined) {
                    eq = equivKeys[k];
                    k = eq[0];
                    // DEBUG && console.log(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);
                    _diffElement(impl, el, prev[k], curr[eq[2]], offsets[k]);
                } else {
                    idx = e[1];
                    // DEBUG && console.log("remove @", offsets[idx], val);
                    releaseDeep(val);
                    impl.removeChild(el, offsets[idx]);
                    for (j = prevLength; j >= idx; j--) {
                        offsets[j] = max(offsets[j] - 1, 0);
                    }
                }
            } else if (isString(val)) {
                impl.setContent(el, "");
            }

            // element added/inserted?
        } else if (status === 1) {
            if (isString(val)) {
                impl.setContent(el, val);
            } else if (isArray(val)) {
                k = val[1].key;
                if (k === undefined || (k && equivKeys[k][0] === undefined)) {
                    idx = e[1];
                    // DEBUG && console.log("insert @", offsets[idx], val);
                    impl.createTree(el, val, offsets[idx]);
                    for (j = prevLength; j >= idx; j--) {
                        offsets[j]++;
                    }
                }
            }
        }
    }
    // call __init after all children have been added/updated
    if ((val = (<any>curr).__init) && val != (<any>prev).__init) {
        // DEBUG && console.log("call __init", curr);
        val.apply(curr, [el, ...((<any>curr).__args)]);
    }
};

const diffAttributes = <T>(impl: HDOMImplementation<T>, el: T, prev: any, curr: any) => {
    let i, e, edits;
    const delta = diffObject(prev, curr);
    impl.removeAttribs(el, delta.dels, prev);
    let value = SEMAPHORE;
    for (edits = delta.edits, i = edits.length; --i >= 0;) {
        e = edits[i];
        const a = e[0];
        if (a.indexOf("on") === 0) {
            impl.removeAttribs(el, [a], prev);
        }
        if (a !== "value") {
            impl.setAttrib(el, a, e[1], curr);
        } else {
            value = e[1];
        }
    }
    for (edits = delta.adds, i = edits.length; --i >= 0;) {
        e = edits[i];
        if (e !== "value") {
            impl.setAttrib(el, e, curr[e], curr);
        } else {
            value = curr[e];
        }
    }
    if (value !== SEMAPHORE) {
        impl.setAttrib(el, "value", value, curr);
    }
};

const releaseDeep = (tag: any) => {
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
};

const extractEquivElements = (edits: DiffLogEntry<any>[]) => {
    let k: string;
    let val: any;
    let e: DiffLogEntry<any>;
    let ek: any[];
    const equiv: IObjectOf<any[]> = {};
    for (let i = edits.length; --i >= 0;) {
        e = edits[i];
        val = e[2];
        if (isArray(val) && (k = val[1].key) !== undefined) {
            ek = equiv[k];
            !ek && (equiv[k] = ek = [, ,]);
            ek[e[0] + 1] = e[1];
        }
    }
    return equiv;
};
