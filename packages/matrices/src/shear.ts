import type { MatOp1, MatOpN } from "./api.js";
import { identity22, identity23, identity33, identity44 } from "./identity.js";

const $ = (f: MatOp1) => (i: number): MatOpN => (m, x) => (
    !m && (m = []), f(m), (m[i] = x), m
);

const $22 = $(identity22);
const $23 = $(identity23);
const $33 = $(identity33);
const $44 = $(identity44);

// https://stackoverflow.com/a/13211288/294515

export const shearX22 = $22(2);
export const shearY22 = $22(1);

export const shearX23 = $23(2);
export const shearY23 = $23(1);

export const shearXY33 = $33(3);
export const shearXZ33 = $33(6);
export const shearYX33 = $33(1);
export const shearYZ33 = $33(7);
export const shearZX33 = $33(2);
export const shearZY33 = $33(5);

export const shearXY44 = $44(4);
export const shearXZ44 = $44(8);
export const shearYX44 = $44(1);
export const shearYZ44 = $44(9);
export const shearZX44 = $44(2);
export const shearZY44 = $44(6);
