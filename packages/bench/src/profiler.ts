import type { FnAny, IDeref, IEnable, IObjectOf, IReset } from "@thi.ng/api";
import type { Timestamp } from "./api.js";
import { benchResult } from "./bench.js";
import { asMillis, now } from "./now.js";

interface Profile {
	t0: Timestamp[];
	total: Timestamp;
	calls: number;
	maxDepth: number;
}

export interface ProfileResult {
	/**
	 * User provided profile name/ID
	 */
	id: string;
	/**
	 * Number of calls recorded
	 */
	calls: number;
	/**
	 * Total number of milliseconds consumed by this profile (minus internal
	 * computed overhead)
	 */
	total: number;
	/**
	 * Mean number of milliseconds per call (aka `total / calls`)
	 */
	timePerCall: number;
	/**
	 * Percentage of this profile's time contribution to the profiled grand
	 * total (the grand total is _not_ wall clock time, but the sum of all
	 * profiles).
	 */
	totalPercent: number;
	/**
	 * Percentage of this profile's number of calls out of the profiled grand total.
	 */
	callsPercent: number;
	/**
	 * Max recorded recursion depth. See {@link Profiler.start} for example.
	 */
	maxDepth: number;
}

export interface ProfilerOpts {
	/**
	 * Number of warmup iterations to compute the profiler's internal overhead.
	 *
	 * @defaultValue 1_000_000
	 */
	warmup: number;
	/**
	 * Unless set to false, the profiler will be enabled by default.
	 *
	 * @defaultValue true
	 */
	enabled: boolean;
}

export class Profiler
	implements IDeref<IObjectOf<ProfileResult>>, IEnable<Profiler>, IReset
{
	protected _session: Profile | undefined;
	protected _profiles!: IObjectOf<Profile>;
	protected _enabled!: boolean;
	protected _overhead = 0;

	constructor(opts: Partial<ProfilerOpts> = {}) {
		const { warmup = 1e6, enabled = true } = opts;
		this.enable();
		if (warmup > 0) this.warmup(warmup);
		enabled ? this.reset() : this.disable();
	}

	isEnabled() {
		return this._enabled;
	}

	/**
	 * Disables profiler and clears all existing profiles.
	 *
	 * @remarks
	 * Calls to {@link Profiler.start} and {@link Profiler.end} only are no-ops
	 * if the profiler is currently disabled.
	 */
	disable() {
		if (this._enabled) {
			this._enabled = false;
			this.reset();
		}
	}

	/**
	 * Enables profiler and clears all existing profiles.
	 *
	 * @remarks
	 * Calls to {@link Profiler.start} and {@link Profiler.end} only are no-ops
	 * if the profiler is currently disabled.
	 */
	enable() {
		if (!this._enabled) {
			this._enabled = true;
			this.reset();
		}
	}

	/**
	 * Resets profiler state and clears all recorded profiles.
	 */
	reset() {
		this._profiles = {};
		this._session = undefined;
		return this;
	}

	/**
	 * Prepare and return all recorded profiles as object of
	 * {@link ProfileResult}s.
	 *
	 * @remarks
	 * Automatically computes and subtracts internal overhead from each
	 * profile's total (Overhead is computed during profiler ctor and/or
	 * {@link Profiler.warmup}).
	 *
	 * Also see {@link Profiler.asCSV} to obtain results in CSV format.
	 */
	deref() {
		const { _profiles, _session, _overhead } = this;
		if (!_session) return {};
		const res: IObjectOf<ProfileResult> = {};
		const sessionTotal =
			asMillis(_session.total) - _session.calls * _overhead;
		for (let id in _profiles) {
			const profile = _profiles[id];
			const total = asMillis(profile.total) - profile.calls * _overhead;
			const totalPercent = (total / sessionTotal) * 100;
			const callsPercent = (profile.calls / _session.calls) * 100;
			res[id] = {
				id,
				total: total,
				timePerCall: total / profile.calls,
				totalPercent,
				calls: profile.calls,
				callsPercent,
				maxDepth: profile.maxDepth,
			};
		}
		return res;
	}

	/**
	 * Start a new profile (or add to an existing ID) by recording current
	 * timestamp (via {@link now}), number of calls (to this method and for this
	 * ID), as well as max. recursion depth. Use {@link Profiler.end} to
	 * stop/update measurements.
	 *
	 * @remarks
	 * Profiling only happens if the profiler is currently enabled, else a
	 * no-op.
	 *
	 * * @example
	 * ```ts
	 * const profiler = new Profiler();
	 *
	 * // recursive function
	 * const countdown = (n, acc = []) => {
	 *   profiler.start("countdown");
	 *   if (n > 0) countdown(n - 1, (acc.push(n),acc));
	 *   profiler.end("countdown");
	 *   return acc;
	 * }
	 *
	 * countdown(10);
	 * // [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
	 *
	 * countdown(5);
	 * // [ 5, 4, 3, 2, 1 ]
	 *
	 * profiler.deref()
	 * // {
	 * //   countdown: {
	 * //     id: 'countdown',
	 * //     total: 0.029665688286,
	 * //     timePerCall: 0.0017450404874117648,
	 * //     totalPercent: 96.0872831622525,
	 * //     calls: 17,
	 * //     callsPercent: 100,
	 * //     maxDepth: 11
	 * //   }
	 * // }
	 * ```
	 *
	 * @param id
	 */
	start(id: string) {
		if (!this._enabled) return;
		let profile = this._profiles[id];
		const t0 = now();
		if (!profile) {
			this._profiles[id] = this.newProfile(t0);
		} else {
			profile.maxDepth = Math.max(profile.t0.push(t0), profile.maxDepth);
			profile.calls++;
		}
		if (!this._session) {
			this._session = this.newProfile(t0);
		} else {
			this._session.calls++;
		}
	}

	/**
	 * Ends/updates measurements for given profile ID. Throws error if `id` is
	 * invalid or if no active profiling iteration exists for this ID (e.g. if
	 * this method is called more often than a corresponding
	 * {@link Profiler.start}).
	 *
	 * @remarks
	 * Profiling only happens if the profiler is currently enabled, else a
	 * no-op.
	 *
	 * @param id
	 */
	end(id: string) {
		if (!this._enabled) return;
		const t = now();
		const profile = this._profiles[id];
		if (!profile) throw new Error(`invalid profile ID: ${id}`);
		const t1 = profile.t0.pop()!;
		if (t1 === undefined)
			throw new Error(`no active profile for ID: ${id}`);
		if (!profile.t0.length) {
			// @ts-ignore num/bigint
			profile.total += t - t1;
			// @ts-ignore num/bigint
			this._session!.total += t - t1;
		}
	}

	/**
	 * Takes a profile `id`, function `fn` and any (optional) arguments. Calls
	 * `fn` with given args and profiles it using provided ID. Returns result
	 * of `fn`.
	 *
	 * @remarks
	 * Also see {@link Profiler.wrap}
	 *
	 * @param id
	 * @param fn
	 */
	profile<T>(id: string, fn: FnAny<T>, ...args: any[]) {
		this.start(id);
		const res = fn.apply(null, args);
		this.end(id);
		return res;
	}

	/**
	 * Higher-order version of {@link Profiler.profile}. Takes a profile `id`
	 * and vararg function `fn`. Returns new function which when called, calls
	 * given `fn` and profiles it using provided `id`, then returns result of
	 * `fn`.
	 *
	 * @example
	 * ```ts
	 * const sum = profiler.wrap(
	 *   "sum",
	 *   (vec: number[]) => vec.reduce((acc, x) => acc + x, 0)
	 * );
	 *
	 * sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	 * // 55
	 *
	 * profiler.deref()
	 * // {
	 * //   sum: {
	 * //     id: 'sum',
	 * //     total: 0.015644915291,
	 * //     timePerCall: 0.015644915291,
	 * //     totalPercent: 100,
	 * //     calls: 1,
	 * //     callsPercent: 100,
	 * //     maxDepth: 1
	 * //   }
	 * // }
	 * ```
	 *
	 * @param id
	 * @param fn
	 */
	wrap<T>(id: string, fn: FnAny<T>) {
		return (...args: any[]) => {
			this.start(id);
			const res = fn.apply(null, args);
			this.end(id);
			return res;
		};
	}

	/**
	 * Estimates the internal overhead of the {@link Profiler.start} and
	 * {@link Profiler.end} methods by performing given number of `iter`ations
	 * (distributed over 10 runs) and taking the mean duration of those runs.
	 *
	 * @remarks
	 * The computed overhead (per iteration) will be subtracted from the all
	 * recorded profiles (see {@link Profiler.deref} and
	 * {@link Profiler.asCSV}).
	 *
	 * @param iter
	 */
	warmup(iter: number) {
		let total = 0;
		for (let i = 0; i < 10; i++) {
			const id = `prof-${i}`;
			const [_, taken] = benchResult(() => {
				this.start(id);
				this.end(id);
			}, ~~(iter / 10));
			total += taken;
		}
		this._overhead = total / iter;
	}

	/**
	 * Same as {@link Profiler.deref}.
	 */
	toJSON() {
		return this.deref();
	}

	/**
	 * Returns {@link Profiler.deref} formatted as CSV string.
	 */
	asCSV() {
		const res: string[] = [
			`"id","total (ms)","time/call (ms)","total (%)","calls","calls (%)","max depth"`,
		];
		const stats = this.deref();
		for (let id of Object.keys(stats).sort()) {
			const {
				total,
				timePerCall,
				totalPercent,
				calls,
				callsPercent,
				maxDepth,
			} = stats[id];
			res.push(
				[
					`"${id}"`,
					total.toFixed(5),
					timePerCall.toFixed(5),
					totalPercent.toFixed(2),
					calls,
					callsPercent.toFixed(2),
					maxDepth,
				].join(",")
			);
		}
		return res.join("\n");
	}

	protected newProfile(t0: Timestamp) {
		return {
			t0: [t0],
			total: typeof t0 === "bigint" ? BigInt(0) : 0,
			calls: 1,
			maxDepth: 1,
		};
	}
}
