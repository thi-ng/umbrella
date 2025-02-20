// SPDX-License-Identifier: Apache-2.0
import type { FloatArray, Fn0 } from "@thi.ng/api";
import { eqDelta } from "@thi.ng/math/eqdelta";
import { mix } from "@thi.ng/math/mix";
import { smoothStep } from "@thi.ng/math/step";
import { normal } from "@thi.ng/random/distributions/normal";
import { SYSTEM } from "@thi.ng/random/system";
import { repeatedly } from "@thi.ng/transducers";
import {
	distSq,
	divN,
	sub,
	zeroes,
	type DistanceFn,
	type ReadonlyVec,
	type VecOpVN,
	type VecOpVV,
} from "@thi.ng/vectors";
import type { TSNEOpts, TweenParam } from "./api.js";

const EPS = Number.EPSILON;

export const DEFAULT_OPTS: TSNEOpts = {
	rnd: SYSTEM,
	dist: distSq,
	perplexity: 10,
	rate: 100,
	eps: 1e-4,
	maxIter: 1000,
	searchIter: 50,
	minGain: 0.01,
	gainBias: 0.05,
	gainDecay: 0.95,
	momentum: {
		start: 0.5,
		end: 0.8,
		iter: 250,
	},
	gradientScale: {
		start: 2,
		end: 1,
		iter: 100,
	},
};

export class TSNE {
	opts: TSNEOpts;
	n!: number;
	dim!: number;
	iter = 0;

	p!: FloatArray;
	q!: FloatArray;
	qu!: FloatArray;
	points!: number[][];
	steps!: number[][];
	gains!: number[][];
	opDist!: DistanceFn;
	opDivN!: VecOpVN;
	opSub!: VecOpVV;

	constructor(points: ReadonlyVec[], opts: Partial<TSNEOpts> = {}) {
		this.opts = { ...DEFAULT_OPTS, ...opts };
		this.init(points);
	}

	init(points: ReadonlyVec[]) {
		const opts = this.opts;
		const n = (this.n = points.length);
		const dim = (this.dim = points[0].length);
		// pre-lookup size-optimized implementations of vector ops
		this.opDist = opts.dist === distSq ? distSq.impl(dim) : opts.dist;
		this.opDivN = divN.impl(dim);
		this.opSub = sub.impl(dim);
		this.p = initProbabilities(
			pairwiseDistances(points, this.opDist),
			n,
			opts.perplexity,
			opts.eps,
			opts.searchIter
		);
		this.points = initMatrix(n, dim, normal(opts.rnd, 0, opts.eps));
		this.steps = initMatrix(n, dim, () => 0);
		this.gains = initMatrix(n, dim, () => 1);
		this.q = new Float64Array(n * n);
		this.qu = new Float64Array(n * n);
		this.iter = 0;
	}

	update() {
		if (++this.iter >= this.opts.maxIter) return 0;
		const { n, dim, points, steps, gains, opDivN, opSub } = this;
		const {
			rate,
			minGain,
			momentum: $momentum,
			gainBias,
			gainDecay,
		} = this.opts;
		const { cost, gradient } = this.computeGradient();
		const momentum = tweenParam($momentum, this.iter);
		const ymean = zeroes(dim);
		let i: number, d: number;
		for (i = 0; i < n; i++) {
			const row = points[i];
			const rowStep = steps[i];
			const rowGrad = gradient[i];
			const rowGains = gains[i];
			for (d = 0; d < dim; d++) {
				let step = rowStep[d];
				const newGain = Math.max(
					minGain,
					Math.sign(rowGrad[d]) === Math.sign(step)
						? // rowGrad[d] * step < 0
						  rowGains[d] * gainDecay
						: rowGains[d] + gainBias
				);
				rowGains[d] = newGain;
				step = momentum * step - rate * newGain * rowGrad[d];
				rowStep[d] = step;
				row[d] += step;
				ymean[d] += row[d];
			}
		}
		opDivN(null, ymean, n);
		for (i = 0; i < n; i++) opSub(null, points[i], ymean);
		return cost;
	}

	computeGradient() {
		const { n, dim, points: y, p, q, qu, opDist } = this;
		let i: number, j: number, rowIdx: number, d: number;
		let rowI: number[], rowJ: number[];
		let qsum = 0;
		for (i = 0; i < n; i++) {
			rowIdx = i * n;
			rowI = y[i];
			for (j = i + 1; j < n; j++) {
				d = 1 / (1 + opDist(rowI, y[j]));
				qu[rowIdx + j] = d;
				qu[j * n + i] = d;
				qsum += 2 * d;
			}
		}
		qsum = 1 / qsum;
		for (i = n * n; i-- > 0; ) {
			q[i] = Math.max(qu[i] * qsum, EPS);
		}

		let cost = 0;
		const gradient: ReadonlyVec[] = new Array(n);
		const gscale = tweenParam(this.opts.gradientScale, this.iter);
		for (i = 0; i < n; i++) {
			rowIdx = i * n;
			rowI = y[i];
			const g = (gradient[i] = zeroes(dim));
			for (j = 0; j < n; j++) {
				rowJ = y[j];
				const ij = rowIdx + j;
				cost += -p[ij] * Math.log(q[ij]);
				const s = 4 * (gscale * p[ij] - q[ij]) * qu[ij];
				for (d = 0; d < dim; d++) {
					g[d] += s * (rowI[d] - rowJ[d]);
				}
			}
		}
		return { cost, gradient };
	}
}

const initMatrix = (m: number, n: number, data: Fn0<number>) => [
	...repeatedly(() => [...repeatedly(data, n)], m),
];

const pairwiseDistances = (points: ReadonlyVec[], distFn: DistanceFn) => {
	const n = points.length;
	const dist = new Float64Array(n * n);
	for (let i = 0; i < n; i++) {
		const rowIdx = i * n;
		const vi = points[i];
		for (let j = i + 1; j < n; j++) {
			dist[rowIdx + j] = dist[j * n + i] = distFn(vi, points[j]);
		}
	}
	return dist;
};

const initProbabilities = (
	distances: ReadonlyVec,
	n: number,
	perplexity: number,
	eps: number,
	iter: number
) => {
	const htarget = Math.log(perplexity);
	const p = new Float64Array(n * n);
	for (let i = 0; i < n; i++) {
		distProbRow(
			distances,
			p.subarray(i * n, i * n + n),
			n,
			i,
			iter,
			htarget,
			eps
		);
	}
	const res = new Float64Array(n * n);
	const invN2 = 1 / (n * 2);
	for (let i = 0; i < n; i++) {
		const ii = i * n;
		for (let j = 0; j < n; j++) {
			res[ii + j] = Math.max((p[ii + j] + p[j * n + i]) * invN2, EPS);
		}
	}
	return res;
};

const distProbRow = (
	distances: ReadonlyVec,
	row: Float64Array,
	n: number,
	i: number,
	iter: number,
	htarget: number,
	eps: number
) => {
	let beta = 1;
	let betaMin = -Infinity;
	let betaMax = Infinity;
	for (let k = 0; k < iter; k++) {
		const h = normalizeRow(row, n, rowEntropy(distances, row, n, i, beta));
		if (eqDelta(h, htarget, eps)) break;
		if (h > htarget) {
			betaMin = beta;
			beta = betaMax === Infinity ? beta * 2 : (beta + betaMax) / 2;
		} else {
			betaMax = beta;
			beta = betaMin === -Infinity ? beta / 2 : (beta + betaMin) / 2;
		}
	}
};

const rowEntropy = (
	distances: ReadonlyVec,
	row: FloatArray,
	n: number,
	i: number,
	beta: number
) => {
	const ii = i * n;
	let psum = 0;
	for (let j = 0; j < n; j++) {
		if (i !== j) {
			psum += row[j] = Math.exp(-distances[ii + j] * beta);
		} else {
			row[j] = 0;
		}
	}
	return psum;
};

const normalizeRow = (row: FloatArray, n: number, psum: number) => {
	let h = 0;
	if (psum != 0) {
		psum = 1 / psum;
		for (let i = 0; i < n; i++) {
			const p = (row[i] *= psum);
			if (p > 1e-7) h -= p * Math.log(p);
		}
	} else {
		row.fill(0);
	}
	return h;
};

const tweenParam = ({ start, end, iter }: TweenParam, t: number) =>
	mix(start, end, smoothStep(0, iter, t));
// mix(start, end, smootherStep(0, iter, t));
// t < iter ? start : end;
