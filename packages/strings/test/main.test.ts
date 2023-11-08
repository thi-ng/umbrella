import { expect, test } from "bun:test";
import * as str from "../src/index.js";

test("padLeft", () => {
	expect(str.padLeft(4)(undefined)).toBe("    ");
	expect(str.padLeft(4, "0")(null)).toBe("0000");
	expect(str.padLeft(4)(1)).toBe("   1");
	expect(str.padLeft(4)(12)).toBe("  12");
	expect(str.padLeft(4)(123)).toBe(" 123");
	expect(str.padLeft(4)(1234)).toBe("1234");
	expect(str.padLeft(4)(12345)).toBe("12345");
	expect(str.padLeft(5)).toBe(str.padLeft(5));
});

test("padRight", () => {
	expect(str.padRight(4)(undefined)).toBe("    ");
	expect(str.padRight(4, "0")(null)).toBe("0000");
	expect(str.padRight(4)(1)).toBe("1   ");
	expect(str.padRight(4)(12)).toBe("12  ");
	expect(str.padRight(4)(123)).toBe("123 ");
	expect(str.padRight(4)(1234)).toBe("1234");
	expect(str.padRight(4)(12345)).toBe("12345");
	expect(str.padRight(5)).toBe(str.padRight(5));
});
