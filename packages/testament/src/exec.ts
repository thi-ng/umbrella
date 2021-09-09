import type { TestResult } from ".";
import type { Test } from "./api";
import { now, timeDiff } from "./utils";

const TESTS: Test[] = [];

/**
 * Adds given test to registration queue for later execution via
 * {@link execute}.
 *
 * @param test
 */
export const register = (test: Test) => {
    TESTS.push(test);
};

/**
 * Synchronously executes all registered tests (e.g. via {@link group}),
 * collects and returns promise of their results.
 *
 * @remarks
 * Even though this is an async functions, all tests/tasks will be executed
 * synchronously, in their order of registration. See {@link register}.
 *
 * Unless `total` is false, an additional result will be added to the collected
 * ones, stating the total time taken to run all tests/tasks.
 *
 * @param total
 */
export const execute = async (total = true) => {
    let results: TestResult[] = [];
    const t0 = now();
    while (TESTS.length) {
        results = results.concat(await TESTS.shift()!());
    }
    total &&
        results.push({ title: "Total", time: timeDiff(t0, now()), trials: 1 });
    return results;
};
