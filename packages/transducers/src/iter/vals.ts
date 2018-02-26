import { IObjectOf } from "@thi.ng/api/api";

export function* vals<T>(x: IObjectOf<T>): IterableIterator<T> {
    for (let k in x) {
        if (x.hasOwnProperty(k)) {
            yield x[k];
        }
    }
}
