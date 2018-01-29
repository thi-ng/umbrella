import { map } from "./map";
import { range } from "./range";

export function mapIndexed<T>(fn: (i: number, ...args: any[]) => T[], ...inputs: Iterable<any>[]): IterableIterator<T> {
    return map.apply(null, ([fn, range()] as any[]).concat(inputs));
}
