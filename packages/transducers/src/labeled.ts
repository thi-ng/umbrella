import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "./api.js";
import { iterator1 } from "./iterator.js";
import { map } from "./map.js";

export type LabelFn<L, T> = L | ((x: T) => L);

export function labeled<L, T>(id: LabelFn<L, T>): Transducer<T, [L, T]>;
export function labeled<L, T>(
    id: LabelFn<L, T>,
    src: Iterable<T>
): IterableIterator<[L, T]>;
export function labeled<L, T>(id: LabelFn<L, T>, src?: Iterable<T>): any {
    return isIterable(src)
        ? iterator1(labeled(id), src)
        : map(isFunction(id) ? (x: T) => [id(x), x] : (x: T) => [id, x]);
}
