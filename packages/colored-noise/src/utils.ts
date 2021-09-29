// thing:no-export
import type { INorm } from "@thi.ng/random";

export const preseed = (n: number, scale: number, rnd: INorm) => {
    const state = new Array(n);
    for (let i = 0; i < n; i++) {
        state[i] = rnd.norm(scale);
    }
    return state;
};

export const sum = (src: number[]) => src.reduce((sum, x) => sum + x, 0);

export function* interleave(a: Iterable<number>, b: Iterable<number>) {
    const src = [a[Symbol.iterator](), b[Symbol.iterator]()];
    for (let i = 0; true; i ^= 1) {
        const next = src[i].next();
        if (next.done) return;
        yield next.value!;
    }
}
