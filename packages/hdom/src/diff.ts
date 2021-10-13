import type { IObjectOf } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { diffArray } from "@thi.ng/diff/array";
import { diffObject } from "@thi.ng/diff/object";
import {
    equiv as _equiv,
    equivArrayLike,
    equivMap,
    equivObject,
    equivSet,
} from "@thi.ng/equiv";
import type { HDOMImplementation, HDOMOpts } from "./api.js";

const isArray = Array.isArray;
const max = Math.max;

const OBJP = Object.getPrototypeOf({});

const FN = "function";
const STR = "string";

// child index tracking template buffer
const INDEX = (() => {
    const res = new Array(2048);
    for (let i = 2, n = res.length; i < n; i++) {
        res[i] = i - 2;
    }
    return res;
})();

const buildIndex = (n: number) => {
    if (n <= INDEX.length) {
        return INDEX.slice(0, n);
    }
    const res = new Array(n);
    while (--n >= 2) {
        res[n] = n - 2;
    }
    return res;
};

/**
 * See {@link HDOMImplementation} interface for further details.
 *
 * @param opts - hdom config options
 * @param impl - hdom implementation
 * @param parent - parent element (DOM node)
 * @param prev - previous tree
 * @param curr - current tree
 * @param child - child index
 */
export const diffTree = <T>(
    opts: Partial<HDOMOpts>,
    impl: HDOMImplementation<T>,
    parent: T,
    prev: any[],
    curr: any[],
    child: number = 0
) => {
    const attribs = curr[1];
    if (attribs.__skip) {
        return;
    }
    // always replace element if __diff = false
    if (attribs.__diff === false) {
        releaseTree(prev);
        impl.replaceChild(opts, parent, child, curr);
        return;
    }
    const pattribs = prev[1];
    if (pattribs && pattribs.__skip) {
        impl.replaceChild(opts, parent, child, curr, false);
        return;
    }
    // delegate to branch-local implementation
    let _impl = attribs.__impl;
    if (_impl && _impl !== impl) {
        return _impl.diffTree(opts, _impl, parent, prev, curr, child);
    }
    const delta = diffArray(prev, curr, "only-distance-linear", equiv);
    if (delta.distance === 0) {
        return;
    }
    const edits = delta.linear!;
    const el = impl.getChild(parent, child);
    let i: number;
    let ii: number;
    let status: number;
    let val: any;
    if (edits[0] !== 0 || prev[1].key !== attribs.key) {
        // LOGGER.fine("replace:", prev, curr);
        releaseTree(prev);
        impl.replaceChild(opts, parent, child, curr);
        return;
    }
    if ((val = (<any>prev).__release) && val !== (<any>curr).__release) {
        releaseTree(prev);
    }
    if (edits[3] !== 0) {
        diffAttributes(impl, el, prev[1], curr[1]);
        // if attribs changed & distance == 2 then we're done here...
        if (delta.distance === 2) {
            return;
        }
    }
    const numEdits = edits.length;
    const prevLength = prev.length - 1;
    const equivKeys = extractEquivElements(edits);
    const offsets = buildIndex(prevLength + 1);
    for (i = 2, ii = 6; ii < numEdits; i++, ii += 3) {
        status = edits[ii];
        if (!status) continue;
        if (status === -1) {
            diffDeleted<T>(
                opts,
                impl,
                el,
                prev,
                curr,
                edits,
                ii,
                equivKeys,
                offsets,
                prevLength
            );
        } else {
            diffAdded<T>(
                opts,
                impl,
                el,
                edits,
                ii,
                equivKeys,
                offsets,
                prevLength
            );
        }
    }
    // call __init after all children have been added/updated
    if ((val = (<any>curr).__init) && val != (<any>prev).__init) {
        val.apply(curr, [el, ...(<any>curr).__args]);
    }
};

const diffDeleted = <T>(
    opts: Partial<HDOMOpts>,
    impl: HDOMImplementation<T>,
    el: T,
    prev: any[],
    curr: any[],
    edits: any[],
    ii: number,
    equivKeys: IObjectOf<any[]>,
    offsets: any[],
    prevLength: number
) => {
    const val = edits[ii + 2];
    if (isArray(val)) {
        let k = val[1].key;
        if (k !== undefined && equivKeys[k][2] !== undefined) {
            const eq = equivKeys[k];
            k = eq[0];
            // LOGGER.fine(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);
            diffTree(opts, impl, el, prev[k], curr[eq[2]], offsets[k]);
        } else {
            const idx = edits[ii + 1];
            // LOGGER.fine("remove @", offsets[idx], val);
            releaseTree(val);
            impl.removeChild(el, offsets[idx]);
            incOffsets(offsets, prevLength, idx);
        }
    } else if (typeof val === STR) {
        impl.setContent(el, "");
    }
};

const diffAdded = <T>(
    opts: Partial<HDOMOpts>,
    impl: HDOMImplementation<T>,
    el: T,
    edits: any[],
    ii: number,
    equivKeys: IObjectOf<any[]>,
    offsets: any[],
    prevLength: number
) => {
    const val = edits[ii + 2];
    if (typeof val === STR) {
        impl.setContent(el, val);
    } else if (isArray(val)) {
        const k = val[1].key;
        if (k === undefined || equivKeys[k][0] === undefined) {
            const idx = edits[ii + 1];
            // LOGGER.fine("insert @", offsets[idx], val);
            impl.createTree(opts, el, val, offsets[idx]);
            decOffsets(offsets, prevLength, idx);
        }
    }
};

const incOffsets = (offsets: any[], j: number, idx: number) => {
    for (; j > idx; j--) {
        offsets[j] = max(offsets[j] - 1, 0);
    }
};

const decOffsets = (offsets: any[], j: number, idx: number) => {
    for (; j >= idx; j--) {
        offsets[j]++;
    }
};

/**
 * Helper function for {@link diffTree} to compute & apply the difference
 * between a node's `prev` and `curr` attributes.
 *
 * @param impl - hdom implementation
 * @param el - DOM element
 * @param prev - previous attributes
 * @param curr - current attributes
 *
 * @internal
 */
export const diffAttributes = <T>(
    impl: HDOMImplementation<T>,
    el: T,
    prev: any,
    curr: any
) => {
    const delta = diffObject<any>(prev, curr, "full", _equiv);
    impl.removeAttribs(el, delta.dels!, prev);
    let val = SEMAPHORE;
    let i: number, e, edits;
    for (edits = delta.edits!, i = edits.length; (i -= 2) >= 0; ) {
        e = edits[i];
        e[0] === "o" && e[1] === "n" && impl.removeAttribs(el, [e], prev);
        e !== "value"
            ? impl.setAttrib(el, e, edits[i + 1], curr)
            : (val = edits[i + 1]);
    }
    for (edits = delta.adds!, i = edits.length; --i >= 0; ) {
        e = edits[i];
        e !== "value" ? impl.setAttrib(el, e, curr[e], curr) : (val = curr[e]);
    }
    val !== SEMAPHORE && impl.setAttrib(el, "value", val, curr);
};

/**
 * Recursively attempts to call the {@link ILifecycle.release} lifecycle
 * method on every element in given tree (branch), using depth-first
 * descent. Each element is checked for the presence of the `__release`
 * control attribute. If (and only if) it is set to `false`, further
 * descent into that element's branch is skipped.
 *
 * @param tree - hdom sub-tree
 *
 * @internal
 */
export const releaseTree = (tree: any) => {
    if (isArray(tree)) {
        let x: any;
        if ((x = tree[1]) && x.__release === false) {
            return;
        }
        if ((<any>tree).__release) {
            // LOGGER.fine("call __release", tag);
            (<any>tree).__release.apply((<any>tree).__this, (<any>tree).__args);
            delete (<any>tree).__release;
        }
        for (x = tree.length; --x >= 2; ) {
            releaseTree(tree[x]);
        }
    }
};

const extractEquivElements = (edits: any[]) => {
    let k: string;
    let val: any;
    let ek: any[];
    const equiv: IObjectOf<any[]> = {};
    for (let i = edits.length; (i -= 3) >= 0; ) {
        val = edits[i + 2];
        if (isArray(val) && (k = val[1].key) !== undefined) {
            ek = equiv[k];
            !ek && (equiv[k] = ek = [, ,]);
            ek[edits[i] + 1] = edits[i + 1];
        }
    }
    return equiv;
};

/**
 * Customized version {@link @thi.ng/equiv#equiv} which takes `__diff`
 * attributes into account (at any nesting level). If an hdom element's
 * attribute object contains `__diff: false`, the object will ALWAYS be
 * considered unequal, even if all other attributes in the object are
 * equivalent.
 *
 * @param a -
 * @param b -
 *
 * @internal
 */
export const equiv = (a: any, b: any): boolean => {
    let proto: any;
    if (a === b) {
        return true;
    }
    if (a != null) {
        if (typeof a.equiv === FN) {
            return a.equiv(b);
        }
    } else {
        return a == b;
    }
    if (b != null) {
        if (typeof b.equiv === FN) {
            return b.equiv(a);
        }
    } else {
        return a == b;
    }
    if (typeof a === STR || typeof b === STR) {
        return false;
    }
    if (
        ((proto = Object.getPrototypeOf(a)), proto == null || proto === OBJP) &&
        ((proto = Object.getPrototypeOf(b)), proto == null || proto === OBJP)
    ) {
        return (
            !((<any>a).__diff === false || (<any>b).__diff === false) &&
            equivObject(a, b, equiv)
        );
    }
    if (
        typeof a !== FN &&
        a.length !== undefined &&
        typeof b !== FN &&
        b.length !== undefined
    ) {
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
    return a !== a && b !== b;
};
