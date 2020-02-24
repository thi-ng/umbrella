import { flattenWith } from "./flatten-with";
import type { Transducer } from "../api";

export function flatten<T>(): Transducer<T | Iterable<T>, T>;
export function flatten<T>(src: Iterable<T | Iterable<T>>): IterableIterator<T>;
export function flatten<T>(src?: Iterable<T | Iterable<T>>): any {
    return flattenWith(
        (x: any) =>
            x != null && x[Symbol.iterator] && typeof x !== "string"
                ? <any>x
                : undefined,
        src!
    );
}
