import { identity } from "@thi.ng/api";
import { ConsoleLogger } from "@thi.ng/logger";
import { expect, test } from "bun:test";
import {
	DEFAULT,
	defmulti,
	defmultiN,
	implementations,
	setLogger,
} from "../src/index.js";

test("flatten", () => {
	const flatten = defmulti<any[]>((x) => Object.prototype.toString.call(x));
	expect(
		flatten.add(
			"[object Array]",
			(x, acc: any[]) => (x.forEach((y: any) => flatten(y, acc)), acc)
		)
	).toBeTrue();
	expect(
		flatten.add("[object Object]", (x, acc: any[]) => {
			for (let k in x) flatten([k, x[k]], acc);
			return acc;
		})
	).toBeTrue();
	expect(flatten.add("[object Null]", (_, acc) => acc)).toBeTrue();
	expect(
		flatten.add(DEFAULT, (x, acc: any[]) => (acc.push(x.toString()), acc))
	).toBeTrue();

	expect(flatten([{ a: 1, b: ["foo", "bar", null, 42] }], [])).toEqual([
		"a",
		"1",
		"b",
		"foo",
		"bar",
		"42",
	]);
	expect(flatten.remove(DEFAULT)).toBeTrue();
	expect(flatten.remove(DEFAULT)).toBeFalse();
	expect(() =>
		flatten([{ a: 1, b: ["foo", "bar", null, 42] }], [])
	).toThrow();
});

test("sexpr", () => {
	const exec = defmulti<number>((x) => (Array.isArray(x) ? x[0] : typeof x));
	expect(
		exec.add("+", ([_, ...args]) =>
			args.reduce((acc: number, n: any) => acc + exec(n), 0)
		)
	).toBeTrue();
	expect(
		exec.add("*", ([_, ...args]) =>
			args.reduce((acc: number, n: any) => acc * exec(n), 1)
		)
	).toBeTrue();
	expect(exec.add("number", (x) => x)).toBeTrue();
	expect(
		exec.add(DEFAULT, (x) => {
			throw new Error(`invalid expr: ${x}`);
		})
	).toBeTrue();

	expect(exec(["+", ["*", 10, ["+", 1, 2, 3]], 6])).toBe(66);

	setLogger(new ConsoleLogger("defmulti"));
	expect(exec.add("number", (x) => x * 2)).toBeTrue();
	expect(exec(["+", ["*", 10, ["+", 1, 2, 3]], 6])).toBe(
		(1 * 2 + 2 * 2 + 3 * 2) * 10 * 2 + 6 * 2
	);

	expect(() => exec("")).toThrow();
});

test("apr", () => {
	const apr = defmulti<any, number>(
		({ type, balance }) =>
			`${type}-${balance < 1e4 ? "low" : balance < 5e4 ? "med" : "high"}`,
		{},
		{
			"current-low": ({ balance }) => balance * 0.005,
			"current-med": ({ balance }) => balance * 0.01,
			"current-high": ({ balance }) => balance * 0.01,
			"savings-low": ({ balance }) => balance * 0.01,
			"savings-med": ({ balance }) => balance * 0.025,
			"savings-high": ({ balance }) => balance * 0.035,
			[DEFAULT]: (x: any) => {
				throw new Error(`invalid account type: ${x.type}`);
			},
		}
	);

	expect(~~apr({ type: "current", balance: 5000 })).toBe(25);
	expect(~~apr({ type: "current", balance: 10000 })).toBe(100);
	expect(~~apr({ type: "current", balance: 50000 })).toBe(500);
	expect(~~apr({ type: "savings", balance: 5000 })).toBe(50);
	expect(~~apr({ type: "savings", balance: 10000 })).toBe(250);
	expect(~~apr({ type: "savings", balance: 100000 })).toBe(3500);
	expect(() => apr({ type: "isa", balance: 10000 })).toThrow();
});

test("defmultiN", () => {
	const foo = defmultiN({
		0: () => "zero",
		1: (x) => `one: ${x}`,
		3: (x, y, z) => `three: ${x}, ${y}, ${z}`,
	});

	expect(foo()).toBe("zero");
	expect(foo(23)).toBe("one: 23");
	expect(foo(1, 2, 3)).toBe("three: 1, 2, 3");
	expect(() => foo(1, 2)).toThrow();
});

test("isa", () => {
	const foo = defmulti((x) => x);
	foo.isa(23, "odd");
	foo.isa(42, "even");
	foo.isa("odd", "number");
	foo.isa("even", "number");
	foo.add("odd", () => "odd");
	foo.add("number", () => "number");
	expect(foo.parents(23)).toEqual(new Set(["odd"]));
	expect(foo.parents(42)).toEqual(new Set(["even"]));
	expect(foo.ancestors(23)).toEqual(new Set(["odd", "number"]));
	expect(foo.ancestors(42)).toEqual(new Set(["even", "number"]));
	expect(foo.rels()).toEqual({
		23: new Set(["odd"]),
		42: new Set(["even"]),
		odd: new Set(["number"]),
		even: new Set(["number"]),
	});
	expect(foo(23)).toBe("odd");
	expect(foo(42)).toBe("number");
	expect(foo.callable(23)).toBeTrue();
	expect(foo.callable(42)).toBeTrue();
	expect(foo.callable(66)).toBeFalse();
	expect(() => foo(66)).toThrow();
	foo.add(DEFAULT, (x) => -x);
	expect(foo(66)).toBe(-66);
	expect(new Set(foo.impls().keys())).toEqual(
		new Set([DEFAULT, "odd", "even", "number", "23", "42"])
	);

	const bar = defmulti(identity, {
		23: "odd",
		42: "even",
		odd: ["number"],
		even: new Set(["number"]),
	});
	expect(bar.rels()).toEqual({
		23: new Set(["odd"]),
		42: new Set(["even"]),
		odd: new Set(["number"]),
		even: new Set(["number"]),
	});
});

test("implementations", () => {
	const foo = defmulti((x) => x.id);
	const bar = defmulti((x) => x.id);

	implementations(
		"a",
		{},
		foo,
		(x) => `foo: ${x.val}`,
		bar,
		(x) => `bar: ${x.val.toUpperCase()}`
	);

	expect(foo({ id: "a", val: "alice" })).toBe("foo: alice");
	expect(bar({ id: "a", val: "alice" })).toBe("bar: ALICE");
});

test("dependencies", () => {
	const a = defmulti((x) => x);
	expect([...a.dependencies()]).toEqual([]);
	a.add("a", () => {});
	expect([...a.dependencies()]).toEqual([["a", undefined]]);
	a.add("d", () => {});
	a.isa("b", "a");
	a.isa("c", "b");
	a.isa("e", "b");
	expect(new Set([...a.dependencies()])).toEqual(
		new Set([
			["b", "a"],
			["c", "b"],
			["e", "b"],
			["a", undefined],
			["d", undefined],
		])
	);
});
