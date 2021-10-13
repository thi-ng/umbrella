import type { ReadonlyMat } from "./api.js";

export const IDENT22: ReadonlyMat = Object.freeze([1, 0, 0, 1]);

export const IDENT23: ReadonlyMat = Object.freeze([1, 0, 0, 1, 0, 0]);

//prettier-ignore
export const IDENT33: ReadonlyMat = Object.freeze([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]);

//prettier-ignore
export const IDENT44: ReadonlyMat = Object.freeze([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);
