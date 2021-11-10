import type { IGrid2D } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import type { Shader2D } from "./api.js";

export const isInBounds2D = (
    { size }: IGrid2D<any, any>,
    x: number,
    y: number
) => x >= 0 && x < size[0] && y >= 0 && y < size[1];

export const ensureShader2D = <T>(val: T | Shader2D<T>) =>
    isFunction(val) ? val : () => val;
