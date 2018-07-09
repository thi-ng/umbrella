import { Reducer } from "../api";

import { identity } from "../func/identity";
import { push } from "./push";
import { reducer } from "../reduce";

export function groupByMap<A, B, C>(key: ((x: A) => B) = <any>identity, rfn: Reducer<C, A> = <any>push()): Reducer<Map<B, C>, A> {
    return reducer(
        () => new Map(),
        (acc, x) => {
            const k = key(x);
            return acc.set(k,
                acc.has(k) ?
                    <C>rfn[2](acc.get(k), x) :
                    <C>rfn[2](rfn[0](), x));
        }
    );
}
