import { isNumber } from "@thi.ng/checks";
import { expect, test } from "bun:test";
import {
	defKeyQuery,
	defQuery,
	type OTerm,
	type QueryType,
	type SPInputTerm,
} from "../src/index.js";

const DB = {
	alice: {
		age: 33,
		knows: ["bob", "charlie", "dori"],
		type: "person",
	},
	bob: {
		age: 32,
		knows: ["alice"],
		type: "person",
		spouse: "alice",
	},
	charlie: {
		parent: "alice",
		knows: ["alice", "bob", "dori"],
	},
	dori: {
		knows: ["bob"],
	},
};

const DB_A: any[] = [{ id: 1 }, { id: 11, name: "b" }, { name: "c" }];

test("all patterns", () => {
	const { alice, bob, charlie, dori } = DB;
	const tests: Record<
		QueryType,
		[SPInputTerm, SPInputTerm, OTerm, any, any]
	> = {
		lll: [
			"alice",
			"knows",
			"bob",
			{ alice: { knows: ["bob"] } },
			{ alice },
		],
		llf: [
			"alice",
			"knows",
			(o: any) => o == "bob" || o == "charlie",
			{
				alice: { knows: ["bob", "charlie"] },
			},
			{ alice },
		],
		lln: ["bob", "knows", null, { bob: { knows: ["alice"] } }, { bob }],
		lfl: [
			"bob",
			(p) => p == "knows" || p == "spouse",
			"alice",
			{ bob: { knows: ["alice"], spouse: "alice" } },
			{ bob },
		],
		lff: [
			"charlie",
			() => true,
			(o: any) => o !== "alice",
			{ charlie: { knows: ["bob", "dori"] } },
			{ charlie },
		],
		lfn: [
			"bob",
			(p) => p == "type",
			null,
			{ bob: { type: "person" } },
			{ bob },
		],
		lnl: [
			"bob",
			null,
			"alice",
			{ bob: { knows: ["alice"], spouse: "alice" } },
			{ bob },
		],
		lnf: [
			"charlie",
			null,
			(o: any) => o == "alice",
			{ charlie: { parent: "alice", knows: ["alice"] } },
			{ charlie },
		],
		lnn: [
			"charlie",
			null,
			null,
			{
				charlie: {
					parent: "alice",
					knows: ["alice", "bob", "dori"],
				},
			},
			{ charlie },
		],
		fll: [(s) => s != "alice", "age", 32, { bob: { age: 32 } }, { bob }],
		flf: [
			(s) => s != "alice",
			"age",
			(o: any) => o > 30,
			{ bob: { age: 32 } },
			{ bob },
		],
		fln: [
			(s) => s != "alice",
			"knows",
			null,
			{
				bob: { knows: ["alice"] },
				charlie: { knows: ["alice", "bob", "dori"] },
				dori: { knows: ["bob"] },
			},
			{ bob, charlie, dori },
		],
		ffl: [
			(s) => s != "alice",
			(p) => p != "knows",
			"alice",
			{ bob: { spouse: "alice" }, charlie: { parent: "alice" } },
			{ bob, charlie },
		],
		fff: [
			(s) => s === "bob" || s === "alice",
			(p) => p == "spouse" || p == "age",
			() => true,
			{ alice: { age: 33 }, bob: { age: 32, spouse: "alice" } },
			{ alice, bob },
		],
		ffn: [
			(s) => s != "alice",
			(p) => p != "knows",
			null,
			{
				bob: {
					age: 32,
					type: "person",
					spouse: "alice",
				},
				charlie: {
					parent: "alice",
				},
			},
			{ bob, charlie },
		],
		fnl: [
			(s) => s == "alice",
			null,
			"charlie",
			{ alice: { knows: ["charlie"] } },
			{ alice },
		],
		fnf: [
			(s) => s == "alice",
			null,
			(o: any) => o[0] == "d",
			{ alice: { knows: ["dori"] } },
			{ alice },
		],
		fnn: [
			(s) => s == "charlie",
			null,
			null,
			{
				charlie: {
					parent: "alice",
					knows: ["alice", "bob", "dori"],
				},
			},
			{ charlie },
		],
		nll: [null, "age", 32, { bob: { age: 32 } }, { bob }],
		nlf: [
			null,
			"age",
			(o: any) => o > 32,
			{ alice: { age: 33 } },
			{ alice },
		],
		nln: [
			null,
			"age",
			null,
			{ alice: { age: 33 }, bob: { age: 32 } },
			{ alice, bob },
		],
		nfl: [
			null,
			() => true,
			"person",
			{ alice: { type: "person" }, bob: { type: "person" } },
			{ alice, bob },
		],
		nff: [
			null,
			() => true,
			(o: any) => o == "bob",
			{
				alice: { knows: ["bob"] },
				charlie: { knows: ["bob"] },
				dori: { knows: ["bob"] },
			},
			{ alice, charlie, dori },
		],
		nfn: [
			null,
			(p) => p == "type",
			null,
			{ alice: { type: "person" }, bob: { type: "person" } },
			{ alice, bob },
		],
		nnl: [null, null, 33, { alice: { age: 33 } }, { alice }],
		nnf: [null, null, (o: any) => o < 33, { bob: { age: 32 } }, { bob }],
		nnn: [null, null, null, DB, DB],
	};

	const q1 = defQuery({ partial: true });
	const q2 = defQuery({ partial: false });
	for (let id in tests) {
		const t = tests[<QueryType>id];
		if (t) {
			let res = q1(DB, t[0], t[1], t[2]);
			expect(res).toEqual(
				t[3]
				// `${id}(1): ${JSON.stringify(res)}`
			);
			res = q2(DB, t[0], t[1], t[2]);
			expect(res).toEqual(
				t[4]
				// `${id}(2): ${JSON.stringify(res)}`
			);
		}
	}
});

test("coerce terms (array)", () => {
	const query = defQuery({ partial: true });
	// S
	expect(query(DB, ["alice", "bob"], "type", null)).toEqual({
		alice: { type: "person" },
		bob: { type: "person" },
	});
	expect(query(DB, ["alice", "charlie"], "type", null)).toEqual({
		alice: { type: "person" },
	});
	// P
	expect(query(DB, "alice", ["type", "spouse"], null)).toEqual({
		alice: { type: "person" },
	});
	expect(query(DB, "bob", ["type", "spouse"], null)).toEqual({
		bob: { type: "person", spouse: "alice" },
	});
	// O
	expect(query(DB, "alice", ["type", "age"], [33, "person"])).toEqual({
		alice: { type: "person", age: 33 },
	});
});

test("coerce terms (set)", () => {
	const query = defQuery({ partial: true });
	// S
	expect(query(DB, new Set(["alice", "bob"]), "type", null)).toEqual({
		alice: { type: "person" },
		bob: { type: "person" },
	});
	expect(query(DB, new Set(["alice", "charlie"]), "type", null)).toEqual({
		alice: { type: "person" },
	});
	// P
	expect(query(DB, "alice", new Set(["type", "spouse"]), null)).toEqual({
		alice: { type: "person" },
	});
	expect(query(DB, "bob", new Set(["type", "spouse"]), null)).toEqual({
		bob: { type: "person", spouse: "alice" },
	});
	// O
	expect(
		query(DB, "alice", new Set(["type", "age"]), new Set([33, "person"]))
	).toEqual({
		alice: { type: "person", age: 33 },
	});
});

test("full option", () => {
	const query = defQuery();
	// S
	expect(query(DB, ["alice", "bob"], "type", null)).toEqual({
		alice: DB.alice,
		bob: DB.bob,
	});
	expect(query(DB, ["alice", "charlie"], "type", null)).toEqual({
		alice: DB.alice,
	});
	// P
	expect(query(DB, "alice", ["type", "spouse"], null)).toEqual({
		alice: DB.alice,
	});
	expect(query(DB, "bob", ["type", "spouse"], null)).toEqual({
		bob: DB.bob,
	});
	// O
	expect(query(DB, "alice", ["type", "age"], [33, "person"])).toEqual({
		alice: DB.alice,
	});
});

test("arrays", () => {
	const tests: Record<
		"ff" | "fl" | "fn" | "lf" | "ll" | "ln" | "nf" | "nl" | "nn",
		[SPInputTerm, OTerm, any]
	> = {
		ff: [(x) => x == "id", (x: any) => x > 10, [{ id: 11 }]],
		fl: [(x) => x === "name", "c", [{ name: "c" }]],
		fn: [(x) => x == "name", null, [{ name: "b" }, { name: "c" }]],
		lf: ["id", (x: any) => x < 10, [{ id: 1 }]],
		ll: ["id", 11, [{ id: 11 }]],
		ln: ["id", null, [{ id: 1 }, { id: 11 }]],
		nf: [null, isNumber, [{ id: 1 }, { id: 11 }]],
		nl: [null, 11, [{ id: 11 }]],
		nn: [null, null, [...DB_A]],
	};

	const query = defQuery<any[]>({ partial: true });
	for (let id in tests) {
		const t = tests[<keyof typeof tests>id];
		if (t) {
			const res = query(DB_A, t[0], t[1]);
			expect(res).toEqual(
				t[2]
				// `${id}: ${JSON.stringify(res)}`
			);
		}
	}
});

test("key query", () => {
	expect(defKeyQuery()(DB, null, "type", "person")).toEqual(
		new Set(["alice", "bob"])
	);
	const res1 = new Set(["xxx"]);
	expect(defKeyQuery()(DB, null, "type", "person", res1)).toEqual(
		new Set(["alice", "bob", "xxx"])
	);
	expect(defKeyQuery<any[]>()(DB_A, "name", null)).toEqual(new Set([1, 2]));
	const res2 = new Set([-1]);
	expect(defKeyQuery<any[]>()(DB_A, "name", null, res2)).toEqual(
		new Set([1, 2, -1])
	);
});

test("intersection", () => {
	expect(
		defQuery({ intersect: true, cwise: true, partial: true })(
			DB,
			null,
			"knows",
			["bob", "dori"]
		)
	).toEqual({
		alice: { knows: ["bob", "charlie", "dori"] },
		charlie: { knows: ["alice", "bob", "dori"] },
	});
	expect(
		defKeyQuery({ intersect: true, cwise: true })(DB, null, "knows", [
			"bob",
			"dori",
		])
	).toEqual(new Set(["alice", "charlie"]));
	expect(
		defKeyQuery({ intersect: false, cwise: true })(DB, null, "knows", [
			"bob",
			"dori",
		])
	).toEqual(new Set(["alice", "charlie", "dori"]));
});
