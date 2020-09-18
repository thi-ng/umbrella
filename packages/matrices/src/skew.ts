import type { MatOpN } from "./api";
import {
    shearX22,
    shearX23,
    shearXY33,
    shearXY44,
    shearXZ33,
    shearXZ44,
    shearY22,
    shearY23,
    shearYX33,
    shearYX44,
    shearYZ33,
    shearYZ44,
    shearZX33,
    shearZX44,
    shearZY33,
    shearZY44,
} from "./shear";

const $ = (f: MatOpN): MatOpN => (m, theta) => f(m, Math.tan(theta));

export const skewX22 = $(shearX22);
export const skewY22 = $(shearY22);

export const skewX23 = $(shearX23);
export const skewY23 = $(shearY23);

export const skewXY33 = $(shearXY33);
export const skewXZ33 = $(shearXZ33);
export const skewYX33 = $(shearYX33);
export const skewYZ33 = $(shearYZ33);
export const skewZX33 = $(shearZX33);
export const skewZY33 = $(shearZY33);

export const skewXY44 = $(shearXY44);
export const skewXZ44 = $(shearXZ44);
export const skewYX44 = $(shearYX44);
export const skewYZ44 = $(shearYZ44);
export const skewZX44 = $(shearZX44);
export const skewZY44 = $(shearZY44);
