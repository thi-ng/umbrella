import type { ReadonlyVec } from "./api";
import { center } from "./center";
import { magSq } from "./magsq";

export const variance = (a: ReadonlyVec) =>
    magSq(center([], a)) / (a.length - 1);

export const sd = (a: ReadonlyVec) => Math.sqrt(variance(a));
