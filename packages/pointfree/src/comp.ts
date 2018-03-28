import { StackFn } from "./api";

/**
 * Similar to (and ported from @thi.ng/transducers/func/comp), but uses
 * inverted composition order (right-to-left).
 */
export function comp(): StackFn;
export function comp(a: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn, e: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn, e: StackFn, f: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn, e: StackFn, f: StackFn, g: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn, e: StackFn, f: StackFn, g: StackFn, h: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn, e: StackFn, f: StackFn, g: StackFn, h: StackFn, i: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn, e: StackFn, f: StackFn, g: StackFn, h: StackFn, i: StackFn, j: StackFn): StackFn;
export function comp(a: StackFn, b: StackFn, c: StackFn, d: StackFn, e: StackFn, f: StackFn, g: StackFn, h: StackFn, i: StackFn, j: StackFn, ...fns: StackFn[]): StackFn;
export function comp(...fns: ((x: any) => any)[]) {
    let [a, b, c, d, e, f, g, h, i, j] = fns;
    switch (fns.length) {
        case 0:
            return (x) => x;
        case 1:
            return a;
        case 2:
            return (x) => b(a(x));
        case 3:
            return (x) => c(b(a(x)));
        case 4:
            return (x) => d(c(b(a(x))));
        case 5:
            return (x) => e(d(c(b(a(x)))));
        case 6:
            return (x) => f(e(d(c(b(a(x))))));
        case 7:
            return (x) => g(f(e(d(c(b(a(x)))))));
        case 8:
            return (x) => h(g(f(e(d(c(b(a(x))))))));
        case 9:
            return (x) => i(h(g(f(e(d(c(b(a(x)))))))));
        case 10:
        default:
            let ff = (x) => j(i(h(g(f(e(d(c(b(a(x))))))))));
            // TODO TS2.7.* complains about args here?
            return fns.length === 10 ? ff : (<any>comp)(ff, ...fns.slice(10));
    }
}
