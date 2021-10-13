import type { ReadonlyVec } from "./api.js";
import { center } from "./center.js";
import { magSq } from "./magsq.js";

export const variance = (a: ReadonlyVec) =>
    magSq(center([], a)) / (a.length - 1);

export const sd = (a: ReadonlyVec) => Math.sqrt(variance(a));
