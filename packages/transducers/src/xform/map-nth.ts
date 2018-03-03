import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

export function mapNth<A, B>(n: number, fn: (x: A) => B): Transducer<A, B>;
export function mapNth<A, B>(n: number, offset: number, fn: (x: A) => B): Transducer<A, B>;
export function mapNth<A, B>(...args: any[]): Transducer<A, B> {
    let n = args[0] - 1, offset, fn;
    if (typeof args[1] === "number") {
        offset = args[1];
        fn = args[2];
    } else {
        fn = args[1];
        offset = 0;
    }
    return (rfn: Reducer<any, B>) => {
        const r = rfn[2];
        let skip = 0, off = offset;
        return compR(rfn,
            (acc, x) => {
                if (off === 0) {
                    if (skip === 0) {
                        skip = n;
                        return r(acc, fn(x));
                    }
                    skip--;
                } else {
                    off--;
                }
                return r(acc, x);
            });
    };
}
