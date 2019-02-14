import { Transducer } from "../api";
import { flattenWith } from "./flatten-with";

export function flatten<T>(): Transducer<T | Iterable<T>, T>;
export function flatten<T>(src: Iterable<T | Iterable<T>>): IterableIterator<T>;
export function flatten<T>(src?: Iterable<T | Iterable<T>>): any {
    return flattenWith(
        (x) => x != null && x[Symbol.iterator] && typeof x !== "string" ? <any>x : undefined,
        src
    );
}
