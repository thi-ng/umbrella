import { Mat } from "./api";
import {
    scale22,
    scale23,
    scale33,
    scale44
} from "./scale";

export const mat2n = (out: Mat | null, n: number) => scale22(out, n);

export const mat23n = (out: Mat | null, n: number) => scale23(out, n);

export const mat3n = (out: Mat | null, n: number) => scale33(out, n);

export const mat4n = (out: Mat | null, n: number) => scale44(out, n);
