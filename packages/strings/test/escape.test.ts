import { expect, test } from "bun:test";
import { escape, unescape } from "../src/index.js";

const SRC = "\ta\nb😎c£\\\x00";

test("escape", () => {
	expect(escape(SRC)).toBe("\\ta\\nb\\U0001f60ec\\u00a3\\\\\\0");
});

test("roundtrip", () => {
	expect(unescape(escape(SRC))).toBe(SRC);
});
