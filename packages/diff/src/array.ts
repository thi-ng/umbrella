import { equiv as _equiv } from "@thi.ng/api/equiv";

import { ArrayDiff } from "./api";

/**
 * Based on "An O(NP) Sequence Comparison Algorithm""
 * by Wu, Manber, Myers and Miller
 *
 * - http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf
 * - https://github.com/cubicdaiya/onp
 *
 * Various optimizations, fixes & refactorings.
 * By default uses `@thi.ng/api/equiv` for equality checks.
 */
export function diffArray<T>(_a: T[], _b: T[], equiv = _equiv, linearOnly = false) {
    const state = <ArrayDiff<T>>{
        distance: 0,
        adds: {},
        dels: {},
        const: {},
        linear: []
    };
    if (_a === _b) {
        return state;
    }
    const reverse = _a.length >= _b.length;
    let a, b, na, nb;

    if (reverse) {
        a = _b;
        b = _a;
    } else {
        a = _a;
        b = _b;
    }
    na = a.length;
    nb = b.length;

    const offset = na + 1;
    const delta = nb - na;
    const doff = delta + offset;
    const size = na + nb + 3;
    const path = new Array(size).fill(-1);
    const fp = new Array(size).fill(-1);
    const epc = [];
    const pathPos = [];

    function snake(k, p, pp) {
        const koff = k + offset;
        let r, y;
        if (p > pp) {
            r = path[koff - 1];
            y = p;
        } else {
            r = path[koff + 1];
            y = pp;
        }
        let x = y - k;
        while (x < na && y < nb && equiv(a[x], b[y])) {
            x++;
            y++;
        }
        path[koff] = pathPos.length;
        pathPos.push([x, y, r]);
        return y;
    }

    let p = -1, pp;
    do {
        p++;
        for (let k = -p, ko = k + offset; k < delta; k++ , ko++) {
            fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
        }
        for (let k = delta + p, ko = k + offset; k > delta; k-- , ko--) {
            fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
        }
        fp[doff] = snake(delta, fp[doff - 1] + 1, fp[doff + 1]);
    } while (fp[doff] !== nb);
    state.distance = delta + 2 * p;

    let r = path[doff];
    while (r !== -1) {
        epc.push(pp = pathPos[r]);
        r = pp[2];
    }

    if (linearOnly) {
        buildLinearLog<T>(epc, state, a, b, reverse);
    } else {
        buildFullLog<T>(epc, state, a, b, reverse);
    }
    return state;
}

function buildFullLog<T>(epc: any[], state: ArrayDiff<T>, a: any, b: any, reverse: boolean) {
    const linear = state.linear;
    let adds, dels, aID, dID;
    if (reverse) {
        adds = state.dels;
        dels = state.adds;
        aID = -1;
        dID = 1;
    } else {
        adds = state.adds;
        dels = state.dels;
        aID = 1;
        dID = -1;
    }
    for (let i = epc.length, px = 0, py = 0; --i >= 0;) {
        const e = epc[i];
        let v;
        while (px < e[0] || py < e[1]) {
            const d = e[1] - e[0], dp = py - px;
            if (d > dp) {
                adds[py] = v = b[py];
                linear.push([aID, py, v]);
                py++;
            }
            else if (d < dp) {
                dels[px] = v = a[px];
                linear.push([dID, px, v]);
                px++;
            }
            else {
                state.const[px] = v = a[px];
                linear.push([0, px, v]);
                px++;
                py++;
            }
        }
    }
}

function buildLinearLog<T>(epc: any[], state: ArrayDiff<T>, a: any, b: any, reverse: boolean) {
    const linear = state.linear;
    const aID = reverse ? -1 : 1;
    const dID = reverse ? 1 : -1;
    for (let i = epc.length, px = 0, py = 0; --i >= 0;) {
        const e = epc[i];
        while (px < e[0] || py < e[1]) {
            const d = e[1] - e[0], dp = py - px;
            if (d > dp) {
                linear.push([aID, py, b[py]]);
                py++;
            }
            else if (d < dp) {
                linear.push([dID, px, a[px]]);
                px++;
            }
            else {
                linear.push([0, px, a[px]]);
                px++;
                py++;
            }
        }
    }
}
