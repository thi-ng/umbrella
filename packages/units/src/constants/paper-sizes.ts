import { Quantity, quantity } from "../unit.js";
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

/**
 * Creates a landscape version of given paper size
 *
 * @internal
 */
const $ = (q: Quantity<number[]>) =>
	new Quantity<number[]>([q.value[1], q.value[0]]);

export const DIN_A0_LANDSCAPE = $(DIN_A0);
export const DIN_A1_LANDSCAPE = $(DIN_A1);
export const DIN_A2_LANDSCAPE = $(DIN_A2);
export const DIN_A3_LANDSCAPE = $(DIN_A3);
export const DIN_A4_LANDSCAPE = $(DIN_A4);
export const DIN_A5_LANDSCAPE = $(DIN_A5);
export const DIN_A6_LANDSCAPE = $(DIN_A6);
export const DIN_A7_LANDSCAPE = $(DIN_A7);
export const DIN_A8_LANDSCAPE = $(DIN_A8);

// https://papersizes.io/us/

export const US_LETTER = quantity([8.5, 11], inch);
export const US_HALF_LETTER = quantity([5.5, 8.5], inch);
export const US_LEGAL = quantity([8.5, 14], inch);
export const US_JUNIOR_LEGAL = quantity([5, 8], inch);

export const US_LETTER_LANDSCAPE = $(US_LETTER);
export const US_HALF_LETTER_LANDSCAPE = $(US_HALF_LETTER);
export const US_LEGAL_LANDSCAPE = $(US_LEGAL);
export const US_JUNIOR_LEGAL_LANDSCAPE = $(US_JUNIOR_LEGAL);

export const ANSI_A = US_LETTER;
export const ANSI_B = quantity([11, 17], inch);
export const ANSI_C = quantity([17, 22], inch);
export const ANSI_D = quantity([22, 34], inch);
export const ANSI_E = quantity([34, 44], inch);

export const ANSI_A_LANDSCAPE = $(ANSI_A);
export const ANSI_B_LANDSCAPE = $(ANSI_B);
export const ANSI_C_LANDSCAPE = $(ANSI_C);
export const ANSI_D_LANDSCAPE = $(ANSI_D);
export const ANSI_E_LANDSCAPE = $(ANSI_E);

export const US_ARCH_A = quantity([9, 12], inch);
export const US_ARCH_B = quantity([12, 18], inch);
export const US_ARCH_C = quantity([18, 24], inch);
export const US_ARCH_D = quantity([24, 36], inch);
export const US_ARCH_E = quantity([36, 48], inch);
export const US_ARCH_E1 = quantity([30, 42], inch);
export const US_ARCH_E2 = quantity([26, 38], inch);
export const US_ARCH_E3 = quantity([27, 39], inch);

export const US_ARCH_A_LANDSCAPE = $(US_ARCH_A);
export const US_ARCH_B_LANDSCAPE = $(US_ARCH_B);
export const US_ARCH_C_LANDSCAPE = $(US_ARCH_C);
export const US_ARCH_D_LANDSCAPE = $(US_ARCH_D);
export const US_ARCH_E_LANDSCAPE = $(US_ARCH_E);
export const US_ARCH_E1_LANDSCAPE = $(US_ARCH_E1);
export const US_ARCH_E2_LANDSCAPE = $(US_ARCH_E2);
export const US_ARCH_E3_LANDSCAPE = $(US_ARCH_E3);
