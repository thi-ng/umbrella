import { Transducer } from "../api";
import { map } from "./map";

import { delay } from "../func/delay";

export function delayed<T>(t: number): Transducer<T, Promise<T>> {
    return map((x) => delay(x, t));
}
