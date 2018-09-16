import { isIterable } from "./is-iterable";
import { isString } from "./is-string";

export function isNotStringAndIterable(x: any): x is Iterable<any> {
    return !isString(x) && isIterable(x);
}
