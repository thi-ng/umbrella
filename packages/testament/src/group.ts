import { Fn, GLOBAL_OPTS, GroupOpts, TestCtx, TestResult } from "./api";
import { register } from "./exec";
import { test } from "./test";

/**
 * Registers a new group of test cases specified in given `tests` object. The
 * tests are NOT executed immediately until {@link execute} is being called
 * (done automatically when using the CLI wrapper). All tests within this group
 * will share the (optionally) provided configuration options (which themselves
 * will be stubbed using {@link GLOBAL_OPTS}).
 *
 * @remarks
 * If a test is async, use the passed {@link TestCtx} handlers to ensure
 * timeouts and any errors or test failures are handled properly.
 *
 * Any uncaught errors thrown in {@link GroupOpts.beforeEach} or
 * {@link GroupOpts.afterEach} handlers will not be caught by the {@link group}
 * either. Furthermore, if {@link GroupOpts.exit} is true, these uncaught errors
 * will cause the entire process to terminate.
 *
 * @example
 * ```ts
 * group(
 *   "basics",
 *   {
 *     add: () => { assert(1 + 1 === 2); }
 *     sub: ({ done, setTimeout }) => {
 *       setTimeout(() => { assert(3 - 1 === 1); done(); }, 50);
 *     }
 *   },
 *   {
 *     maxTries: 3,
 *     timeOut: 100
 *   }
 * );
 * ```
 *
 * @param title
 * @param tests
 * @param opts
 */
export const group = (
    title: string,
    tests: Record<string, Fn<TestCtx, void>>,
    opts: Partial<GroupOpts> = {}
) => {
    const { logger, stop, exit, beforeEach, afterEach } = {
        ...GLOBAL_OPTS,
        ...opts,
    };
    register(async () => {
        let results: TestResult[] = [];
        try {
            logger.info("────────────────────");
            logger.info(title);
            logger.info("────────────────────");
            for (let k in tests) {
                beforeEach && beforeEach();
                const res = await test(k, tests[k], opts)();
                results.push({ group: title, ...res });
                afterEach && afterEach();
                if (res.error && stop) {
                    throw res.error;
                }
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
