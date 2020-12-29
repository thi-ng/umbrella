import { eqDelta } from "@thi.ng/math";
import type { ReadonlyColor } from "./api";

const EPS = 1e-3;

export const isGrayHsv = (x: ReadonlyColor, eps = EPS) => x[1] <= eps;

export const isGrayRGB = (x: ReadonlyColor, eps = EPS) =>
    eqDelta(x[0], x[1], eps) && eqDelta(x[0], x[2], eps);

export const isBlackHsv = (x: ReadonlyColor, eps = EPS) => x[2] <= eps;

export const isBlackRGB = (x: ReadonlyColor, eps = EPS) =>
    x[0] <= eps && x[1] <= eps && x[2] <= eps;

export const isWhiteHsv = (x: ReadonlyColor, eps = EPS) =>
    x[1] <= eps && x[2] >= 1 - eps;

export const isWhiteRGB = (x: ReadonlyColor, eps = EPS) => {
    eps = 1 - eps;
    return x[0] >= eps && x[1] >= eps && x[2] >= eps;
};
