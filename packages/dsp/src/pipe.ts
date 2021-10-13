import type { FnAny } from "@thi.ng/api";
import type { IGen, IProc } from "./api.js";
import { MapG1 } from "./mapg.js";

/**
 * Higher order generator. Composes a new {@link IGen} from given source gen and
 * a number of {@link IProc}s (processed in series, like using {@link serial}).
 *
 * @param src
 * @param proc
 */
export function pipe<A, B>(src: IGen<A>, proc: IProc<A, B>): IGen<B>;
export function pipe<A, B, C>(
    src: IGen<A>,
    a: IProc<A, B>,
    b: IProc<B, C>
): IGen<C>;
export function pipe<A, B, C, D>(
    src: IGen<A>,
    a: IProc<A, B>,
    b: IProc<B, C>,
    c: IProc<C, D>
): IGen<D>;
export function pipe<A, B, C, D, E>(
    src: IGen<A>,
    a: IProc<A, B>,
    b: IProc<B, C>,
    c: IProc<C, D>,
    d: IProc<D, E>
): IGen<E>;
export function pipe<A, B, C, D, E>(
    src: IGen<A>,
    a: IProc<A, B>,
    b: IProc<B, C>,
    c: IProc<C, D>,
    d: IProc<D, E>,
    ...xs: IProc<any, any>[]
): IGen<any>;
export function pipe(src: IGen<any>, ...procs: IProc<any, any>[]): IGen<any> {
    let fn: FnAny<any>;
    const [a, b, c, d] = procs;
    switch (procs.length) {
        case 1:
            fn = (x) => a.next(x);
            break;
        case 2:
            fn = (x) => b.next(a.next(x));
            break;
        case 3:
            fn = (x) => c.next(b.next(a.next(x)));
            break;
        case 4:
            fn = (x) => d.next(c.next(b.next(a.next(x))));
            break;
        default:
            fn = (x) => procs.reduce((x, p) => p.next(x), x);
    }
    return new MapG1(fn, src, <any>null);
}
