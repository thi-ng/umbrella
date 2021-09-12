import { group, NULL_LOGGER, test, TestResult } from "@thi.ng/testament";
import * as assert from "assert";

let retryResult = 0;

group(
    "testament",
    {
        async: ({ done, setTimeout, clearTimeout }) => {
            let val = true;
            const id = setTimeout(() => (val = false), 10);
            setTimeout(() => {
                assert.ok(val);
                done();
            }, 20);
            clearTimeout(id);
        },

        timeout: ({ done, setTimeout }) => {
            let res: TestResult;
            test("fail", ({}) => {}, {
                timeOut: 5,
                logger: NULL_LOGGER,
            })().then((x) => (res = x));
            setTimeout(() => {
                assert.strictEqual(res.title, "fail");
                assert.ok(!!res.error);
                assert.strictEqual(res.error.message, "timeout");
                done();
            }, 10);
        },

        retry: () => {
            retryResult++;
            assert.strictEqual(retryResult, 3);
        },
    },
    {
        timeOut: 30,
        maxTrials: 3,
    }
);

let state = 0;

group(
    "testament lifecycle",
    {
        basic: () => {
            assert.strictEqual(state, 1);
            state = 2;
        },
    },
    {
        beforeEach: () => (state = 1),
        afterEach: () => assert.strictEqual(state, 2),
    }
);
