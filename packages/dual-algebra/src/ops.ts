import type { Dual, Op1, Op1N, Op2, Op3, Op4 } from "./api.js";

/**
 * Creates a multivariate dual number.
 *
 * @param real - real value
 * @param n - number of variables (default: 1)
 * @param i - variable index (0 < i <= n)
 */
export const dual = (real: number, n = 1, i = 0): Dual => {
    const out = new Array(n + 1).fill(0, 1);
    out[0] = real;
    i > 0 && (out[i] = 1);
    return out;
};

/**
 * Creates a 1-dual number of `r`. Syntax sugar for {@link dual}.
 *
 * @param r - 
 * @param i - 
 */
export const $ = (r: number, i = 0) => [r, i === 1 ? 1 : 0];

/**
 * Creates a 2-dual number of `r`. Syntax sugar for {@link dual}.
 *
 * @param r - 
 * @param i - 
 */
export const $2 = (r: number, i = 0) => dual(r, 2, i);

/**
 * Creates a 3-dual number of `r`. Syntax sugar for {@link dual}.
 *
 * @param r - 
 * @param i - 
 */
export const $3 = (r: number, i = 0) => dual(r, 3, i);

/**
 * Creates a 4-dual number of `r`. Syntax sugar for {@link dual}.
 *
 * @param r - 
 * @param i - 
 */
export const $4 = (r: number, i = 0) => dual(r, 4, i);

export const defOp = <T extends Function>(
    single: T,
    multi: T,
    dispatch = 0
): T =>
    <any>(
        ((...xs: any[]) =>
            xs[dispatch].length < 3 ? single(...xs) : multi(...xs))
    );

export const add = defOp<Op2>(
    (a, b) => [a[0] + b[0], a[1] + b[1]],
    (a, b) => a.map((x: number, i: number) => x + b[i])
);

export const sub = defOp<Op2>(
    (a, b) => [a[0] - b[0], a[1] - b[1]],
    (a, b) => a.map((x: number, i: number) => x - b[i])
);

export const neg = defOp<Op1>(
    (a) => [-a[0], -a[1]],
    (a) => a.map((x: number) => (x !== 0 ? -x : 0))
);

export const mul = defOp<Op2>(
    ([ar, ad], [br, bd]) => [ar * br, ar * bd + ad * br],
    (a, b) => {
        const ar = a[0];
        const br = b[0];
        const out = [ar * br];
        for (let i = a.length; i-- > 1; ) {
            out[i] = ar * b[i] + a[i] * br;
        }
        return out;
    }
);

export const div = defOp<Op2>(
    ([ar, ad], [br, bd]) => [ar / br, (ad * br - ar * bd) / (br * br)],
    (a, b) => {
        const ar = a[0];
        const br = b[0];
        const ibr = 1 / (br * br);
        const out = [ar / br];
        for (let i = a.length; i-- > 1; ) {
            out[i] = (a[i] * br - ar * b[i]) * ibr;
        }
        return out;
    }
);

export const abs = defOp<Op1>(
    ([ar, ad]) => [Math.abs(ar), ad * Math.sign(ar)],
    (a) => {
        const s = Math.sign(a[0]);
        const out = [Math.abs(a[0])];
        for (let i = a.length; i-- > 1; ) {
            out[i] = s * a[i];
        }
        return out;
    }
);

export const sqrt = defOp<Op1>(
    (a) => {
        const s = Math.sqrt(a[0]);
        return [s, (0.5 * a[1]) / s];
    },
    (a) => {
        const s = Math.sqrt(a[0]);
        const si = 0.5 / s;
        const out = [s];
        for (let i = a.length; i-- > 1; ) {
            out[i] = si * a[i];
        }
        return out;
    }
);

export const exp = defOp<Op1>(
    ([ar, ad]) => {
        ar = Math.exp(ar);
        return [ar, ad * ar];
    },
    (a) => {
        const ar = Math.exp(a[0]);
        const out = [ar];
        for (let i = a.length; i-- > 1; ) {
            out[i] = ar * a[i];
        }
        return out;
    }
);

export const log = defOp<Op1>(
    ([ar, ad]) => [Math.log(ar), ad / ar],
    (a) => {
        const ar = Math.log(a[0]);
        const iar = 1 / ar;
        const out = [ar];
        for (let i = a.length; i-- > 1; ) {
            out[i] = iar * a[i];
        }
        return out;
    }
);

export const pow = defOp<Op1N>(
    ([ar, ad], k) => [ar ** k, ad * k * ar ** (k - 1)],
    (a, k) => {
        const f = k * a[0] ** (k - 1);
        const out = [a[0] ** k];
        for (let i = a.length; i-- > 1; ) {
            out[i] = f * a[i];
        }
        return out;
    }
);

export const sin = defOp<Op1>(
    ([ar, ad]) => [Math.sin(ar), ad * Math.cos(ar)],
    (a) => {
        const c = Math.cos(a[0]);
        const out = [Math.sin(a[0])];
        for (let i = a.length; i-- > 1; ) {
            out[i] = c * a[i];
        }
        return out;
    }
);

export const cos = defOp<Op1>(
    ([ar, ad]) => [Math.cos(ar), -ad * Math.sin(ar)],
    (a) => {
        const s = -Math.sin(a[0]);
        const out = [Math.cos(a[0])];
        for (let i = a.length; i-- > 1; ) {
            out[i] = s * a[i];
        }
        return out;
    }
);

export const tan = defOp<Op1>(
    ([ar, ad]) => {
        const c = Math.cos(ar);
        return [Math.tan(ar), ad / (c * c)];
    },
    (a) => {
        const c = Math.cos(a[0]);
        const ic = 1 / (c * c);
        const out = [Math.tan(a[0])];
        for (let i = a.length; i-- > 1; ) {
            out[i] = ic * a[i];
        }
        return out;
    }
);

export const atan = defOp<Op1>(
    ([ar, ad]) => [Math.atan(ar), ad / (1 + ar * ar)],
    (a) => {
        const ar = a[0];
        const iar = 1 / (1 + ar * ar);
        const out = [Math.atan(ar)];
        for (let i = a.length; i-- > 1; ) {
            out[i] = iar * a[i];
        }
        return out;
    }
);

/**
 * Linear interpolation for dual numbers: `a + (b - a) * t`
 *
 * @param a - 
 * @param b - 
 * @param t - 
 */
export const mix = (a: Dual, b: Dual, t: Dual) => add(a, mul(sub(b, a), t));

/**
 * Higher order function. Takes a 2-multivariate {@link Op2} and returns new
 * function which takes two real numbers `x` and `y` representing variables in
 * the given function. When called, converts `x` and `y` first into dual numbers
 * and then calls `fn` and returns result.
 *
 * @remarks
 * The result tuple can be interpreted the following:
 *
 * - index 0 - real value of `fn`
 * - index 1 - derivative of first var at `x`
 * - index 2 - derivative of second var at `y`
 *
 * @param fn - 
 */
export const evalFn2 = (fn: Op2) => (x: number, y: number) =>
    fn([x, 1, 0], [y, 0, 1]);

/**
 * Same as {@link evalFn2}, but 3-multivariate functions.
 *
 * @param fn - 
 */
export const evalFn3 = (fn: Op3) => (x: number, y: number, z: number) =>
    fn([x, 1, 0, 0], [y, 0, 1, 0], [z, 0, 0, 1]);

/**
 * Same as {@link evalFn4}, but 4-multivariate functions.
 *
 * @param fn - 
 */
export const evalFn4 =
    (fn: Op4) => (x: number, y: number, z: number, w: number) =>
        fn([x, 1, 0, 0, 0], [y, 0, 1, 0, 0], [z, 0, 0, 1, 0], [w, 0, 0, 0, 1]);
