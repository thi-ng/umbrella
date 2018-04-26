import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isDate } from "@thi.ng/checks/is-date";
import { isMap } from "@thi.ng/checks/is-map";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isRegExp } from "@thi.ng/checks/is-regexp";
import { isSet } from "@thi.ng/checks/is-set";

export function equiv(a, b): boolean {
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
    if ((isSet(a) && isSet(b)) || (isMap(a) && isMap(b))) {
        return equivSetLike(a, b);
    }
    if (isDate(a) && isDate(b)) {
        return a.getTime() === b.getTime();
    }
    if (isRegExp(a) && isRegExp(b)) {
        return a.toString() === b.toString();
    }
    // NaN
    return (a !== a && b !== b);
}

function equivArrayLike(a: ArrayLike<any>, b: ArrayLike<any>) {
    let l = a.length;
    if (b.length === l) {
        while (--l >= 0 && equiv(a[l], b[l]));
    }
    return l < 0;
}

function equivSetLike(a: Set<any>, b: Set<any>) {
    if (a.size !== b.size) return false;
    return equiv([...a].sort(), [...b].sort());
}

function equivObject(a, b) {
    const keys = new Set(Object.keys(a).concat(Object.keys(b)));
    for (let k of keys) {
        if (a.hasOwnProperty(k)) {
            if (b.hasOwnProperty(k)) {
                if (equiv(a[k], b[k])) {
                    continue;
                }
            }
        }
        return false;
    }
    return true;
}
