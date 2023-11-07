import { expect, test } from "bun:test";
import { splice } from "../src/index.js";

const SRC = "abc";

test("pos index", () => {
	expect(splice(SRC, "x", 0)).toBe("xabc");
	expect(splice(SRC, "x", 1)).toBe("axbc");
	expect(splice(SRC, "x", 2)).toBe("abxc");
	expect(splice(SRC, "x", 3)).toBe("abcx");
	expect(splice(SRC, "x", 4)).toBe("abcx");
});

test("neg index", () => {
	expect(splice(SRC, "x", -1)).toBe("abxc");
	expect(splice(SRC, "x", -2)).toBe("axbc");
	expect(splice(SRC, "x", -3)).toBe("xabc");
	expect(splice(SRC, "x", -4)).toBe("xabc");
});

test("w/ deletion", () => {
	expect(splice(SRC, "xx", 0, 1)).toBe("xxbc");
	expect(splice(SRC, "xx", 1, 2)).toBe("axxc");
	expect(splice(SRC, "xx", 2, 4)).toBe("abxx");
	expect(splice(SRC, "xx", -1, 4)).toBe("abxx");
	expect(splice(SRC, "xx", -2, 4)).toBe("axx");
	expect(splice(SRC, "xx", -3, 4)).toBe("xx");
	expect(splice(SRC, "xx", -3, 2)).toBe("xxc");
});
