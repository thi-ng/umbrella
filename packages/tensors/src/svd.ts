// SPDX-License-Identifier: Apache-2.0
import type { FnN2, NumericArray } from "@thi.ng/api";
import { swap } from "@thi.ng/arrays/swap";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ITensor2 } from "./api.js";
import { zeroes } from "./tensor.js";

const { abs, sqrt } = Math;

/**
 * Singular value matrix decomposition. Takes an MxN matrix `mat` and decomposes
 * it into `{u, v, d}`, where `u`, `v` are left and right orthogonal
 * transformation matrices, and `d` is a diagonal matrix of singular values (as
 * 1D tensor). Does not modify original matrix.
 *
 * @remarks
 * Throws an error if the matrix has fewer rows than columns or if there's no
 * convergence after `maxIter` iterations.
 *
 * Adapted from Numerical Recipes by Luke Tierney and David Betz. C version
 * linked below by Dianne Cook.
 *
 * Updates/changes:
 * - Use flat arrays, add index calculations
 * - Update loops
 * - Minor other refactoring/optimizations
 *
 * Reference:
 *
 * - https://web.archive.org/web/20181206055037/http://www.public.iastate.edu/~dicook/JSS/paper/code/svd.c
 * - https://github.com/bitanath/pca/blob/master/pca.js
 *
 * @param mat
 * @param maxIter
 */
export const svd = (mat: ITensor2, maxIter = 50) => {
	const [M, N] = mat.shape;
	if (M < N) illegalArgs("need more rows than columns");

	const $u = mat.pack();
	const $q = zeroes([N]);
	const $v = zeroes([N, N]);
	const u = <NumericArray>$u.data;
	const q = <NumericArray>$q.data;
	const v = <NumericArray>$v.data;
	const e = new Array<number>(N).fill(0);

	let prec = 2 ** -52;
	const tolerance = 1e-64 / prec;
	let c = 0;
	let i = 0;
	let j = 0;
	let k = 0;
	let l = 0;

	let f = 0;
	let g = 0;
	let h = 0;
	let x = 0;
	let y = 0;
	let z = 0;
	let scale = 0;
	let $i: number;
	let $j: number;
	let $k: number;

	// Householder's reduction to bidiagonal form
	for (i = 0, $i = 0; i < N; i++, $i += N) {
		e[i] = g;
		scale = 0;
		l = i + 1;
		for (j = i, $j = $i + i; j < M; j++, $j += N) {
			scale += u[$j] ** 2;
		}
		if (scale <= tolerance) g = 0;
		else {
			f = u[$i + i];
			g = sqrt(scale);
			if (f >= 0) g *= -1;
			h = f * g - scale;
			u[$i + i] = f - g;
			for (j = l; j < N; j++) {
				scale = 0;
				for (k = i, $k = $i; k < M; k++, $k += N) {
					scale += u[$k + i] * u[$k + j];
				}
				f = scale / h;
				for (k = i, $k = $i; k < M; k++, $k += N) {
					u[$k + j] += f * u[$k + i];
				}
			}
		}
		q[i] = g;
		scale = 0;
		for (j = l; j < N; j++) {
			scale += u[$i + j] ** 2;
		}
		if (scale <= tolerance) g = 0;
		else {
			f = u[$i + i + 1];
			g = sqrt(scale);
			if (f >= 0) g *= -1;
			h = f * g - scale;
			u[$i + i + 1] = f - g;
			for (j = l; j < N; j++) e[j] = u[$i + j] / h;
			for (j = l, $j = j * N; j < M; j++, $j += N) {
				scale = 0;
				for (k = l; k < N; k++) {
					scale += u[$j + k] * u[$i + k];
				}
				for (k = l; k < N; k++) {
					u[$j + k] += scale * e[k];
				}
			}
		}
		y = abs(q[i]) + abs(e[i]);
		if (y > x) x = y;
	}

	// accumulation of right hand transformations
	for (i = N; i-- > 0; ) {
		$i = i * N;
		if (g !== 0) {
			h = g * u[$i + i + 1];
			for (j = l, $j = j * N + i; j < N; j++, $j += N) {
				v[$j] = u[$i + j] / h;
			}
			for (j = l; j < N; j++) {
				scale = 0;
				for (k = l, $k = k * N + j; k < N; k++, $k += N) {
					scale += u[$i + k] * v[$k];
				}
				for (k = l, $k = k * N; k < N; k++, $k += N) {
					v[$k + j] += scale * v[$k + i];
				}
			}
		}
		for (j = l, $j = j * N + i; j < N; j++, $j += N) {
			v[$i + j] = 0;
			v[$j] = 0;
		}
		v[$i + i] = 1;
		g = e[i];
		l = i;
	}

	// accumulation of left hand transformations
	for (i = N; i-- > 0; ) {
		$i = i * N;
		l = i + 1;
		g = q[i];
		for (j = l; j < N; j++) u[$i + j] = 0;
		if (g !== 0) {
			h = u[$i + i] * g;
			for (j = l; j < N; j++) {
				scale = 0;
				for (k = l, $k = k * N; k < M; k++, $k += N) {
					scale += u[$k + i] * u[$k + j];
				}
				f = scale / h;
				for (k = i, $k = k * N; k < M; k++, $k += N) {
					u[$k + j] += f * u[$k + i];
				}
			}
			for (j = i, $j = $i + i; j < M; j++, $j += N) {
				u[$j] /= g;
			}
		} else {
			for (j = i, $j = $i + i; j < M; j++, $j += N) u[$j] = 0;
		}
		u[$i + i]++;
	}

	// diagonalization of the bidiagonal form
	prec *= x;
	for (k = N; k-- > 0; ) {
		for (let iter = 0; iter <= maxIter; iter++) {
			let testConvergance = false;
			for (l = k; l >= 0; l--) {
				if (abs(e[l]) <= prec) {
					testConvergance = true;
					break;
				}
				if (abs(q[l - 1]) <= prec) break;
			}
			if (!testConvergance) {
				// cancellation of e[l] if l>0
				c = 0;
				scale = 1;
				const l1 = l - 1;
				for (i = l; i <= k; i++) {
					f = scale * e[i];
					e[i] *= c;
					if (abs(f) <= prec) break;
					g = q[i];
					h = __pythag(f, g);
					q[i] = h;
					c = g / h;
					scale = -f / h;
					for (j = 0, $j = 0; j < M; j++, $j += N) {
						y = u[$j + l1];
						z = u[$j + i];
						u[$j + l1] = y * c + z * scale;
						u[$j + i] = -y * scale + z * c;
					}
				}
			}
			// test f convergence
			z = q[k];
			if (l === k) {
				// convergence
				if (z < 0) {
					q[k] = -z;
					for (j = 0, $j = k; j < N; j++, $j += N) {
						v[$j] *= -1;
					}
				}
				break;
			}
			if (iter >= maxIter) illegalState("no convergence");
			// shift from bottom 2x2 minor
			x = q[l];
			y = q[k - 1];
			g = e[k - 1];
			h = e[k];
			f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
			g = __pythag(f, 1);
			if (f < 0) f = ((x - z) * (x + z) + h * (y / (f - g) - h)) / x;
			else f = ((x - z) * (x + z) + h * (y / (f + g) - h)) / x;
			// next QR transformation
			c = 1;
			scale = 1;
			for (i = l + 1; i <= k; i++) {
				g = e[i];
				y = q[i];
				h = scale * g;
				g = c * g;
				z = __pythag(f, h);
				e[i - 1] = z;
				c = f / z;
				scale = h / z;
				f = x * c + g * scale;
				g = -x * scale + g * c;
				h = y * scale;
				y = y * c;
				for (j = 0, $j = i; j < N; j++, $j += N) {
					x = v[$j - 1];
					z = v[$j];
					v[$j - 1] = x * c + z * scale;
					v[$j] = -x * scale + z * c;
				}
				z = __pythag(f, h);
				q[i - 1] = z;
				c = f / z;
				scale = h / z;
				f = c * g + scale * y;
				x = -scale * g + c * y;
				for (j = 0, $j = i; j < M; j++, $j += N) {
					y = u[$j - 1];
					z = u[$j];
					u[$j - 1] = y * c + z * scale;
					u[$j] = -y * scale + z * c;
				}
			}
			e[l] = 0;
			e[k] = f;
			q[k] = x;
		}
	}

	for (i = 0; i < N; i++) if (q[i] < prec) q[i] = 0;

	// sort eigenvalues
	for (i = 0; i < N; i++) {
		for (j = i; j-- > 0; ) {
			if (q[j] < q[i]) {
				swap(q, i, j);
				for (k = 0, $k = 0; k < M; k++, $k += N)
					swap(u, $k + i, $k + j);
				for (k = 0, $k = 0; k < N; k++, $k += N)
					swap(v, $k + i, $k + j);
				i = j;
			}
		}
	}

	return { u: $u, v: $v, d: $q };
};

/** @internal */
const __pythag: FnN2 = (a, b) => {
	a = abs(a);
	b = abs(b);
	return a > b
		? a * sqrt(1 + (b * b) / a / a)
		: b !== 0
		? b * sqrt(1 + (a * a) / b / b)
		: a;
};
