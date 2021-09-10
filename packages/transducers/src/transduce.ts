import type { FnAny } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
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
    return $transduce(transduce, reduce, args);
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
    return $transduce(transduceRight, reduceRight, args);
}

const $transduce = (tfn: FnAny<any>, rfn: FnAny<any>, args: any[]) => {
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
            return map((x: ArrayLike<any>) => tfn(args[0], args[1], x));
        default:
            illegalArity(args.length);
    }
    return rfn(ensureTransducer(args[0])(args[1]), acc, xs);
};
