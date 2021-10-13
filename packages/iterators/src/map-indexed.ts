import { map } from "./map.js";
import { range } from "./range.js";

export const mapIndexed = <T>(
    fn: (i: number, ...args: any[]) => T[],
    ...inputs: Iterable<any>[]
) =>
    <IterableIterator<T>>(
        map.apply(null, <any>(<any>[fn, range()]).concat(inputs))
    );
