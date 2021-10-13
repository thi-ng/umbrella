import { defMathOpN } from "./compile/emit.js";

/**
 * Same as {@link fmod}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 */
export const [fmodN, fmodN2, fmodN3, fmodN4] = defMathOpN("%");
