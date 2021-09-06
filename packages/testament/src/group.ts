import type { Fn, GroupOpts, TestCtx, TestResult } from "./api";
import { LOGGER } from "./logger";
import { test } from "./test";

export const group = async (
    title: string,
    tests: Record<string, Fn<TestCtx, void>>,
    opts: Partial<GroupOpts> = {}
) => {
    const { logger, stop, beforeEach, afterEach } = {
        logger: LOGGER,
        stop: true,
        ...opts,
    };
    let results: TestResult[] = [];
    try {
        logger.info("----------");
        logger.info(title);
        logger.info("----------");
        for (let k in tests) {
            beforeEach && beforeEach();
            const res = await test(k, tests[k], opts);
            results.push(res);
            afterEach && afterEach();
            if (res.error && stop) {
                throw res.error;
            }
        }
        return results;
    } catch (e) {
        if (opts.exit !== false) {
            logger.warn((<Error>e).message);
            process.exit(1);
        } else {
            throw e;
        }
    }
};
