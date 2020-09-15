import type { FnN } from "@thi.ng/api";
import type { Pow2 } from "./api";

// http://graphics.stanford.edu/~seander/bithacks.html

export const isPow2 = (x: number): x is Pow2 => !!x && !(x & (x - 1));

export const ceilPow2: FnN = (x) => {
    x += <any>(x === 0);
    --x;
    x |= x >>> 1;
    x |= x >>> 2;
    x |= x >>> 4;
    x |= x >>> 8;
    x |= x >>> 16;
    return x + 1;
};

export const floorPow2: FnN = (x) => {
    x |= x >>> 1;
    x |= x >>> 2;
    x |= x >>> 4;
    x |= x >>> 8;
    x |= x >>> 16;
    return x - (x >>> 1);
};
