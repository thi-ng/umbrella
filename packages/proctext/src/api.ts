import type { Fn, MaybePromise } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";

export interface Var {
	opts: string[];
	history: string[];
}

export interface GeneratorContext {
	/**
	 * Object of variables and their possible expansions (value options).
	 */
	vars: Record<string, Var>;
	/**
	 * Object of modifier functions to transform.
	 */
	mods: Record<string, Fn<string, MaybePromise<string>>>;
	/**
	 * PRNG to use for selection variable options (see {@link Var.opts}).
	 */
	rnd: IRandom;
	/**
	 * Max number of choices to record per variable. When picking a possible
	 * value for resolving a variable, the generator attempts to pick values
	 * which are different than the last N choices.
	 *
	 * @defaultValue 1
	 */
	maxHist: number;
	/**
	 * Max attempts to find a new unique choice for variable
	 * expansions/resolution
	 *
	 * @defaultValue 10
	 */
	maxTrials: number;
}
