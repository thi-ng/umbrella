import { Transducer } from "../api";
import { flattenWith } from "./flatten-with";

export function flatten<T>(): Transducer<T | Iterable<T>, T> {
    return flattenWith(
        (x) => x != null && x[Symbol.iterator] && typeof x !== "string" ? <any>x : undefined
    );
}
