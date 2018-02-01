import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";

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
    if (isPlainObject(a) && isPlainObject(b)) {
        return equivObject(a, b);
    }
    if (isArrayLike(a) && isArrayLike(b)) {
        return equivArrayLike(a, b);
    }
    return false;
}

function equivArrayLike(a: ArrayLike<any>, b: ArrayLike<any>) {
    let l = a.length;
    if (b.length === l) {
        while (--l >= 0 && equiv(a[l], b[l]));
    }
    return l < 0;
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
