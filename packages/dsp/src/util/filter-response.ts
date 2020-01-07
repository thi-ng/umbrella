import { NumericArray } from "@thi.ng/api";
import { cossin, TAU } from "@thi.ng/math";
import { FilterResponse } from "../api";
import { magToDB } from "./convert";

/**
 * Returns filter response for given filter coefficients at normalized
 * frequency `f`. If `db` is true (default), the magnitude in the
 * returned object will be in dBFS.
 *
 * References:
 *
 *  - https://github.com/mohayonao/freqr
 *  - https://www.earlevel.com/main/2016/12/08/filter-frequency-response-grapher/
 *
 * @param zeroes -
 * @param poles -
 * @param freq -
 * @param db -
 */
export const filterResponse = (
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
    return { freq, phase, mag: db ? magToDB(mag) : mag };
};

const convolve = (coeffs: NumericArray, w0: number) => {
    let c = 0;
    let s = 0;
    for (let i = coeffs.length; --i >= 0; ) {
        const k = cossin(w0 * i, coeffs[i]);
        c += k[0];
        s += k[1];
    }
    return [c, s];
};
