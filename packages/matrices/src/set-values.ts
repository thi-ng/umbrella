import { Mat } from "./api";
import { set23, set22, set33, set44 } from "./set";

export const setValues22 =
    (mat: Mat, ...xs: number[]) => set22(mat, xs);

export const setValues23 =
    (mat: Mat, ...xs: number[]) => set23(mat, xs);

export const setValues33 =
    (mat: Mat, ...xs: number[]) => set33(mat, xs);

export const setValues44 =
    (mat: Mat, ...xs: number[]) => set44(mat, xs);