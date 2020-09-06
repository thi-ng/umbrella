import type { IObjectOf, Pair } from "@thi.ng/api";
import type { Reducer } from "../api";
import { reduce, reducer } from "../reduce";

/**
 * Reducer accepting key-value pairs / tuples and updating / adding them
 * to an object.
 */
export function assocObj<T>(): Reducer<IObjectOf<T>, Pair<PropertyKey, T>>;
export function assocObj<T>(xs: Iterable<Pair<PropertyKey, T>>): IObjectOf<T>;
export function assocObj<T>(xs?: Iterable<Pair<PropertyKey, T>>): any {
    return xs
        ? reduce(assocObj(), xs)
        : reducer<IObjectOf<T>, Pair<PropertyKey, T>>(
              () => ({}),
              (acc, [k, v]) => ((acc[<any>k] = v), acc)
          );
}
