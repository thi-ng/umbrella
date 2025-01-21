// SPDX-License-Identifier: Apache-2.0
import { assert } from "@thi.ng/errors/assert";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { maddN } from "@thi.ng/vectors/maddn";
import { mixN } from "@thi.ng/vectors/mixn";
import { mulN } from "@thi.ng/vectors/muln";
import { set } from "@thi.ng/vectors/set";

export const convolveClosed = (
	pts: ReadonlyVec[],
	kernel: number[],
	t = 0.5,
	iter = 1
) => {
	const n = pts.length;
	const size = kernel.length;
	__ensureKernel(size, n);
	const k = size >> 1;
	while (iter-- > 0) {
		const res: Vec[] = new Array(n);
		for (let i = n - k, j = 0; j < n; j++) {
			const q = mulN([], pts[i], kernel[0]);
			i = (i + 1) % n;
			for (let $k = 1, $i = i; $k < size; $i = ($i + 1) % n, $k++) {
				maddN(q, pts[$i], kernel[$k], q);
			}
			res[j] = mixN(q, pts[j], q, t);
		}
		pts = res;
	}
	return pts;
};

export const convolveOpen = (
	pts: ReadonlyVec[],
	kernel: number[],
	t = 0.5,
	iter = 1
) => {
	const n = pts.length;
	const m = n - 1;
	const size = kernel.length;
	__ensureKernel(size, m);
	const k = size >> 1;
	while (iter-- > 0) {
		const res: Vec[] = new Array(n);
		res[0] = set([], pts[0]);
		res[m] = set([], pts[m]);
		const $p = (i: number) => pts[i < 0 ? 0 : i > m ? m : i];
		for (let i = 1 - k, j = 1; j < m; i++, j++) {
			const q = mulN([], $p(i), kernel[0]);
			for (let $k = 1, $i = i + 1; $k < size; $i++, $k++) {
				maddN(q, $p($i), kernel[$k], q);
			}
			res[j] = mixN(q, pts[j], q, t);
		}
		pts = res;
	}
	return pts;
};

const __ensureKernel = (ks: number, n: number) => {
	assert(ks > 0 && ks <= n, `kernel size must be <= ${n}`);
	assert(!!(ks & 1), `kernel size must be an odd number`);
};

export const KERNEL_BOX = (k: number) => {
	k = 2 * k + 1;
	return new Array(k).fill(1 / k);
};

export const KERNEL_TRIANGLE = (k: number) => {
	const kernel = new Array(2 * k + 1);
	for (let i = 0; i <= k; i++) {
		kernel[k - i] = kernel[k + i] = k + 1 - i;
	}
	const norm = (k + 1) ** 2;
	return kernel.map((x) => x / norm);
};

export const KERNEL_GAUSSIAN = (k: number) => {
	const kernel: number[] = [];
	const sigma = -1 / (2 * (Math.hypot(k, k) / 3) ** 2);
	let sum = 0;
	for (let i = -k; i <= k; i++) {
		const g = Math.exp(i * i * sigma);
		sum += g;
		kernel.push(g);
	}
	return kernel.map((x) => x / sum);
};
