import { equiv as _equiv } from "@thi.ng/equiv";
import { ArrayDiff } from "./api";

const simpleDiff = <T>(
    state: ArrayDiff<T>,
    src: ArrayLike<T>,
    key: keyof ArrayDiff<T>,
    logDir: number,
    linear: boolean
) => {
    let n = src.length;
    state.distance = n;
    for (let i = 0; i < n; i++) {
        state.linear[i] = [logDir, i, src[i]];
    }
    if (!linear) {
        const _state = state[key];
        for (let i = 0; i < n; i++) {
            _state[i] = src[i];
        }
    }
    return state;
};

/**
 * Based on "An O(NP) Sequence Comparison Algorithm""
 * by Wu, Manber, Myers and Miller
 *
 * - http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf
 * - https://github.com/cubicdaiya/onp
 *
 * Various optimizations, fixes & refactorings.
 * By default uses `@thi.ng/equiv` for equality checks.
 */
export const diffArray = <T>(
    a: ArrayLike<T>,
    b: ArrayLike<T>,
    equiv = _equiv,
    linearOnly = false
) => {
    const state = <ArrayDiff<T>>{
        distance: 0,
        adds: {},
        dels: {},
        const: {},
        linear: []
    };

    if (a === b || (a == null && b == null)) {
        return state;
    } else if (a == null || a.length === 0) {
        return simpleDiff(state, b, "adds", 1, linearOnly);
    } else if (b == null || b.length === 0) {
        return simpleDiff(state, a, "dels", -1, linearOnly);
    }

    const reverse = a.length >= b.length;
    let _a, _b, na, nb;

    if (reverse) {
        _a = b;
        _b = a;
    } else {
        _a = a;
        _b = b;
    }
    na = _a.length;
    nb = _b.length;

    const offset = na + 1;
    const delta = nb - na;
    const doff = delta + offset;
    const size = na + nb + 3;
    const path = new Array(size).fill(-1);
    const fp = new Array(size).fill(-1);
    const epc = [];
    const pathPos = [];

    const snake = (k, p, pp) => {
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
        while (x < na && y < nb && equiv(_a[x], _b[y])) {
            x++;
            y++;
        }
        path[koff] = pathPos.length / 3;
        pathPos.push(x, y, r);
        return y;
    };

    let p = -1, k, ko;
    do {
        p++;
        for (k = -p, ko = k + offset; k < delta; k++ , ko++) {
            fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
        }
        for (k = delta + p, ko = k + offset; k > delta; k-- , ko--) {
            fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
        }
        fp[doff] = snake(delta, fp[doff - 1] + 1, fp[doff + 1]);
    } while (fp[doff] !== nb);
    state.distance = delta + 2 * p;

    p = path[doff] * 3;
    while (p >= 0) {
        epc.push(p);
        p = pathPos[p + 2] * 3;
    }

    if (linearOnly) {
        buildLinearLog<T>(epc, pathPos, state, _a, _b, reverse);
    } else {
        buildFullLog<T>(epc, pathPos, state, _a, _b, reverse);
    }
    return state;
};

const buildFullLog = <T>(
    epc: any[],
    pathPos: any[],
    state: ArrayDiff<T>,
    a: ArrayLike<T>,
    b: ArrayLike<T>,
    reverse: boolean
) => {
    const linear = state.linear;
    const _const = state.const;
    let i = epc.length, px = 0, py = 0;
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
    for (; --i >= 0;) {
        const e = epc[i];
        const ppx = pathPos[e];
        const ppy = pathPos[e + 1];
        const d = ppy - ppx;
        let v;
        while (px < ppx || py < ppy) {
            const dp = py - px;
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
                _const[px] = v = a[px];
                linear.push([0, px, v]);
                px++;
                py++;
            }
        }
    }
};

const buildLinearLog = <T>(
    epc: any[],
    pathPos: any[],
    state: ArrayDiff<T>,
    a: ArrayLike<T>,
    b: ArrayLike<T>,
    reverse: boolean
) => {
    const linear = state.linear;
    const aID = reverse ? -1 : 1;
    const dID = reverse ? 1 : -1;
    let i = epc.length, px = 0, py = 0;
    for (; --i >= 0;) {
        const e = epc[i];
        const ppx = pathPos[e];
        const ppy = pathPos[e + 1];
        const d = ppy - ppx;
        while (px < ppx || py < ppy) {
            const dp = py - px;
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
};
