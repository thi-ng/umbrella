import type { ReadonlyVec } from "./api";
import { magSq } from "./magsq";

export const mag = (v: ReadonlyVec) => Math.sqrt(magSq(v));
