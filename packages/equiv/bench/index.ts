import { suite } from "@thi.ng/bench";
import { equiv } from "../src";

const objp = Object.getPrototypeOf({});

const equiv2 = (a: any, b: any) => {
    let proto: any;
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
    // const ta = typeof a;
    // const tb = typeof b;
    if (typeof a === "string" || typeof b === "string") {
        return false;
    }
    if (
        ((proto = Object.getPrototypeOf(a)), proto == null || proto === objp) &&
        ((proto = Object.getPrototypeOf(b)), proto == null || proto === objp)
    ) {
        if (a.__diff === false || b.__diff === false) {
            return false;
        }
        return equivObject2(a, b);
    }
    if (
        typeof a !== "function" &&
        a.length !== undefined &&
        typeof b !== "function" &&
        b.length !== undefined
    ) {
        return equivArrayLike(a, b);
    }
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }
    // NaN
    return a !== a && b !== b;
};

const equivArrayLike = (a: ArrayLike<any>, b: ArrayLike<any>) => {
    let l = a.length;
    if (b.length === l) {
        while (--l >= 0 && equiv2(a[l], b[l]));
    }
    return l < 0;
};

// const equivObject = (a: any, b: any) => {
//     const ka = Object.keys(a);
//     if (ka.length !== Object.keys(b).length) return false;
//     for (let i = ka.length, k; --i >= 0; ) {
//         k = ka[i];
//         if (!b.hasOwnProperty(k) || !equiv2(a[k], b[k])) {
//             return false;
//         }
//     }
//     return true;
// };

const equivObject2 = (a: any, b: any) => {
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    for (let k in a) {
        if (!b.hasOwnProperty(k) || !equiv2(a[k], b[k])) {
            return false;
        }
    }
    return true;
};

const a = {
    foo: { foo1: { foo2: 23, foo3: { foo4: {} } } },
    bar: { bar1: { bar2: 42, bar3: { bar4: { bar5: {} } } } },
};

const b = {
    foo: { foo1: { foo2: 23, foo3: { foo4: {} } } },
    bar: { bar1: { bar2: 42, bar3: { bar4: { bar5: {} } } } },
};

console.log(equiv(a, b), equiv2(a, b));

suite(
    [
        {
            title: "equiv",
            fn: () => equiv(a, b),
        },
        {
            title: "equiv2",
            fn: () => equiv2(a, b),
        },
    ],
    { size: 1000, iter: 1000, warmup: 1000 }
);
