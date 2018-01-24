import iterator from "./iterator";

export default function groupBy<T>(key: (v) => any, input: Iterable<T>): { [id: string]: T[] } {
    let groups = {},
        iter = iterator(input),
        v: IteratorResult<any>;
    while (((v = iter.next()), !v.done)) {
        let id = JSON.stringify(key(v.value)),
            g = groups[id];
        if (g) {
            g.push(v.value);
        } else {
            groups[id] = [v.value];
        }
    }
    return groups;
}

// export const foo = groupBy((x)=>x.toUpperCase(), "AbRaCadaBra")[0];