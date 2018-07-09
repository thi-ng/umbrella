import { IObjectOf } from "@thi.ng/api/api";

import { Reducer } from "../api";
import { reducer } from "../reduce";

export function assocObj<T>(): Reducer<IObjectOf<T>, [PropertyKey, T]> {
    return reducer(() => <any>new Object(), (acc, [k, v]) => (acc[k] = v, acc));
}
