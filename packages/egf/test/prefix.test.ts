import { expect, test } from "bun:test";
import { parseString, qualifiedID, type ParseContext } from "../src/index.js";

const $ctx: Partial<ParseContext> = { opts: { prefixes: true } };

test("@prefix decl", () => {
	expect(() => parseString(`@prefix :`, $ctx)).toThrow();
	expect(() => parseString(`@prefix : `, $ctx)).toThrow();
	expect(() => parseString(`@prefix a&b: abc`, $ctx)).toThrow();
	expect(parseString(`@prefix : abc`, $ctx).prefixes[""]).toBe("abc");
	// prettier-ignore
	expect(parseString(`@prefix _:   abc`, $ctx).prefixes["_"]).toBe( "abc");
	// prettier-ignore
	expect(parseString(`@prefix $1a-b_C:   abc`, $ctx).prefixes["$1a-b_C"]).toBe( "abc");
});

test("qfn", () => {
	const qfn = (id: string) =>
		qualifiedID({ "": "self/", thi: "thi.ng/" }, id);
	expect(qfn(":a")).toBe("self/a");
	expect(qfn("thi:a")).toBe("thi.ng/a");
	expect(() => qfn("foo:a")).toThrow();
});

test("resolve w/ prefix", () => {
	const { nodes, prefixes } = parseString(
		`
@prefix : self/
@prefix thi: thi.ng/
:a
    partof -> thi:b

thi:b
    parentof -> :a
`,
		{ opts: { prefixes: true, resolve: true } }
	);
	expect(prefixes[""]).toBe("self/");
	expect(prefixes["thi"]).toBe("thi.ng/");
	expect(nodes["self/a"].partof.$id).toBe("thi.ng/b");
	expect(nodes["thi.ng/b"].parentof.$id).toBe("self/a");
});
