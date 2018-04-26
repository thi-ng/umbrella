import { IObjectOf } from "@thi.ng/api/api";

import { Reducer } from "../api";

export function assocObj<T>(): Reducer<IObjectOf<T>, [PropertyKey, T]> {
    return [
        () => <any>new Object(),
        (acc) => acc,
        (acc, [k, v]) => (acc[k] = v, acc),
    ];
}
