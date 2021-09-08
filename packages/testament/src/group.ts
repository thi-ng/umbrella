import { Fn, GLOBAL_OPTS, GroupOpts, TestCtx, TestResult } from "./api";
import { LOGGER } from "./logger";
import { registerTask } from "./task";
import { test } from "./test";

/**
 * Registers a new group of test cases specified in given `tests` object. The
 * tests are NOT executed immediately until {@link executeTasks} is being called
 * (done automatically when using CLI wrapper). All tests within this group will
 * share the (optionally) provided configuration options.
 *
 * @remarks
 * If a test is async, use the passed `done` and `setTimeout` handlers.
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
    const { logger, stop, beforeEach, afterEach } = {
        logger: LOGGER,
        ...GLOBAL_OPTS,
        ...opts,
    };
    registerTask(async () => {
        let results: TestResult[] = [];
        try {
            logger.info("----------");
            logger.info(title);
            logger.info("----------");
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
            if (opts.exit !== false) {
                logger.warn((<Error>e).message);
                process.exit(1);
            } else {
                throw e;
            }
        }
    });
};
