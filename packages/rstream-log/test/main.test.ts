import { LogLevel } from "@thi.ng/logger";
import { State, type ISubscriber } from "@thi.ng/rstream";
import { expect, test } from "bun:test";
import { Logger, formatString } from "../src/index.js";

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

test("all", () => {
	const logger = new Logger("foo", LogLevel.FINE);
	const acc: string[] = [];
	const sub = logger.stream
		.transform(formatString(counter()))
		.subscribe(collect(acc));
	logger.fine("hello");
	logger.debug("hello");
	logger.info("hello");
	logger.warn("hello");
	logger.severe("hello", 42, [{ a: [23] }]);
	expect(acc).toEqual([
		"[FINE] foo: 1 hello",
		"[DEBUG] foo: 2 hello",
		"[INFO] foo: 3 hello",
		"[WARN] foo: 4 hello",
		`[SEVERE] foo: 5 hello 42 [{"a":[23]}]`,
	]);
	sub.unsubscribe();
	expect(logger.stream.getState()).toBe(State.ACTIVE);
});
