import type { FnU3, NumericArray } from "@thi.ng/api";
import { cossin } from "@thi.ng/math/angle";
import { TAU } from "@thi.ng/math/api";
import type { FilterConfig, FilterResponse } from "./api.js";
import { magDb } from "./convert.js";
import { line } from "./line.js";

/**
 * Returns filter response for given filter coefficients at normalized
 * frequency `f`. If `db` is true (default), the magnitude in the
 * returned object will be in dBFS.
 *
 * References:
 *
 * - https://www.earlevel.com/main/2016/12/01/evaluating-filter-frequency-response/
 * - https://www.earlevel.com/main/2016/12/08/filter-frequency-response-grapher/
 * - https://github.com/mohayonao/freqr
 *
 * @param zeroes -
 * @param poles -
 * @param freq -
 * @param db -
 */
export const filterResponseRaw = (
    zeroes: NumericArray,
    poles: NumericArray,
    freq: number,
    db = true
): FilterResponse => {
    const w0 = TAU * freq;
    const [cp, sp] = convolve(poles, w0);
    const [cz, sz] = convolve(zeroes, w0);
    const mag = Math.sqrt((cz * cz + sz * sz) / (cp * cp + sp * sp));
    const phase = Math.atan2(sp, cp) - Math.atan2(sz, cz);
    return { freq, phase, mag: db ? magDb(mag) : mag };
};

export const filterResponse = (
    coeffs: FilterConfig,
    freq: number,
    db?: boolean
) => filterResponseRaw(coeffs.zeroes, coeffs.poles, freq, db);

export const freqRange: FnU3<number, number[]> = (fstart, fend, num) =>
    line(fstart, fend, num - 1).take(num);

const convolve = (coeffs: NumericArray, w0: number) => {
    let c = 0;
    let s = 0;
    for (let i = coeffs.length; i-- > 0; ) {
        const k = cossin(w0 * i, coeffs[i]);
        c += k[0];
        s += k[1];
    }
    return [c, s];
};
