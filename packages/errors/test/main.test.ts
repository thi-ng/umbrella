import { expect, test } from "bun:test";
import { illegalArgs, type CustomError } from "../src/index.js";

test("nested", () => {
	const foo = () => {
		try {
			illegalArgs("inner");
		} catch (e) {
			illegalArgs(`outer(${(<CustomError>e).origMessage})`);
		}
	};
	try {
		foo();
	} catch (e) {
		expect((<CustomError>e).origMessage).toBe("outer(inner)");
		expect((<Error>e).message).toBe("illegal argument(s): outer(inner)");
	}
});
