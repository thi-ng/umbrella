import { ReadonlyVec, Vec } from "./api";

export const swizzle2 =
    (out: Vec, b: ReadonlyVec, x: number, y: number) =>
        (out[0] = b[x] || 0, out[1] = b[y] || 0, out);

export const swizzle3 =
    (out: Vec, b: ReadonlyVec, x: number, y: number, z: number) =>
        (out[0] = b[x] || 0, out[1] = b[y] || 0, out[2] = b[z] || 0, out);

export const swizzle4 =
    (out: Vec, b: ReadonlyVec, x: number, y: number, z: number, w: number) =>
        (out[0] = b[x] || 0, out[1] = b[y] || 0, out[2] = b[z] || 0, out[3] = b[w] || 0, out);
