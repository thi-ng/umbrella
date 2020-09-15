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
        const tests: Record<
            QueryType,
            [SPInputTerm, SPInputTerm, OTerm, any]
        > = {
            lll: ["alice", "knows", "bob", { alice: { knows: ["bob"] } }],
            llf: [
                "alice",
                "knows",
                (o: any) => o == "bob" || o == "charlie",
                { alice: { knows: ["bob", "charlie"] } },
            ],
            lln: ["bob", "knows", null, { bob: { knows: ["alice"] } }],
            lfl: [
                "bob",
                (p) => p == "knows" || p == "spouse",
                "alice",
                { bob: { knows: ["alice"], spouse: "alice" } },
            ],
            lff: [
                "charlie",
                () => true,
                (o: any) => o !== "alice",
                { charlie: { knows: ["bob", "dori"] } },
            ],
            lfn: ["bob", (p) => p == "type", null, { bob: { type: "person" } }],
            lnl: [
                "bob",
                null,
                "alice",
                { bob: { knows: ["alice"], spouse: "alice" } },
            ],
            lnf: [
                "charlie",
                null,
                (o: any) => o == "alice",
                { charlie: { parent: "alice", knows: ["alice"] } },
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
            ],
            fll: [(s) => s != "alice", "age", 32, { bob: { age: 32 } }],
            flf: [
                (s) => s != "alice",
                "age",
                (o: any) => o > 30,
                { bob: { age: 32 } },
            ],
            fln: [
                (s) => s != "alice",
                "knows",
                null,
                {
                    bob: { knows: ["alice"] },
                    charlie: { knows: ["alice", "bob", "dori"] },
                },
            ],
            ffl: [
                (s) => s != "alice",
                (p) => p != "knows",
                "alice",
                { bob: { spouse: "alice" }, charlie: { parent: "alice" } },
            ],
            fff: [
                (s) => s === "bob" || s === "alice",
                (p) => p == "spouse" || p == "age",
                () => true,
                { alice: { age: 33 }, bob: { age: 32, spouse: "alice" } },
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
            ],
            fnl: [
                (s) => s == "alice",
                null,
                "charlie",
                { alice: { knows: ["charlie"] } },
            ],
            fnf: [
                (s) => s == "alice",
                null,
                (o: any) => o[0] == "d",
                { alice: { knows: ["dori"] } },
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
            ],
            nll: [null, "age", 32, { bob: { age: 32 } }],
            nlf: [null, "age", (o: any) => o > 32, { alice: { age: 33 } }],
            nln: [null, "age", null, { alice: { age: 33 }, bob: { age: 32 } }],
            nfl: [
                null,
                () => true,
                "person",
                { alice: { type: "person" }, bob: { type: "person" } },
            ],
            nff: [
                null,
                () => true,
                (o: any) => o == "bob",
                { alice: { knows: ["bob"] }, charlie: { knows: ["bob"] } },
            ],
            nfn: [
                null,
                (p) => p == "type",
                null,
                { alice: { type: "person" }, bob: { type: "person" } },
            ],
            nnl: [null, null, 33, { alice: { age: 33 } }],
            nnf: [null, null, (o: any) => o < 33, { bob: { age: 32 } }],
            nnn: [null, null, null, DB],
        };

        const query = defQuery();
        for (let id in tests) {
            const t = tests[<QueryType>id];
            if (t) {
                const res = query(DB, t[0], t[1], t[2]);
                assert.deepStrictEqual(
                    res,
                    t[3],
                    `${id}: ${JSON.stringify(res)}`
                );
            }
        }
    });

    it("coerce terms (array)", () => {
        const query = defQuery();
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
        const query = defQuery();
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
});
