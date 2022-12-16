import type { FnU3, Nullable } from "@thi.ng/api";
import { equiv as _equiv } from "@thi.ng/equiv";
import type { ArrayDiff, DiffKeyMap, DiffMode, EditLog } from "./api.js";

let _cachedFP: Nullable<Int32Array>;
let _cachedPath: Nullable<Int32Array>;

let _cachedEPC: number[] = [];
let _cachedPathPos: number[] = [];

const cachedFP = (size: number) =>
	_cachedFP && _cachedFP.length >= size
		? _cachedFP
		: (_cachedFP = new Int32Array(size));

const cachedPath = (size: number) =>
	_cachedPath && _cachedPath.length >= size
		? _cachedPath
		: (_cachedPath = new Int32Array(size));

export const clearCache = () => {
	_cachedFP = _cachedPath = undefined;
	_cachedEPC.length = _cachedPathPos.length = 0;
};

const simpleDiff = <T>(
	state: ArrayDiff<T>,
	src: ArrayLike<T>,
	key: "adds" | "dels",
	logDir: number,
	mode: DiffMode
) => {
	const n = src.length;
	const linear = <EditLog<Number, T>>state.linear;
	state.distance = n;
	if (mode !== "only-distance") {
		for (let i = 0, j = 0; i < n; i++, j += 3) {
			linear[j] = logDir;
			linear[j + 1] = i;
			linear[j + 2] = src[i];
		}
		if (mode === "full") {
			const _state = <DiffKeyMap<T>>state[key];
			for (let i = 0; i < n; i++) {
				_state[i] = src[i];
			}
		}
	}
	return state;
};

/**
 * Based on "An O(NP) Sequence Comparison Algorithm"" by Wu, Manber, Myers and
 * Miller.
 *
 * @remarks
 * Various optimizations, fixes & refactorings. By default uses
 * [`equiv()`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html) for
 * equality checks.
 *
 * - https://publications.mpi-cbg.de/Wu_1990_6334.pdf
 * - http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf
 * - https://github.com/cubicdaiya/onp
 *
 * @param a - "old" array
 * @param b - "new" array
 * @param mode - result mode
 * @param equiv - equality predicate function
 */
export const diffArray = <T>(
	a: ArrayLike<T> | undefined | null,
	b: ArrayLike<T> | undefined | null,
	mode: DiffMode = "full",
	equiv = _equiv
) => {
	const state = <ArrayDiff<T>>{
		distance: 0,
		adds: {},
		dels: {},
		const: {},
		linear: [],
	};

	if (a === b || (a == null && b == null)) {
		return state;
	} else if (a == null || a.length === 0) {
		return simpleDiff(state, b!, "adds", 1, mode);
	} else if (b == null || b.length === 0) {
		return simpleDiff(state, a, "dels", -1, mode);
	}

	const reverse = a.length >= b.length;
	let _a: ArrayLike<T>, _b: ArrayLike<T>, na: number, nb: number;

	if (reverse) {
		_a = b;
		_b = a;
	} else {
		_a = a;
		_b = b;
	}
	na = _a.length;
	nb = _b.length;

	const offset = na + 1;
	const delta = nb - na;
	const doff = delta + offset;
	const size = na + nb + 3;
	const path = cachedPath(size).fill(-1, 0, size);
	const fp = cachedFP(size).fill(-1, 0, size);
	const epc = _cachedEPC;
	const pathPos = _cachedPathPos;

	const snake: FnU3<number, void> = (k, p, pp) => {
		let r: number, y: number;
		if (p > pp) {
			r = path[k - 1];
			y = p;
		} else {
			r = path[k + 1];
			y = pp;
		}
		let x = y - (k - offset);
		while (x < na && y < nb && equiv(_a[x], _b[y])) {
			x++;
			y++;
		}
		path[k] = pathPos.length / 3;
		pathPos.push(x, y, r);
		fp[k] = y;
	};

	let p = -1;
	let k: number;
	do {
		p++;
		for (k = -p + offset; k < doff; k++) {
			snake(k, fp[k - 1] + 1, fp[k + 1]);
		}
		for (k = doff + p; k > doff; k--) {
			snake(k, fp[k - 1] + 1, fp[k + 1]);
		}
		snake(doff, fp[doff - 1] + 1, fp[doff + 1]);
	} while (fp[doff] !== nb);

	state.distance = delta + 2 * p;

	if (mode !== "only-distance") {
		p = path[doff] * 3;
		while (p >= 0) {
			epc.push(p);
			p = pathPos[p + 2] * 3;
		}

		if (mode === "full") {
			buildFullLog<T>(epc, pathPos, state, _a, _b, reverse);
		} else {
			buildLinearLog<T>(
				epc,
				pathPos,
				state,
				_a,
				_b,
				reverse,
				mode === "only-distance-linear"
			);
		}
	}
	epc.length = 0;
	pathPos.length = 0;
	return state;
};

const buildFullLog = <T>(
	epc: any[],
	pathPos: any[],
	state: ArrayDiff<T>,
	a: ArrayLike<T>,
	b: ArrayLike<T>,
	reverse: boolean
) => {
	const linear = <EditLog<Number, T>>state.linear;
	const _const = <DiffKeyMap<T>>state.const;
	let i = epc.length;
	let px = 0;
	let py = 0;
	let adds: DiffKeyMap<T>;
	let dels: DiffKeyMap<T>;
	let aID: number;
	let dID: number;
	if (reverse) {
		adds = <DiffKeyMap<T>>state.dels;
		dels = <DiffKeyMap<T>>state.adds;
		aID = -1;
		dID = 1;
	} else {
		adds = <DiffKeyMap<T>>state.adds;
		dels = <DiffKeyMap<T>>state.dels;
		aID = 1;
		dID = -1;
	}
	for (; i-- > 0; ) {
		const e = epc[i];
		const ppx = pathPos[e];
		const ppy = pathPos[e + 1];
		const d = ppy - ppx;
		while (px < ppx || py < ppy) {
			const dp = py - px;
			if (d > dp) {
				linear.push(aID, py, (adds[py] = b[py]));
				py++;
			} else if (d < dp) {
				linear.push(dID, px, (dels[px] = a[px]));
				px++;
			} else {
				linear.push(0, px, (_const[px] = a[px]));
				px++;
				py++;
			}
		}
	}
};

const buildLinearLog = <T>(
	epc: any[],
	pathPos: any[],
	state: ArrayDiff<T>,
	a: ArrayLike<T>,
	b: ArrayLike<T>,
	reverse: boolean,
	inclConst: boolean
) => {
	const linear = <EditLog<number, T>>state.linear;
	const aID = reverse ? -1 : 1;
	const dID = reverse ? 1 : -1;
	let i = epc.length,
		px = 0,
		py = 0;
	for (; i-- > 0; ) {
		const e = epc[i];
		const ppx = pathPos[e];
		const ppy = pathPos[e + 1];
		const d = ppy - ppx;
		while (px < ppx || py < ppy) {
			const dp = py - px;
			if (d > dp) {
				linear.push(aID, py, b[py]);
				py++;
			} else if (d < dp) {
				linear.push(dID, px, a[px]);
				px++;
			} else {
				inclConst && linear.push(0, px, a[px]);
				px++;
				py++;
			}
		}
	}
};
