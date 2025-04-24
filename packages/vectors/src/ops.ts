// SPDX-License-Identifier: Apache-2.0
import type { FnN2, FnN3 } from "@thi.ng/api";

export const $add: FnN2 = (a, b) => a + b;
export const $addI: FnN2 = (a, b) => (a + b) | 0;
export const $addU: FnN2 = (a, b) => (a + b) >>> 0;

export const $addm: FnN3 = (a, b, c) => (a + b) * c;

export const $bandI: FnN2 = (a, b) => a & b;
export const $bandU: FnN2 = (a, b) => (a & b) >>> 0;
export const $borI: FnN2 = (a, b) => a | b;
export const $borU: FnN2 = (a, b) => (a | b) >>> 0;
export const $bxorI: FnN2 = (a, b) => a ^ b;
export const $bxorU: FnN2 = (a, b) => (a ^ b) >>> 0;

export const $div: FnN2 = (a, b) => a / b;
export const $divI: FnN2 = (a, b) => (a / b) | 0;
export const $divU: FnN2 = (a, b) => (a / b) >>> 0;

export const $fmod: FnN2 = (a, b) => a % b;

export const $lsI: FnN2 = (a, b) => a << b;
export const $lsU: FnN2 = (a, b) => (a << b) >>> 0;

export const $madd: FnN3 = (a, b, c) => a * b + c;
export const $msub: FnN3 = (a, b, c) => a * b - c;

export const $mix: FnN3 = (a, b, c) => a + (b - a) * c;

export const $mul: FnN2 = (a, b) => a * b;
export const $mulI: FnN2 = (a, b) => (a * b) | 0;
export const $mulU: FnN2 = (a, b) => (a * b) >>> 0;

export const $rsI: FnN2 = (a, b) => a >> b;
export const $rsU: FnN2 = (a, b) => a >>> b;

export const $sub: FnN2 = (a, b) => a - b;
export const $subI: FnN2 = (a, b) => (a - b) | 0;
export const $subU: FnN2 = (a, b) => (a - b) >>> 0;

export const $subm: FnN3 = (a, b, c) => (a - b) * c;
