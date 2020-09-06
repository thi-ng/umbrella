import type { Fn, IObjectOf } from "@thi.ng/api";
import { iterator } from "./iterator";

export const groupBy = <T>(
    key: Fn<T, any>,
    input: Iterable<T>
): IObjectOf<T[]> => {
    let groups: IObjectOf<T[]> = {};
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
};
