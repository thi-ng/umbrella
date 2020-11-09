import { illegalArity } from "@thi.ng/errors";
import type { IReducible, Reducer, Transducer, TxLike } from "./api";
import { ensureTransducer } from "./internal/ensure";
import { reduce, reduceRight } from "./reduce";
import { map } from "./xform/map";

export function transduce<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>
): Transducer<Iterable<A>, C>;
export function transduce<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>,
    xs: Iterable<A>
): C;
export function transduce<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>,
    xs: IReducible<C, A>
): C;
export function transduce<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>,
    acc: C,
    xs: Iterable<A>
): C;
export function transduce<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>,
    acc: C,
    xs: IReducible<C, A>
): C;
export function transduce(...args: any[]): any {
    let acc, xs;
    switch (args.length) {
        case 4:
            xs = args[3];
            acc = args[2];
            break;
        case 3:
            xs = args[2];
            break;
        case 2:
            return map((x: Iterable<any>) => transduce(args[0], args[1], x));
        default:
            illegalArity(args.length);
    }
    return reduce(ensureTransducer(args[0])(args[1]), acc, xs);
}

export function transduceRight<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>
): Transducer<ArrayLike<A>, C>;
export function transduceRight<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>,
    xs: ArrayLike<A>
): C;
export function transduceRight<A, B, C>(
    tx: TxLike<A, B>,
    rfn: Reducer<C, B>,
    acc: C,
    xs: ArrayLike<A>
): C;
export function transduceRight(...args: any[]): any {
    let acc, xs;
    switch (args.length) {
        case 4:
            xs = args[3];
            acc = args[2];
            break;
        case 3:
            xs = args[2];
            break;
        case 2:
            return map((x: ArrayLike<any>) =>
                transduceRight(args[0], args[1], x)
            );
        default:
            illegalArity(args.length);
    }
    return reduceRight(ensureTransducer(args[0])(args[1]), acc, xs);
}
