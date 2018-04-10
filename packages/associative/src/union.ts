import { copy } from "./utils";

export function union<T>(a: Set<T>, b: Set<T>): Set<T> {
    if (a === b) {
        return a;
    }
    if (b.size > a.size) {
        return union(b, a);
    }
    const res = copy(a, Set);
    for (let i of b) {
        res.add(i);
    }
    return res;
}