import { empty } from "./utils";

export function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
    if (a === b) {
        return a;
    }
    if (b.size < a.size) {
        return intersection(b, a);
    }
    const res = empty(a, Set);
    for (let i of b) {
        if (a.has(i)) {
            res.add(i);
        }
    }
    return res;
}
