import type { Fn, Nullable } from "@thi.ng/api";
import { identity } from "@thi.ng/compose";
import type { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { $iter } from "../iterator";

export function keep<T>(
    pred?: Fn<Nullable<T>, any>
): Transducer<Nullable<T>, T>;
export function keep<T>(src: Iterable<Nullable<T>>): IterableIterator<T>;
export function keep<T>(
    pred: Fn<Nullable<T>, any>,
    src: Iterable<Nullable<T>>
): IterableIterator<T>;
export function keep<T>(...args: any[]): any {
    return (
        $iter(keep, args) ||
        ((rfn: Reducer<any, T>) => {
            const r = rfn[2];
            const pred: Fn<T, any> = args[0] || identity;
            return compR(rfn, (acc, x: T) =>
                pred(x) != null ? r(acc, x) : acc
            );
        })
    );
}
