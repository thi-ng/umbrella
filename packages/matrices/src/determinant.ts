// SPDX-License-Identifier: Apache-2.0
import { dotC4, dotC6 } from "@thi.ng/vectors/dotc";
import type { ReadonlyMat } from "./api.js";

export const det22 = (m: ReadonlyMat) => dotC4(m[0], m[3], -m[1], m[2]);

export const det23 = det22;

export const det33 = (m: ReadonlyMat) => {
	const [m00, m01, m02, m10, m11, m12, m20, m21, m22] = m;
	const d01 = dotC4(m22, m11, -m12, m21);
	const d11 = dotC4(m12, m20, -m22, m10);
	const d21 = dotC4(m21, m10, -m11, m20);
	return dotC6(m00, d01, m01, d11, m02, d21);
};

export const detCoeffs44 = (m: ReadonlyMat) => {
	const [
		m00,
		m01,
		m02,
		m03,
		m10,
		m11,
		m12,
		m13,
		m20,
		m21,
		m22,
		m23,
		m30,
		m31,
		m32,
		m33,
	] = m;
	return [
		dotC4(m00, m11, -m01, m10),
		dotC4(m00, m12, -m02, m10),
		dotC4(m00, m13, -m03, m10),
		dotC4(m01, m12, -m02, m11),
		dotC4(m01, m13, -m03, m11),
		dotC4(m02, m13, -m03, m12),
		dotC4(m20, m31, -m21, m30),
		dotC4(m20, m32, -m22, m30),
		dotC4(m20, m33, -m23, m30),
		dotC4(m21, m32, -m22, m31),
		dotC4(m21, m33, -m23, m31),
		dotC4(m22, m33, -m23, m32),
	];
};

export const det44FromCoeffs = (d: number[]) =>
	dotC6(d[0], d[11], -d[1], d[10], d[2], d[9]) +
	dotC6(d[3], d[8], -d[4], d[7], d[5], d[6]);

export const det44 = (m: ReadonlyMat) => det44FromCoeffs(detCoeffs44(m));
