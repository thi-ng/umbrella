import { map } from "./map";
import { range } from "./range";

export const mapIndexed = <T>(
    fn: (i: number, ...args: any[]) => T[],
    ...inputs: Iterable<any>[]
): IterableIterator<T> =>
    map.apply(null, ([fn, range()] as any[]).concat(inputs));
