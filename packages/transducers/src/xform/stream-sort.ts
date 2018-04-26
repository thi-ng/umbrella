import { Comparator } from "@thi.ng/api/api";
import { compare } from "@thi.ng/api/compare";

import { Reducer, Transducer } from "../api";
import { binarySearch } from "../func/binary-search";
import { identity } from "../func/identity";
import { isReduced } from "../reduced";

export function streamSort<A, B>(n: number, key: ((x: A) => B) = <any>identity, cmp: Comparator<B> = compare): Transducer<A, A> {
    return ([init, complete, reduce]: Reducer<any, A>) => {
        const buf: A[] = [];
        return [
            init,
            (acc) => {
                while (buf.length && !isReduced(acc)) {
                    acc = reduce(acc, buf.shift());
                }
                return complete(acc);
            },
            (acc, x) => {
                const idx = binarySearch(buf, key, cmp, x);
                buf.splice((idx < 0 ? -(idx + 1) : idx), 0, x);
                if (buf.length === n) {
                    acc = reduce(acc, buf.shift());
                }
                return acc;
            }
        ];
    };
}
