import { isFunction } from "@thi.ng/checks/is-function";

import { Transducer } from "../api";
import { map } from "./map";

export function labeled<L, T>(id: L | ((x: T) => L)): Transducer<T, [L, T]> {
    return map(
        isFunction(id) ?
            (x) => [id(x), x] :
            (x) => [id, x]
    );
}
