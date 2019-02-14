import { IObjectOf } from "@thi.ng/api";

export function* pairs<T>(x: IObjectOf<T>): IterableIterator<[string, T]> {
    for (let k in x) {
        if (x.hasOwnProperty(k)) {
            yield [k, x[k]];
        }
    }
}
