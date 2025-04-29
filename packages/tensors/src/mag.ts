import type { ITensor } from "./api.js";
import { magSq } from "./magsq.js";

export const mag = (a: ITensor) => Math.sqrt(magSq(a));
