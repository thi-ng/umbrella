import { isNumber } from "@thi.ng/checks";
import * as assert from "assert";
import { defQuery, QueryType, SPInputTerm, OTerm } from "../src";

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
};

describe("oquery", () => {
    it("all patterns", () => {
        const { alice, bob, charlie } = DB;
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
                { alice: { knows: ["bob", "charlie"] } },
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
            fll: [
                (s) => s != "alice",
                "age",
                32,
                { bob: { age: 32 } },
                { bob },
            ],
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
                },
                { bob, charlie },
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
                { alice: { knows: ["bob"] }, charlie: { knows: ["bob"] } },
                { alice, charlie },
            ],
            nfn: [
                null,
                (p) => p == "type",
                null,
                { alice: { type: "person" }, bob: { type: "person" } },
                { alice, bob },
            ],
            nnl: [null, null, 33, { alice: { age: 33 } }, { alice }],
            nnf: [
                null,
                null,
                (o: any) => o < 33,
                { bob: { age: 32 } },
                { bob },
            ],
            nnn: [null, null, null, DB, DB],
        };

        const q1 = defQuery({ partial: true });
        const q2 = defQuery({ partial: false });
        for (let id in tests) {
            const t = tests[<QueryType>id];
            if (t) {
                let res = q1(DB, t[0], t[1], t[2]);
                assert.deepStrictEqual(
                    res,
                    t[3],
                    `${id}(1): ${JSON.stringify(res)}`
                );
                res = q2(DB, t[0], t[1], t[2]);
                assert.deepStrictEqual(
                    res,
                    t[4],
                    `${id}(2): ${JSON.stringify(res)}`
                );
            }
        }
    });

    it("coerce terms (array)", () => {
        const query = defQuery({ partial: true });
        // S
        assert.deepStrictEqual(query(DB, ["alice", "bob"], "type", null), {
            alice: { type: "person" },
            bob: { type: "person" },
        });
        assert.deepStrictEqual(query(DB, ["alice", "charlie"], "type", null), {
            alice: { type: "person" },
        });
        // P
        assert.deepStrictEqual(query(DB, "alice", ["type", "spouse"], null), {
            alice: { type: "person" },
        });
        assert.deepStrictEqual(query(DB, "bob", ["type", "spouse"], null), {
            bob: { type: "person", spouse: "alice" },
        });
        // O
        assert.deepStrictEqual(
            query(DB, "alice", ["type", "age"], [33, "person"]),
            {
                alice: { type: "person", age: 33 },
            }
        );
    });

    it("coerce terms (set)", () => {
        const query = defQuery({ partial: true });
        // S
        assert.deepStrictEqual(
            query(DB, new Set(["alice", "bob"]), "type", null),
            {
                alice: { type: "person" },
                bob: { type: "person" },
            }
        );
        assert.deepStrictEqual(
            query(DB, new Set(["alice", "charlie"]), "type", null),
            {
                alice: { type: "person" },
            }
        );
        // P
        assert.deepStrictEqual(
            query(DB, "alice", new Set(["type", "spouse"]), null),
            {
                alice: { type: "person" },
            }
        );
        assert.deepStrictEqual(
            query(DB, "bob", new Set(["type", "spouse"]), null),
            {
                bob: { type: "person", spouse: "alice" },
            }
        );
        // O
        assert.deepStrictEqual(
            query(
                DB,
                "alice",
                new Set(["type", "age"]),
                new Set([33, "person"])
            ),
            {
                alice: { type: "person", age: 33 },
            }
        );
    });

    it("full option", () => {
        const query = defQuery();
        // S
        assert.deepStrictEqual(query(DB, ["alice", "bob"], "type", null), {
            alice: DB.alice,
            bob: DB.bob,
        });
        assert.deepStrictEqual(query(DB, ["alice", "charlie"], "type", null), {
            alice: DB.alice,
        });
        // P
        assert.deepStrictEqual(query(DB, "alice", ["type", "spouse"], null), {
            alice: DB.alice,
        });
        assert.deepStrictEqual(query(DB, "bob", ["type", "spouse"], null), {
            bob: DB.bob,
        });
        // O
        assert.deepStrictEqual(
            query(DB, "alice", ["type", "age"], [33, "person"]),
            {
                alice: DB.alice,
            }
        );
    });

    it("arrays", () => {
        const db = [{ id: 1 }, { id: 11, name: "b" }, { name: "c" }];
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
            nn: [null, null, [...db]],
        };

        const query = defQuery({ partial: true });
        for (let id in tests) {
            const t = tests[<keyof typeof tests>id];
            if (t) {
                const res = query(db, t[0], t[1]);
                assert.deepStrictEqual(
                    res,
                    t[2],
                    `${id}: ${JSON.stringify(res)}`
                );
            }
        }
    });
});
