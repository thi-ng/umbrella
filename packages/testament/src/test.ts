import {
	Fn,
	Fn0,
	GLOBAL_OPTS,
	TestCtx,
	TestOpts,
	TestResult,
	Timestamp,
} from "./api.js";
import { now, timeDiff } from "./utils.js";

/**
 * Takes a single test case function `fn` and wraps it in an async executor
 * (configured via provided `opts`) and eventually yielding a {@link TestResult}
 * (regardless of any errors thrown in the user function).
 *
 * @remarks
 * If a test is async, use the passed {@link TestCtx} handlers to ensure
 * timeouts and any errors or test failures are handled properly:
 *
 * - done() - signals successful completion of the test
 * - setTimeout() - use in place of native function
 * - clearTimeout() - use in place of native function
 *
 * @example
 * ```ts
 * // test failure after multiple attempts
 * await test("foo", () => { throw new Error(23); }, { maxTrials: 3 })();
 * // [DEBUG ] retrying 'foo'...
 * // [DEBUG ] retrying 'foo'...
 * // [WARN  ] ✘ foo
 *
 * // {
 * //   title: 'foo',
 * //   error: Error: 23
 * //   time: 0,
 * //   trials: 3
 * // }
 *
 * // test would succeed, but takes longer than configured timeout
 * await test(
 *   "bar",
 *   ({ done, setTimeout }) => setTimeout(done, 1000),
 *   { timeOut: 10 }
 * )();
 * // [WARN  ] ✘ bar
 *
 * // {
 * //   title: 'bar',
 * //   error: Error: timeout
 * //   time: 12,
 * //   trials: 1
 * // }
 * ```
 *
 * @param title -
 * @param fn -
 * @param opts -
 */
export const test = (
	title: string,
	fn: Fn<TestCtx, void>,
	opts?: Partial<TestOpts>
): Fn0<Promise<TestResult>> => {
	let { fmt, logger, timeOut, maxTrials } = {
		...GLOBAL_OPTS,
		...opts,
	};

	return async () => {
		let tid: any;
		let userIds: any[] = [];
		let t0: Timestamp;
		let t1: Timestamp;
		let trials = 1;

		const clear = () => {
			if (tid != null) {
				clearTimeout(tid);
				tid = null;
			}
			if (userIds.length) {
				userIds.forEach((id) => clearTimeout(id));
				userIds.length = 0;
			}
		};

		const measure = () => t1 === -1 && (t1 = now());

		while (maxTrials!-- > 0) {
			t0 = t1 = -1;
			try {
				const p = new Promise<void>((resolve, reject) => {
					tid = setTimeout(
						() => reject(new Error("timeout")),
						timeOut
					);
					const ctx: TestCtx = {
						done: () => {
							measure();
							clear();
							resolve();
						},
						setTimeout: (f, delay) => {
							const id = setTimeout(() => {
								try {
									f();
								} catch (e) {
									clear();
									reject(e);
								}
							}, delay);
							userIds.push(id);
							return id;
						},
						clearTimeout: (id) => {
							const idx = userIds.indexOf(id);
							if (idx !== -1) {
								userIds.splice(idx, 1);
								clearTimeout(id);
							}
						},
						logger,
					};
					t0 = now();
					fn(ctx);
					if (!fn.length) ctx.done();
				}).catch((e) => {
					throw e;
				});
				await p;
				const taken = timeDiff(t0!, t1!);
				logger.info(
					fmt.success(title + (taken > 10 ? ` [${taken} ms]` : ""))
				);
				break;
			} catch (e) {
				clear();
				if (!maxTrials) {
					logger.warn(fmt.fail(title));
					return {
						title,
						error: <Error>e,
						time: timeDiff(t0!, now()),
						trials,
					};
				} else {
					logger.debug(fmt.retry(`retrying '${title}'...`));
					trials++;
				}
			}
		}
		return { title, time: timeDiff(t0!, t1!), trials };
	};
};
