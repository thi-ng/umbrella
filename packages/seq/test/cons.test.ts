import { expect, test } from "bun:test";
import { cons } from "../src/index.js";

test("cons", () => {
	expect<any>(cons(1).first()).toBe(1);
	expect<any>(cons(1).next()).toBe(undefined);
	expect<any>(cons(1, cons(2)).next()!.first()).toBe(2);
	expect<any>(cons(1, cons(2)).next()!.next()).toBe(undefined);
});
