import { expect, test } from "bun:test";
import {
	exists,
	getIn,
	getInUnsafe,
	mutIn,
	setIn,
	setInUnsafe,
} from "../src/index.js";

test("getIn", () => {
	const src: any = { a: { b: { c: [23, { d: 42 }] } } };
	expect(getInUnsafe(src, "a")).toEqual(src.a);
	expect(getInUnsafe(src, "a.b")).toEqual(src.a.b);
	expect(getInUnsafe(src, "a.b.c")).toEqual(src.a.b.c);
	expect(getInUnsafe(src, "a.b.c.d")).toEqual(undefined);
	expect(getInUnsafe(src, "a.b.c.0")).toEqual(<any>23); // ???
	expect(getInUnsafe(src, "a.b.c.1")).toEqual(src.a.b.c[1]);
	expect(getInUnsafe(src, "a.b.c.1.d")).toEqual(src.a.b.c[1].d);
});

test("getIn (emtpy leaves)", () => {
	expect(getIn(0, [])).toBe(0);
	expect(getIn("", [0])).toBeUndefined();
	expect(getIn("", ["length"])).toBe(0);
	expect(getIn([""], [0])).toBe("");
	expect(getInUnsafe([""], [0, "length"])).toBe(<any>0);
	expect(getIn([[""]], [0, 0, "length"])).toBe(0);
	expect(getIn([[[""]]], [0, 0, 0, "length"])).toBe(0);
	expect(getIn([[[[""]]]], [0, 0, 0, 0, "length"])).toBe(0);
});

test("setIn (len = 0)", () => {
	expect(setInUnsafe({ a: { b: { c: 23 } } }, "", 1)).toBe(1);
	expect(setInUnsafe({ a: { b: { c: 23 } } }, [], 1)).toBe(1);
	expect(setInUnsafe(null, [], 1)).toBe(1);
});

test("setIn (len = 1)", () => {
	expect(setIn({ a: 23 }, <const>["a"], 24)).toEqual({
		a: 24,
	});
	expect(setInUnsafe({ a: { b: { c: 23 } } }, ["d"], 24)).toEqual({
		a: { b: { c: 23 } },
		d: 24,
	});
	expect(setInUnsafe({ x: 23 }, "a", 24)).toEqual({
		x: 23,
		a: 24,
	});
	expect(setInUnsafe(null, "a", 24)).toEqual({ a: 24 });
});

test("setIn (len = 2)", () => {
	expect(setIn({ a: { b: 23 } }, <const>["a", "b"], 24)).toEqual({
		a: { b: 24 },
	});
	expect(setInUnsafe({ a: { b: { c: 23 } } }, "a.d", 24)).toEqual({
		a: { b: { c: 23 }, d: 24 },
	});
	expect(setInUnsafe({ x: 23 }, "a.b", 24)).toEqual({
		x: 23,
		a: { b: 24 },
	});
	expect(setInUnsafe(null, "a.b", 24)).toEqual({ a: { b: 24 } });
});

test("setIn (len = 3)", () => {
	expect(setIn({ a: { b: { c: 23 } } }, <const>["a", "b", "c"], 24)).toEqual({
		a: { b: { c: 24 } },
	});
	expect(setInUnsafe({ a: { b: { c: 23 } } }, "a.b.d", 24)).toEqual({
		a: { b: { c: 23, d: 24 } },
	});
	expect(setInUnsafe({ x: 23 }, "a.b.c", 24)).toEqual({
		x: 23,
		a: { b: { c: 24 } },
	});
	expect(setInUnsafe(null, "a.b.c", 24)).toEqual({
		a: { b: { c: 24 } },
	});
});

test("setIn (len = 4)", () => {
	expect(
		setIn({ a: { b: { c: { d: 23 } } } }, <const>["a", "b", "c", "d"], 24)
	).toEqual({
		a: { b: { c: { d: 24 } } },
	});
	expect(setInUnsafe({ a: { b: { c: 23 } } }, "a.b.d.e", 24)).toEqual({
		a: { b: { c: 23, d: { e: 24 } } },
	});
	expect(setInUnsafe({ x: 23 }, "a.b.c.d", 24)).toEqual({
		x: 23,
		a: { b: { c: { d: 24 } } },
	});
	expect(setInUnsafe(null, "a.b.c.d", 24)).toEqual({
		a: { b: { c: { d: 24 } } },
	});
});

test("setIn (len = 5)", () => {
	expect(
		setIn(
			{ a: { b: { c: { d: { e: 23 } } } } },
			<const>["a", "b", "c", "d", "e"],
			24
		)
	).toEqual({ a: { b: { c: { d: { e: 24 } } } } });
	expect(setInUnsafe({ a: { b: { c: 23 } } }, "a.b.d.e.f", 24)).toEqual({
		a: { b: { c: 23, d: { e: { f: 24 } } } },
	});
	expect(setInUnsafe({ x: 23 }, "a.b.c.d.e", 24)).toEqual({
		x: 23,
		a: { b: { c: { d: { e: 24 } } } },
	});
	expect(setInUnsafe(null, "a.b.c.d.e", 24)).toEqual({
		a: { b: { c: { d: { e: 24 } } } },
	});
});

test("setIn arr", () => {
	expect(setIn([1, 2], [0], 10)).toEqual([10, 2]);
	expect(setIn(<any[]>[[1, 2], 3], [0, 1], 10)).toEqual([[1, 10], 3]);
	expect(setInUnsafe([[1, 2, 3], 4], [0, 1, 2], 10)).toEqual([
		[1, { 2: 10 }, 3],
		4,
	]);
	expect(setInUnsafe([[1, 2, 3], 4], [0, 1, 2, "a"], 10)).toEqual([
		[1, { 2: { a: 10 } }, 3],
		4,
	]);
	expect(setInUnsafe([[1, 2, 3], 4], [0, 1, 2, "a", "b"], 10)).toEqual([
		[1, { 2: { a: { b: 10 } } }, 3],
		4,
	]);
});

test("immutable", () => {
	const a = { x: { y: { z: 1 } }, u: { v: 2 } };
	const b = setInUnsafe(a, "a.b.c", 3);
	expect(b).toEqual({
		x: { y: { z: 1 } },
		u: { v: 2 },
		a: { b: { c: 3 } },
	});
	expect(a).toEqual({ x: { y: { z: 1 } }, u: { v: 2 } });
	expect(a.x === b.x).toBeTrue();
	expect(a.x.y === b.x.y).toBeTrue();
	expect(a.u === b.u).toBeTrue();
});

test("exists", () => {
	const a: any = { a: { b: null } };
	const b: any = { x: { y: { z: [1, 2, { u: 3, v: undefined }] } } };
	expect(exists(null, "x.y.z")).toBeFalse();
	expect(exists(0, "x.y.z")).toBeFalse();
	expect(exists("", "length")).toBeTrue();
	expect(exists(a, "a.b")).toBeTrue();
	expect(exists(a, "a.b.c")).toBeFalse();
	expect(exists(b, "x")).toBeTrue();
	expect(exists(b, "x.y.z")).toBeTrue();
	expect(exists(b, "x.y.z.2.u")).toBeTrue();
	expect(exists(b, "x.y.z.2.v")).toBeTrue();
	expect(exists(b, "x.y.z.3")).toBeFalse();
	expect(exists(b, "x.y.z.3.u")).toBeFalse();
	expect(exists(b, "x.z.y.2.u")).toBeFalse();
});

test("mutIn", () => {
	const a: any = {};
	expect(() => mutIn(a, ["__proto__", "polluted"], true)).toThrow();
	expect(() => mutIn(a, <any>[["__proto__"], "polluted"], true)).toThrow();
	expect(() => mutIn(a, <any>[[["__proto__"]], "polluted"], true)).toThrow();
});
