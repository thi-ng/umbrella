import { expect, test } from "bun:test";
import {
	defContext,
	defGrammar,
	join,
	lookahead,
	oneOf,
	string,
	stringD,
} from "../src/index.js";

test("oneof (no capture)", () => {
	const ctx = defContext("ababaaabbabba");
	expect(join(lookahead(oneOf("ab"), stringD("abba")))(ctx)).toBeTrue();
	expect(ctx.result).toBe("ababaa");
	expect(ctx.state).toEqual({
		p: 6,
		l: 1,
		c: 7,
		done: false,
		last: "a",
	});
	expect(string("abba")(ctx)).toBeTrue();
	expect(ctx.done).toBeFalse();
});

test("oneof (capture)", () => {
	const ctx = defContext("ababaaabbabba");
	expect(join(lookahead(oneOf("ab"), string("abba"), true))(ctx)).toBeTrue();
	expect(ctx.result).toBe("ababaaabba");
	expect(ctx.state).toEqual({
		p: 10,
		l: 1,
		c: 11,
		done: false,
		last: "a",
	});
	expect(string("bba")(ctx)).toBeTrue();
	expect(ctx.done).toBeTrue();
});

test("string (no capture)", () => {
	const ctx = defContext("abababbabba");
	expect(join(lookahead(string("ab"), stringD("abba")))(ctx)).toBeTrue();
	expect(ctx.result).toBe("abab");
	expect(ctx.state).toEqual({
		p: 4,
		l: 1,
		c: 5,
		done: false,
		last: "b",
	});
	expect(string("abba")(ctx)).toBeTrue();
	expect(ctx.done).toBeFalse();
});

test("string (capture)", () => {
	const ctx = defContext("abababbabba");
	expect(join(lookahead(string("ab"), string("abba"), true))(ctx)).toBeTrue();
	expect(ctx.result).toBe("abababba");
	expect(ctx.state).toEqual({
		p: 8,
		l: 1,
		c: 9,
		done: false,
		last: "a",
	});
	expect(string("bba")(ctx)).toBeTrue();
	expect(ctx.done).toBeTrue();
});

test("grammar (no capture)", () => {
	const ctx = defContext("ababaaabbabba");
	const lang = defGrammar(`foo: [ab](?-"abba"!) => join ;`);
	expect(lang).toBeDefined();
	expect(lang!.rules.foo(ctx)).toBeTrue();
	expect(ctx.result).toBe("ababaa");
	expect(ctx.state).toEqual({
		p: 6,
		l: 1,
		c: 7,
		done: false,
		last: "a",
	});
	expect(string("abba")(ctx)).toBeTrue();
	expect(ctx.done).toBeFalse();
});

test("grammar (capture)", () => {
	const ctx = defContext("ababaaabbabba");
	const lang = defGrammar(`foo: [ab](?+"abba") => join ;`);
	expect(lang).toBeDefined();
	expect(lang!.rules.foo(ctx)).toBeTrue();
	expect(ctx.result).toBe("ababaaabba");
	expect(ctx.state).toEqual({
		p: 10,
		l: 1,
		c: 11,
		done: false,
		last: "a",
	});
	expect(string("bba")(ctx)).toBeTrue();
	expect(ctx.done).toBeTrue();
});
