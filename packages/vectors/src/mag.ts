import type { VecOpRoV } from "./api.js";
import { magSq, magSq2, magSq3, magSq4 } from "./magsq.js";

export const mag: VecOpRoV<number> = (v) => Math.sqrt(magSq(v));

export const mag2: VecOpRoV<number> = (v) => Math.sqrt(magSq2(v));

export const mag3: VecOpRoV<number> = (v) => Math.sqrt(magSq3(v));

export const mag4: VecOpRoV<number> = (v) => Math.sqrt(magSq4(v));
