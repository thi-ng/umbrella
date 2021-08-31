import type { DistanceFn } from "./api";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient
 *
 * @param a
 * @param b
 */
export const distSorensenDice: DistanceFn = (a, b) => {
    let numTP = 0;
    let numFP = 0;
    for (let i = a.length; i-- > 0; ) {
        const aa = a[i] !== 0;
        const bb = b[i] !== 0;
        numTP += ~~(aa && bb);
        numFP += ~~(aa !== bb);
    }
    return numFP ? numFP / (2 * numTP + numFP) : 0;
};
