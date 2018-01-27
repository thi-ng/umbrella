import { Reducer, Transducer } from "../api";
import { ensureReduced, isReduced } from "../reduced";

export function scan<A, B>([initi, completei, reducei]: Reducer<B, A>): Transducer<A, B> {
    return ([inito, completeo, reduceo]: Reducer<any, B>) => {
        let acc = initi();
        return [
            inito,
            (_acc) => completeo(reduceo(_acc, completei(acc))),
            (_acc, x) => {
                acc = <any>reducei(acc, x);
                if (isReduced(acc)) {
                    return ensureReduced(reduceo(_acc, (<any>acc).deref()));
                }
                return reduceo(_acc, acc);
            }
        ];
    };
}
