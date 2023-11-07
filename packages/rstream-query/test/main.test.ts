import { beforeEach, expect, test } from "bun:test";
import { TripleStore, type Triple, type TripleIds } from "../src/index.js";

const triples: Triple[] = [
	["a", "type", "foo"], // 0
	["b", "type", "bar"], // 1
	["c", "type", "baz"], // 2
	["a", "value", 0], // 3
	["b", "value", 1], // 4
	["c", "friend", "a"], // 5
];

let store: TripleStore;

beforeEach(() => {
	store = new TripleStore(triples);
});

test("pattern query (S)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery(["a", null, null], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([0, 3])]);
});

test("pattern query (P)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery([null, "type", null], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([0, 1, 2])]);
});

test("pattern query (O)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery([null, null, "a"], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([5])]);
});

test("pattern query (SP)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery(["a", "value", null], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([3])]);
});

test("pattern query (PO)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery([null, "value", 0], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([3])]);
});

test("pattern query (SO)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery(["b", null, "bar"], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([1])]);
});

test("pattern query (SPO)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery(["c", "type", "baz"], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([2])]);
});

test("pattern query (all)", () => {
	const res: TripleIds[] = [];
	store
		.addPatternQuery([null, null, null], "q", false)
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([0, 1, 2, 3, 4, 5])]);
});

test("param query (S)", () => {
	const res: Set<any>[] = [];
	store
		.addParamQuery(["a", "?p", "?o"])
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([
		new Set([
			{ p: "type", o: "foo" },
			{ p: "value", o: 0 },
		]),
	]);
});

test("param query (P)", () => {
	const res: Set<any>[] = [];
	store
		.addParamQuery(["?s", "type", "?o"])
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([
		new Set([
			{ s: "a", o: "foo" },
			{ s: "b", o: "bar" },
			{ s: "c", o: "baz" },
		]),
	]);
});

test("param query (O)", () => {
	const res: Set<any>[] = [];
	store
		.addParamQuery(["?s", "?p", "a"])
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([{ s: "c", p: "friend" }])]);
});

test("param query (SP)", () => {
	const res: Set<any>[] = [];
	store
		.addParamQuery(["a", "value", "?o"])
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([{ o: 0 }])]);
});

test("param query (PO)", () => {
	const res: Set<any>[] = [];
	store
		.addParamQuery(["?s", "value", 0])
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([{ s: "a" }])]);
});

test("param query (SO)", () => {
	const res: Set<any>[] = [];
	store
		.addParamQuery(["b", "?p", "bar"])
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([new Set([{ p: "type" }])]);
});

test("param query (SPO)", () => {
	expect(() => store.addParamQuery(["c", "type", "baz"])).toThrow();
});

test("param query (all)", () => {
	const res: Set<any>[] = [];
	store
		.addParamQuery(["?s", "?p", "?o"])
		.subscribe({ next: (r) => res.push(r) });
	expect(res).toEqual([
		new Set([
			{ s: "a", p: "type", o: "foo" },
			{ s: "b", p: "type", o: "bar" },
			{ s: "c", p: "type", o: "baz" },
			{ s: "a", p: "value", o: 0 },
			{ s: "b", p: "value", o: 1 },
			{ s: "c", p: "friend", o: "a" },
		]),
	]);
});
