import { Transducer } from "../api";
import { map } from "./map";

export function sideEffect<T>(fn: (x: T) => void): Transducer<T, T> {
    return map((x) => (fn(x), x));
}
