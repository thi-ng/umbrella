import { isFunction, isIterable } from "@thi.ng/checks";
import type { Transducer } from "../api";
import { iterator1 } from "../iterator";
import { map } from "./map";

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
