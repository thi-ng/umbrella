import { Reducer } from "../api";

export function assocMap<A, B>(): Reducer<Map<A, B>, [A, B]> {
    return [
        () => new Map(),
        (acc) => acc,
        (acc, [k, v]) => acc.set(k, v),
    ];
}
