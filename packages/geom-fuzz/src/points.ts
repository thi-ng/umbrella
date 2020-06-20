import { Vec, jitter } from "@thi.ng/vectors";

export const jitterPoints = (pts: Vec[], scl = 5) =>
    pts.map((p) => jitter([], p, scl));
