import { quantity } from "../unit.js";
import { inch, mm } from "../units/length.js";

// https://en.wikipedia.org/wiki/ISO_216x

export const DIN_A0 = quantity([841, 1189], mm);
export const DIN_A1 = quantity([594, 841], mm);
export const DIN_A2 = quantity([420, 594], mm);
export const DIN_A3 = quantity([297, 420], mm);
export const DIN_A4 = quantity([210, 297], mm);
export const DIN_A5 = quantity([148, 210], mm);
export const DIN_A6 = quantity([105, 148], mm);
export const DIN_A7 = quantity([74, 105], mm);
export const DIN_A8 = quantity([52, 74], mm);

// https://papersizes.io/us/

export const US_LETTER = quantity([8.5, 11], inch);
export const US_HALF_LETTER = quantity([5.5, 8.5], inch);
export const US_LEGAL = quantity([8.5, 14], inch);
export const US_JUNIOR_LEGAL = quantity([5, 8], inch);

export const ANSI_A = US_LETTER;
export const ANSI_B = quantity([11, 17], inch);
export const ANSI_C = quantity([17, 22], inch);
export const ANSI_D = quantity([22, 34], inch);
export const ANSI_E = quantity([34, 44], inch);

export const US_ARCH_A = quantity([9, 12], inch);
export const US_ARCH_B = quantity([12, 18], inch);
export const US_ARCH_C = quantity([18, 24], inch);
export const US_ARCH_D = quantity([24, 36], inch);
export const US_ARCH_E = quantity([36, 48], inch);
export const US_ARCH_E1 = quantity([30, 42], inch);
export const US_ARCH_E2 = quantity([26, 38], inch);
export const US_ARCH_E3 = quantity([27, 39], inch);
