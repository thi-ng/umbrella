import { EPS } from "./api";

export const absDiff = (x: number, y: number) =>
    Math.abs(x - y);

export const sign = (x: number, eps = EPS) =>
    x > eps ? 1 : x < -eps ? -1 : 0;
