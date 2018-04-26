import { iterator } from "./iterator";

export function groupBy<T>(key: (v) => any, input: Iterable<T>): { [id: string]: T[] } {
    let groups = {};
    let iter = iterator(input);
    let v: IteratorResult<any>;
    while (((v = iter.next()), !v.done)) {
        let id = JSON.stringify(key(v.value));
        let g = groups[id];
        if (g) {
            g.push(v.value);
        } else {
            groups[id] = [v.value];
        }
    }
    return groups;
}
