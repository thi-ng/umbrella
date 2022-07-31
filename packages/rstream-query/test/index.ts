import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { Triple, TripleIds, TripleStore } from "../src/index.js";

const triples: Triple[] = [
	["a", "type", "foo"], // 0
	["b", "type", "bar"], // 1
	["c", "type", "baz"], // 2
	["a", "value", 0], // 3
	["b", "value", 1], // 4
	["c", "friend", "a"], // 5
];

let store: TripleStore;

group(
	"rstream-query",
	{
		"pattern query (S)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery(["a", null, null], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([0, 3])]);
		},

		"pattern query (P)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery([null, "type", null], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([0, 1, 2])]);
		},

		"pattern query (O)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery([null, null, "a"], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([5])]);
		},

		"pattern query (SP)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery(["a", "value", null], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([3])]);
		},

		"pattern query (PO)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery([null, "value", 0], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([3])]);
		},

		"pattern query (SO)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery(["b", null, "bar"], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([1])]);
		},

		"pattern query (SPO)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery(["c", "type", "baz"], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([2])]);
		},

		"pattern query (all)": () => {
			const res: TripleIds[] = [];
			store
				.addPatternQuery([null, null, null], "q", false)
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([0, 1, 2, 3, 4, 5])]);
		},

		"param query (S)": () => {
			const res: Set<any>[] = [];
			store
				.addParamQuery(["a", "?p", "?o"])
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [
				new Set([
					{ p: "type", o: "foo" },
					{ p: "value", o: 0 },
				]),
			]);
		},

		"param query (P)": () => {
			const res: Set<any>[] = [];
			store
				.addParamQuery(["?s", "type", "?o"])
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [
				new Set([
					{ s: "a", o: "foo" },
					{ s: "b", o: "bar" },
					{ s: "c", o: "baz" },
				]),
			]);
		},

		"param query (O)": () => {
			const res: Set<any>[] = [];
			store
				.addParamQuery(["?s", "?p", "a"])
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([{ s: "c", p: "friend" }])]);
		},

		"param query (SP)": () => {
			const res: Set<any>[] = [];
			store
				.addParamQuery(["a", "value", "?o"])
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([{ o: 0 }])]);
		},

		"param query (PO)": () => {
			const res: Set<any>[] = [];
			store
				.addParamQuery(["?s", "value", 0])
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([{ s: "a" }])]);
		},

		"param query (SO)": () => {
			const res: Set<any>[] = [];
			store
				.addParamQuery(["b", "?p", "bar"])
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [new Set([{ p: "type" }])]);
		},

		"param query (SPO)": () => {
			assert.throws(() => store.addParamQuery(["c", "type", "baz"]));
		},

		"param query (all)": () => {
			const res: Set<any>[] = [];
			store
				.addParamQuery(["?s", "?p", "?o"])
				.subscribe({ next: (r) => res.push(r) });
			assert.deepStrictEqual(res, [
				new Set([
					{ s: "a", p: "type", o: "foo" },
					{ s: "b", p: "type", o: "bar" },
					{ s: "c", p: "type", o: "baz" },
					{ s: "a", p: "value", o: 0 },
					{ s: "b", p: "value", o: 1 },
					{ s: "c", p: "friend", o: "a" },
				]),
			]);
		},
	},
	{
		beforeEach: () => {
			store = new TripleStore(triples);
		},
	}
);
