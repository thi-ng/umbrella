import type { Vec } from "@thi.ng/vectors";
import { jitter } from "@thi.ng/vectors/jitter";

export const jitterPoints = (pts: Vec[], scl = 5) =>
    pts.map((p) => jitter([], p, scl));
