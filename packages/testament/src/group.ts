import {
	Fn,
	GLOBAL_OPTS,
	GroupOpts,
	LifecycleCtx,
	TestCtx,
	TestResult,
} from "./api.js";
import { register } from "./exec.js";
import { test } from "./test.js";

/**
 * Registers a new group of test cases specified in given `tests` object. The
 * tests are NOT executed immediately until {@link execute} is being called
 * (done automatically when using the CLI wrapper). All tests within this group
 * will share the (optionally) provided configuration options (which themselves
 * will be stubbed using {@link GLOBAL_OPTS}).
 *
 * @remarks
 * If a test is async, use the passed {@link TestCtx} handlers (esp.
 * {@link TestCtx.done} and {@link TestCtx.setTimeout}) to ensure timeouts and
 * any errors or test failures are handled properly.
 *
 * If a test case function makes use of the {@link TestCtx} arg in any capacity,
 * it MUST call {@link TestCtx.done}, since testament assumes it is an async
 * case.
 *
 * Any uncaught errors thrown in the group's {@link LifecycleHandlers} will not
 * be caught by the {@link group} wrapper. Furthermore, if
 * {@link GroupOpts.exit} is true, these uncaught errors will cause the entire
 * process to terminate (unless running a browser).
 *
 * @example
 * ```ts
 * group(
 *   "basics",
 *   {
 *     add: () => { assert(1 + 1 === 2); },
 *     sub: ({ done, setTimeout }) => {
 *       setTimeout(() => { assert(3 - 1 === 1); done(); }, 50);
 *     }
 *   },
 *   {
 *     maxTries: 3,
 *     timeOut: 100,
 *     beforeEach: ({ logger }) => logger.info("before"),
 *     afterEach: ({ logger }) => logger.info("after"),
 *   }
 * );
 * ```
 *
 * @param title -
 * @param tests -
 * @param opts -
 */
export const group = (
	title: string,
	tests: Record<string, Fn<TestCtx, void>>,
	opts: Partial<GroupOpts> = {}
) => {
	const { logger, stop, exit, before, after, beforeEach, afterEach } = {
		...GLOBAL_OPTS,
		...opts,
	};
	const ctx: LifecycleCtx = {
		logger,
	};
	register(async () => {
		let results: TestResult[] = [];
		try {
			logger.info("────────────────────");
			logger.info(title);
			logger.info("────────────────────");
			if (before) {
				await before(ctx);
			}
			for (let k in tests) {
				if (beforeEach) {
					await beforeEach(ctx);
				}
				const res = await test(k, tests[k], opts)();
				results.push({ group: title, ...res });
				if (afterEach) {
					await afterEach(ctx);
				}
				if (res.error && stop) {
					throw res.error;
				}
			}
			if (after) {
				await after(ctx);
			}
			logger.info();
			return results;
		} catch (e) {
			if (exit !== false) {
				logger.warn((<Error>e).message);
				typeof process !== "undefined" &&
					typeof process.exit !== "undefined" &&
					process.exit(1);
				return [];
			} else {
				throw e;
			}
		}
	});
};
