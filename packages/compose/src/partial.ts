import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

export function partial<A, T>(fn: (a: A, ...args: any[]) => T, a: A): (...args: any[]) => T;
export function partial<A, B, T>(fn: (a: A, b: B, ...args: any[]) => T, a: A, b: B): (...args: any[]) => T;
export function partial<A, B, C, T>(fn: (a: A, b: B, c: C, ...args: any[]) => T, a: A, b: B, c: C): (...args: any[]) => T;
export function partial<A, B, C, D, T>(fn: (a: A, b: B, c: C, d: D, ...args: any[]) => T, a: A, b: B, c: C, d: D): (...args: any[]) => T;
export function partial<A, B, C, D, E, T>(fn: (a: A, b: B, c: C, d: D, e: E, ...args: any[]) => T, a: A, b: B, c: C, d: D, e: E): (...args: any[]) => T;
export function partial<A, B, C, D, E, F, T>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, ...args: any[]) => T, a: A, b: B, c: C, d: D, e: E, f: F): (...args: any[]) => T;
export function partial<A, B, C, D, E, F, G, T>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...args: any[]) => T, a: A, b: B, c: C, d: D, e: E, f: F, g: G): (...args: any[]) => T;
export function partial<A, B, C, D, E, F, G, H, T>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...args: any[]) => T, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): (...args: any[]) => T;
export function partial(fn, ...args: any[]) {
    let [a, b, c, d, e, f, g, h] = args;
    switch (args.length) {
        case 1:
            return (...xs: any[]) => fn(a, ...xs);
        case 2:
            return (...xs: any[]) => fn(a, b, ...xs);
        case 3:
            return (...xs: any[]) => fn(a, b, c, ...xs);
        case 4:
            return (...xs: any[]) => fn(a, b, c, d, ...xs);
        case 5:
            return (...xs: any[]) => fn(a, b, c, d, e, ...xs);
        case 6:
            return (...xs: any[]) => fn(a, b, c, d, e, f, ...xs);
        case 7:
            return (...xs: any[]) => fn(a, b, c, d, e, f, g, ...xs);
        case 8:
            return (...xs: any[]) => fn(a, b, c, d, e, f, g, h, ...xs);
        default:
            illegalArgs();
    }
}

export const foo = partial((a: string, b: number) => a + b, "a");
