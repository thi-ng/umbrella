import { EPS } from "@thi.ng/math";
import type { VecOpSVO } from "./api";
import { magS2, magS3, magS4 } from "./mags";
import { mulNS2, mulNS3, mulNS4 } from "./mulns";
import { setS2, setS3, setS4 } from "./sets";

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalizeS2: VecOpSVO<number> = (
    out,
    v,
    n = 1,
    io = 0,
    ia = 0,
    so = 1,
    sa = 1
) => {
    !out && (out = v);
    const m = magS2(v, ia, sa);
    return m >= EPS
        ? mulNS2(out, v, n / m, io, ia, so, sa)
        : out !== v
        ? setS2(out, v, io, ia, so, sa)
        : out;
};

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalizeS3: VecOpSVO<number> = (
    out,
    v,
    n = 1,
    io = 0,
    ia = 0,
    so = 1,
    sa = 1
) => {
    !out && (out = v);
    const m = magS3(v, ia, sa);
    return m >= EPS
        ? mulNS3(out, v, n / m, io, ia, so, sa)
        : out !== v
        ? setS3(out, v, io, ia, so, sa)
        : out;
};

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalizeS4: VecOpSVO<number> = (
    out,
    v,
    n = 1,
    io = 0,
    ia = 0,
    so = 1,
    sa = 1
) => {
    !out && (out = v);
    const m = magS4(v, ia, sa);
    return m >= EPS
        ? mulNS4(out, v, n / m, io, ia, so, sa)
        : out !== v
        ? setS4(out, v, io, ia, so, sa)
        : out;
};
