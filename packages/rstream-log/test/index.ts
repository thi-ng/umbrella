import { LogLevel } from "@thi.ng/api";
import { ISubscriber, State } from "@thi.ng/rstream";
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

describe("rstream-log", () => {
    it("all", () => {
        const logger = new Logger("foo", LogLevel.FINE);
        const acc: string[] = [];
        const sub = logger
            .transform(formatString(counter()))
            .subscribe(collect(acc));
        logger.fine("hello");
        logger.debug("hello");
        logger.info("hello");
        logger.warn("hello");
        logger.severe("hello");
        assert.deepStrictEqual(acc, [
            "[FINE] foo: 1 hello",
            "[DEBUG] foo: 2 hello",
            "[INFO] foo: 3 hello",
            "[WARN] foo: 4 hello",
            "[SEVERE] foo: 5 hello",
        ]);
        sub.unsubscribe();
        assert.strictEqual(logger.getState(), State.ACTIVE);
    });
});
