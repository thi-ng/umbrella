import { Reducer, Transducer } from "../api";
import { compR } from "../func/comp";
import { ensureReduced, isReduced } from "../reduced";

export function scan<A, B>(inner: Reducer<B, A>, acc?: B): Transducer<A, B> {
    return (outer: Reducer<any, B>) => {
        acc = acc || inner[0]();
        const ri = inner[2],
            ro = outer[2];
        return compR(outer,
            (_acc, x) => {
                acc = <any>ri(acc, x);
                if (isReduced(acc)) {
                    return ensureReduced(ro(_acc, (<any>acc).deref()));
                }
                return ro(_acc, acc);
            });
    };
}
