import { copy, empty } from "./utils";

export function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
    if (a === b) {
        return empty(a, Set);
    }
    const res = copy(a, Set);
    for (let i of b) {
        res.delete(i);
    }
    return res;
}
