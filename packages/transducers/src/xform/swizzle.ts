import { Transducer } from "../api";
import { map } from "./map";

import { swizzler } from "../func/swizzler";

export function swizzle<T>(order: PropertyKey[]): Transducer<T, any> {
    return map(swizzler(order));
}
