import { Transducer } from "../api";
import { swizzler } from "../func/swizzler";
import { map } from "./map";

export function swizzle<T>(order: PropertyKey[]): Transducer<T, any> {
    return map(swizzler(order));
}
