import { Transducer } from "../api";
import { isReduced } from "../reduced";

/**
 * Transducer.
 *
 * @param fn
 * @param stateful
 */
export function partitionBits(n: number, wordSize = 8): Transducer<number, number> {
    return ([init, complete, reduce]) => {
        const maxb = wordSize - n;
        const m1 = (1 << wordSize) - 1;
        const m2 = (1 << n) - 1;
        let r = 0;
        let y = 0;
        return [
            init,
            (acc) => complete(r > 0 ? reduce(acc, y) : acc),
            n < wordSize ?
                (acc, x) => {
                    let b = 0;
                    do {
                        acc = reduce(acc, y + ((x >>> (maxb + r)) & m2));
                        b += n - r;
                        x = (x << (n - r)) & m1;
                        y = 0;
                        r = 0;
                    } while (b <= maxb && !isReduced(acc));
                    r = wordSize - b;
                    y = r > 0 ? (x >>> maxb) & m2 : 0;
                    return acc;
                } :
                n > wordSize ?
                    (acc, x) => {
                        if (r + wordSize <= n) {
                            y |= (x & m1) << (n - wordSize - r);
                            r += wordSize;
                            if (r === n) {
                                acc = reduce(acc, y);
                                y = 0;
                                r = 0;
                            }
                        }
                        else {
                            const k = n - r;
                            r = wordSize - k;
                            acc = reduce(acc, y | ((x >>> r) & ((1 << k) - 1)));
                            y = (x & ((1 << r) - 1)) << (n - r);
                        }
                        return acc;
                    } :
                    reduce
        ];
    };
}
