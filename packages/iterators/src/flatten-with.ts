import { iterator } from "./iterator";

export function* flattenWith(tx: (x: any) => any, input: Iterable<any>): IterableIterator<any> {
    let iter = iterator(input),
        v: IteratorResult<any>, val, res;
    while (((v = iter.next()), !v.done)) {
        val = v.value;
        if (val != null && ((res = tx(val)) !== undefined)) {
            yield* flattenWith(tx, res);
        } else {
            yield val;
        }
    }
}
