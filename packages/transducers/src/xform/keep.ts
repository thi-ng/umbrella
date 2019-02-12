import { identity } from "@thi.ng/compose";
import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { $iter } from "../iterator";

export function keep<T>(pred?: (x: T) => any): Transducer<T, T>;
export function keep<T>(src: Iterable<T>): IterableIterator<T>;
export function keep<T>(pred: (x: T) => any, src: Iterable<T>): IterableIterator<T>;
export function keep<T>(...args: any[]): any {
    return $iter(keep, args) ||
        ((rfn: Reducer<any, T>) => {
            const r = rfn[2];
            const pred: (x: T) => any = args[0] || identity;
            return compR(rfn,
                (acc, x: T) => pred(x) != null ? r(acc, x) : acc);
        })
}
