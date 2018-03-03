import { Transducer } from "../api";

export function comp<A, B>(a: Transducer<A, B>): Transducer<A, B>;
export function comp<A, B, C>(a: Transducer<A, B>, b: Transducer<B, C>): Transducer<A, C>;
export function comp<A, B, C, D>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>): Transducer<A, D>;
export function comp<A, B, C, D, E>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>): Transducer<A, E>;
export function comp<A, B, C, D, E, F>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>): Transducer<A, F>;
export function comp<A, B, C, D, E, F, G>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>): Transducer<A, G>;
export function comp<A, B, C, D, E, F, G, H>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>): Transducer<A, H>;
export function comp<A, B, C, D, E, F, G, H, I>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>): Transducer<A, I>;
export function comp<A, B, C, D, E, F, G, H, I, J>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>, i: Transducer<I, J>): Transducer<A, J>;
export function comp<A, B, C, D, E, F, G, H, I, J, K>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>, i: Transducer<I, J>, j: Transducer<J, K>): Transducer<A, K>;
export function comp<A, B, C, D, E, F, G, H, I, J, K>(a: Transducer<A, B>, b: Transducer<B, C>, c: Transducer<C, D>, d: Transducer<D, E>, e: Transducer<E, F>, f: Transducer<F, G>, g: Transducer<G, H>, h: Transducer<H, I>, i: Transducer<I, J>, j: Transducer<J, K>, ...fns: Transducer<any, any>[]): Transducer<A, any>;
export function comp(...fns: ((x: any) => any)[]) {
    let [a, b, c, d, e, f, g, h, i, j] = fns;
    switch (fns.length) {
        case 0:
            throw new Error("no fn args given");
        case 1:
            return a;
        case 2:
            return (x) => a(b(x));
        case 3:
            return (x) => a(b(c(x)));
        case 4:
            return (x) => a(b(c(d(x))));
        case 5:
            return (x) => a(b(c(d(e(x)))));
        case 6:
            return (x) => a(b(c(d(e(f(x))))));
        case 7:
            return (x) => a(b(c(d(e(f(g(x)))))));
        case 8:
            return (x) => a(b(c(d(e(f(g(h(x))))))));
        case 9:
            return (x) => a(b(c(d(e(f(g(h(i(x)))))))));
        case 10:
        default:
            let ff = (x) => a(b(c(d(e(f(g(h(i(j(x))))))))));
            // TODO TS2.7.* complains about args here?
            return fns.length === 10 ? ff : (<any>comp)(ff, ...fns.slice(10));
    }
}
