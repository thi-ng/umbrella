// SPDX-License-Identifier: Apache-2.0
import { set as _set, set4 } from "@thi.ng/vectors/set";
import type { MatOpM } from "./api.js";

export const set: MatOpM = _set;

export const set22: MatOpM = set4;

export const set23: MatOpM = _set.add(6, (o, a) => {
	!o && (o = []);
	o[0] = a[0];
	o[1] = a[1];
	o[2] = a[2];
	o[3] = a[3];
	o[4] = a[4];
	o[5] = a[5];
	return o;
});

export const set33: MatOpM = _set.add(9, (o, a) => {
	!o && (o = []);
	o[0] = a[0];
	o[1] = a[1];
	o[2] = a[2];
	o[3] = a[3];
	o[4] = a[4];
	o[5] = a[5];
	o[6] = a[6];
	o[7] = a[7];
	o[8] = a[8];
	return o;
});

export const set44: MatOpM = _set.add(16, (o, a) => {
	!o && (o = []);
	o[0] = a[0];
	o[1] = a[1];
	o[2] = a[2];
	o[3] = a[3];
	o[4] = a[4];
	o[5] = a[5];
	o[6] = a[6];
	o[7] = a[7];
	o[8] = a[8];
	o[9] = a[9];
	o[10] = a[10];
	o[11] = a[11];
	o[12] = a[12];
	o[13] = a[13];
	o[14] = a[14];
	o[15] = a[15];
	return o;
});
