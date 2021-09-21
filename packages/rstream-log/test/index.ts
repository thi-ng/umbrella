import { LogLevel } from "@thi.ng/logger";
import { ISubscriber, State } from "@thi.ng/rstream";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { formatString, Logger } from "../src";

const collect = (acc: string[]) => {
    return <ISubscriber<string>>{
        next(x) {
            acc.push(x);
        },
        result: acc,
    };
};

const counter = () => {
    let i = 0;
    return () => (i++, String(i));
};

group("rstream-log", {
    all: () => {
        const logger = new Logger("foo", LogLevel.FINE);
        const acc: string[] = [];
        const sub = logger
            .transform(formatString(counter()))
            .subscribe(collect(acc));
        logger.fine("hello");
        logger.debug("hello");
        logger.info("hello");
        logger.warn("hello");
        logger.severe("hello", 42, [{ a: [23] }]);
        assert.deepStrictEqual(acc, [
            "[FINE] foo: 1 hello",
            "[DEBUG] foo: 2 hello",
            "[INFO] foo: 3 hello",
            "[WARN] foo: 4 hello",
            `[SEVERE] foo: 5 hello 42 [{"a":[23]}]`,
        ]);
        sub.unsubscribe();
        assert.strictEqual(logger.getState(), State.ACTIVE);
    },
});
