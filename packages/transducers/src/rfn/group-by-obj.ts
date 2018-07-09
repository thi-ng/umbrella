import { IObjectOf } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reducer } from "../reduce";
import { push } from "./push";

export function groupByObj<A, C>(key: (x: A) => PropertyKey, rfn: Reducer<C, A> = <any>push(), init?: () => IObjectOf<C>): Reducer<IObjectOf<C>, A> {
    return reducer(
        init || (() => <any>new Object()),
        (acc, x) => {
            const k = key(x);
            acc[k] = acc[k] ?
                <C>rfn[2](acc[k], x) :
                <C>rfn[2](rfn[0](), x);
            return acc;
        }
    );
}
