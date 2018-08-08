import { isFunction } from "@thi.ng/checks/is-function";

import { Transducer } from "../api";
import { iterator } from "../iterator";
import { map } from "./map";

export type LabelFn<L, T> = L | ((x: T) => L);

export function labeled<L, T>(id: LabelFn<L, T>): Transducer<T, [L, T]>;
export function labeled<L, T>(id: LabelFn<L, T>, src: Iterable<T>): IterableIterator<[L, T]>;
export function labeled<L, T>(id: LabelFn<L, T>, src?: Iterable<T>): any {
    return src ?
        iterator(labeled(id), src) :
        map(
            isFunction(id) ?
                (x: T) => [id(x), x] :
                (x: T) => [id, x]
        );
}
