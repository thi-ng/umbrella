import type { DistanceFn } from "./api.js";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Jaccard_index
 *
 * @param a - 
 * @param b - 
 */
export const distJaccard: DistanceFn = (a, b) => {
    let numNZ = 0;
    let numEQ = 0;
    for (let i = a.length; i-- > 0; ) {
        const aa = a[i] !== 0;
        const bb = b[i] !== 0;
        numNZ += ~~(aa || bb);
        numEQ += ~~(aa && bb);
    }
    return numNZ ? (numNZ - numEQ) / numNZ : 0;
};
