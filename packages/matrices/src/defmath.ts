// SPDX-License-Identifier: Apache-2.0
import type { FnN2 } from "@thi.ng/api";
import type { MatOpMM, MatOpMN } from "./api.js";

/** @internal */
export const defMath = (op: FnN2): [MatOpMM, MatOpMM, MatOpMM] => [
	(o, a, b) => {
		!o && (o = a);
		o[0] = op(a[0], b[0]);
		o[1] = op(a[1], b[1]);
		o[2] = op(a[2], b[2]);
		o[3] = op(a[3], b[3]);
		o[4] = op(a[4], b[4]);
		o[5] = op(a[5], b[5]);
		return o;
	},
	(o, a, b) => {
		!o && (o = a);
		o[0] = op(a[0], b[0]);
		o[1] = op(a[1], b[1]);
		o[2] = op(a[2], b[2]);
		o[3] = op(a[3], b[3]);
		o[4] = op(a[4], b[4]);
		o[5] = op(a[5], b[5]);
		o[6] = op(a[6], b[6]);
		o[7] = op(a[7], b[7]);
		o[8] = op(a[8], b[8]);
		return o;
	},
	(o, a, b) => {
		!o && (o = a);
		o[0] = op(a[0], b[0]);
		o[1] = op(a[1], b[1]);
		o[2] = op(a[2], b[2]);
		o[3] = op(a[3], b[3]);
		o[4] = op(a[4], b[4]);
		o[5] = op(a[5], b[5]);
		o[6] = op(a[6], b[6]);
		o[7] = op(a[7], b[7]);
		o[8] = op(a[8], b[8]);
		o[9] = op(a[9], b[9]);
		o[10] = op(a[10], b[10]);
		o[11] = op(a[11], b[11]);
		o[12] = op(a[12], b[12]);
		o[13] = op(a[13], b[13]);
		o[14] = op(a[14], b[14]);
		o[15] = op(a[15], b[15]);
		return o;
	},
];

/** @internal */
export const defMathN = (op: FnN2): [MatOpMN, MatOpMN, MatOpMN] => [
	(o, a, n) => {
		!o && (o = a);
		o[0] = op(a[0], n);
		o[1] = op(a[1], n);
		o[2] = op(a[2], n);
		o[3] = op(a[3], n);
		o[4] = op(a[4], n);
		o[5] = op(a[5], n);
		return o;
	},
	(o, a, n) => {
		!o && (o = a);
		o[0] = op(a[0], n);
		o[1] = op(a[1], n);
		o[2] = op(a[2], n);
		o[3] = op(a[3], n);
		o[4] = op(a[4], n);
		o[5] = op(a[5], n);
		o[6] = op(a[6], n);
		o[7] = op(a[7], n);
		o[8] = op(a[8], n);
		return o;
	},
	(o, a, n) => {
		!o && (o = a);
		o[0] = op(a[0], n);
		o[1] = op(a[1], n);
		o[2] = op(a[2], n);
		o[3] = op(a[3], n);
		o[4] = op(a[4], n);
		o[5] = op(a[5], n);
		o[6] = op(a[6], n);
		o[7] = op(a[7], n);
		o[8] = op(a[8], n);
		o[9] = op(a[9], n);
		o[10] = op(a[10], n);
		o[11] = op(a[11], n);
		o[12] = op(a[12], n);
		o[13] = op(a[13], n);
		o[14] = op(a[14], n);
		o[15] = op(a[15], n);
		return o;
	},
];
