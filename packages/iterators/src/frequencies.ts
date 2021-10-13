import type { Fn, IObjectOf } from "@thi.ng/api";
import { iterator } from "./iterator.js";

export interface FrequencyPair<T> {
    [0]: T;
    [1]: number;
}

export function* frequencies<T>(
    input: Iterable<T>,
    key?: Fn<T, any>
): IterableIterator<FrequencyPair<T>> {
    let freqs: IObjectOf<FrequencyPair<T>> = {};
    let iter = iterator(input);
    let v: IteratorResult<any>;
    while (((v = iter.next()), !v.done)) {
        let k = key ? key(v.value) : v.value;
        let id = JSON.stringify(k);
        let bin = freqs[id];
        if (bin) {
            bin[1]++;
        } else {
            freqs[id] = [k, 1];
        }
    }
    yield* Object.keys(freqs).map((id) => freqs[id]);
}
