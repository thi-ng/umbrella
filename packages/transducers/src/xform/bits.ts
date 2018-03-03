import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { isReduced } from "../reduced";

/**
 * Transforms incoming numbers into their bitstream using specified
 * word size (default 8) and order (MSB first or LSB first). Only the
 * lowest `wordSize` bits of each value are used (max 32).
 *
 * ```
 * [...iterator(bits(8), [0xf0, 0xaa])]
 * // [ 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ]
 * [...iterator(comp(bits(8), partition(4)), [0xf0, 0xaa])]
 * // [ [ 1, 1, 1, 1 ], [ 0, 0, 0, 0 ], [ 1, 0, 1, 0 ], [ 1, 0, 1, 0 ] ]
 * ```
 *
 * @param wordSize
 * @param msbFirst
 */
export function bits(wordSize = 8, msbFirst = true): Transducer<number, number> {
    return (rfn: Reducer<any, number>) => {
        const r = rfn[2];
        return compR(rfn,
            msbFirst ?
                (acc, x: number) => {
                    for (let i = wordSize - 1; i >= 0; i--) {
                        acc = r(acc, (x >>> i) & 1);
                        if (isReduced(acc)) {
                            break;
                        }
                    }
                    return acc;
                } :
                (acc, x: number) => {
                    for (let i = 0; i < wordSize; i++) {
                        acc = r(acc, (x >>> i) & 1);
                        if (isReduced(acc)) {
                            break;
                        }
                    }
                    return acc;
                });
    };
}
