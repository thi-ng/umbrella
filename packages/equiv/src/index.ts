import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isDate } from "@thi.ng/checks/is-date";
import { isMap } from "@thi.ng/checks/is-map";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isRegExp } from "@thi.ng/checks/is-regexp";
import { isSet } from "@thi.ng/checks/is-set";

export const equiv = (a, b): boolean => {
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
    if (isPlainObject(a) && isPlainObject(b)) {
        return equivObject(a, b);
    }
    if (isArrayLike(a) && isArrayLike(b)) {
        return equivArrayLike(a, b);
    }
    if (isSet(a) && isSet(b)) {
        return equivSet(a, b);
    }
    if (isMap(a) && isMap(b)) {
        return equivMap(a, b);
    }
    if (isDate(a) && isDate(b)) {
        return a.getTime() === b.getTime();
    }
    if (isRegExp(a) && isRegExp(b)) {
        return a.toString() === b.toString();
    }
    // NaN
    return (a !== a && b !== b);
};

const equivArrayLike = (a: ArrayLike<any>, b: ArrayLike<any>) => {
    let l = a.length;
    if (b.length === l) {
        while (--l >= 0 && equiv(a[l], b[l]));
    }
    return l < 0;
};

const equivSet = (a: Set<any>, b: Set<any>) =>
    (a.size === b.size) &&
    equiv([...a.keys()].sort(), [...b.keys()].sort());

const equivMap = (a: Map<any, any>, b: Map<any, any>) =>
    (a.size === b.size) &&
    equiv([...a].sort(), [...b].sort());

const equivObject = (a: any, b: any) => {
    const ka = Object.keys(a);
    if (ka.length !== Object.keys(b).length) return false;
    for (let i = ka.length, k; --i >= 0;) {
        k = ka[i];
        if (!b.hasOwnProperty(k) || !equiv(a[k], b[k])) {
            return false;
        }
    }
    return true;
};
