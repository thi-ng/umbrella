import type { ReadonlyVec } from "./api.js";
import { magSq } from "./magsq.js";

export const mag = (v: ReadonlyVec) => Math.sqrt(magSq(v));
