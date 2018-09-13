import { IObjectOf, SEMAPHORE } from "@thi.ng/api/api";
import * as isa from "@thi.ng/checks/is-array";
import * as iss from "@thi.ng/checks/is-string";
import { DiffLogEntry } from "@thi.ng/diff/api";
import { diffArray } from "@thi.ng/diff/array";
import { diffObject } from "@thi.ng/diff/object";
import { equivArrayLike, equivObject, equivMap, equivSet } from "@thi.ng/equiv";
import { HDOMImplementation, HDOMOpts } from "./api";

const isArray = isa.isArray;
const isString = iss.isString;

const max = Math.max;

/**
 * Takes a DOM root element and two normalized hiccup trees, `prev` and
 * `curr`. Recursively computes diff between both trees and applies any
 * necessary changes to reflect `curr` tree in target (browser DOM by
 * default).
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
 * @param opts
 * @param impl hdom implementation
 * @param parent
 * @param prev previous tree
 * @param curr current tree
 * @param child child index
 */
export const diffTree = <T>(
    opts: Partial<HDOMOpts>,
    impl: HDOMImplementation<T>,
    parent: T,
    prev: any[],
    curr: any[],
    child: number) => {

    if (curr[1].__diff === false) {
        releaseDeep(prev);
        impl.replaceChild(opts, parent, child, curr);
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
        impl.replaceChild(opts, parent, child, curr);
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
                    diffTree(opts, impl, el, prev[k], curr[eq[2]], offsets[k]);
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
                    impl.createTree(opts, el, val, offsets[idx]);
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
    const delta = diffObject(prev, curr, equiv);
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
        if (tag[1] && tag[1].__release === false) {
            return;
        }
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

const OBJP = Object.getPrototypeOf({});

const equiv = (a: any, b: any): boolean => {
    let proto;
    if (a === b) {
        return true;
    }
    if (a != null) {
        if (typeof a.equiv === "function") {
            return a.equiv(b);
        }
    } else {
        return a == b;
    }
    if (b != null) {
        if (typeof b.equiv === "function") {
            return b.equiv(a);
        }
    } else {
        return a == b;
    }
    if (typeof a === "string" || typeof b === "string") {
        return false;
    }
    if ((proto = Object.getPrototypeOf(a), proto == null || proto === OBJP) &&
        (proto = Object.getPrototypeOf(b), proto == null || proto === OBJP)) {
        return ((<any>a).__diff !== false && (<any>b).__diff !== false) ?
            equivObject(a, b, equiv) :
            false;
    }
    if (typeof a !== "function" && a.length !== undefined &&
        typeof b !== "function" && b.length !== undefined) {
        return equivArrayLike(a, b, equiv);
    }
    if (a instanceof Set && b instanceof Set) {
        return equivSet(a, b, equiv);
    }
    if (a instanceof Map && b instanceof Map) {
        return equivMap(a, b, equiv);
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    if (a instanceof RegExp && b instanceof RegExp) {
        return a.toString() === b.toString();
    }
    // NaN
    return (a !== a && b !== b);
};