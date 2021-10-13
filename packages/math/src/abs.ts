import type { FnN2 } from "@thi.ng/api";
import { EPS } from "./api.js";

export const absDiff: FnN2 = (x, y) => Math.abs(x - y);

export const sign = (x: number, eps = EPS) => (x > eps ? 1 : x < -eps ? -1 : 0);
