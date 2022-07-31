import type { Fn2, FnN, NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { MultiCA1D } from "./1d.js";

export type Target = "cells" | "mask" | "prob";

export type Kernel = NumericArray[];

export interface CAConfig1D {
	/**
	 * Same as {@link CASpec1D.kernel}.
	 */
	kernel: Kernel;
	/**
	 * Weight factors for each kernel offset. If {@link CASpec1D.positional} is
	 * true, these weights will all be `1 << i` where `i` is the index of each
	 * kernel offset vector. If `positional` is false, all weights will be set
	 * to 1.
	 */
	weights: bigint[];
	/**
	 * Same as {@link CASpec1D.rule}, but always a bigint.
	 */
	rule: bigint;
	/**
	 * Same as {@link CASpec1D.states}.
	 */
	states: number;
	/**
	 * Cell state update function/behavior. Takes a current cell state, returns
	 * new one.
	 */
	fn: FnN;
}

export interface CASpec1D {
	/**
	 * Array of 2D offset vectors `[x, y]` defining the automata's neighborhood.
	 * `x` coordinates are horizontal offsets and positive `y` coordinates are
	 * used to refer to previous generations (e.g. 0 = current gen, 1 = T-1, 2 =
	 * T-2 etc.) and thereby providing a form of short term memory for that
	 * specific automata. Negative `y` coords will lead to cells being ignored.
	 *
	 * Unless {@link CASpec1D.positional} is false (default: true), the order of
	 * offsets _is_ important: Whenever the offset relates to a non-zero cell in the
	 * neighborhood, it will contribute a specific bit value to encode the
	 * overall state of the neighborhood, i.e. 2^k, where `k` is the array index
	 * of the corresponding kernel offset.
	 */
	kernel: Kernel;
	/**
	 * If false (default: true), the order of kernel offsets is irrelevant and
	 * only the count of non-zero cells in the neighborhood is used to check a
	 * relevant bit in the `rule` ID. E.g. if count = 3, then the 3rd LSB will
	 * be checked.
	 */
	positional?: boolean;
	/**
	 * CA replication rules encoded as bigint. The overall magnitude of these
	 * rule IDs depends on the size of the neighborhood kernel and will be 2^n
	 * bits, where `n` is the kernel size. E.g. A 5-neighborhood will offer 2^32
	 * = 4 billion possibilities. A 7-neighborhood corresponds to a 2^7 = 128
	 * bit large rule space (~10^38 possibilities!).
	 */
	rule: bigint | number | string;
	/**
	 * Max number of cell states (aka cell age). Note: MUST be <= 256. For
	 * "standard" Wolfram automata, states = 2.
	 */
	states: number;
	/**
	 * If true (default), cells will reset to zero once their max. age has been
	 * reached. Should be set to `false` for "standard" 2-state Wolfram
	 * automata.
	 */
	reset?: boolean;
}

export interface UpdateBufferOpts {
	/**
	 * Per-generation perturbance probability. Default: 0%
	 */
	perturb: number;
	/**
	 * Per-cell perturbance probability. Default: 5% (only used if `perturb >
	 * 0`)
	 */
	density: number;
}

export interface UpdateImageOpts1D {
	/**
	 * Per-generation perturbance options for cell states array
	 */
	cells: Partial<UpdateBufferOpts>;
	/**
	 * Per-generation perturbance options for cell mask array
	 */
	mask: Partial<UpdateBufferOpts>;
	/**
	 * Per-generation perturbance options for cell update probability array.
	 * Only used if {@link UpdateImageOpts1D.probabilistic} is true.
	 */
	prob: Partial<UpdateBufferOpts>;
	/**
	 * If true, each new generation will be updated via
	 * {@link MultiCA1D.updateProbabilistic} instead of
	 * {@link MultiCA1D.update}.
	 */
	probabilistic: boolean;
	/**
	 * PRNG instance to use for perturbance. Default:
	 * {@link @thi.ng/random#SYSTEM} aka `Math.random`.
	 */
	rnd: IRandom;
	/**
	 * User handler function called immediatedly after each update (computation
	 * of a new generation). The arguments passed are the {@link MultiCA1D}
	 * instance and pixel row index.
	 */
	onupdate: Fn2<MultiCA1D, number, void>;
}
