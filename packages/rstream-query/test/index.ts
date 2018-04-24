import * as assert from "assert";
import { FactGraph, Fact } from "../src/index";

describe("rstream-query", () => {

    const facts: Fact[] = [
        ["a", "type", "foo"], // 0
        ["b", "type", "bar"], // 1
        ["c", "type", "baz"], // 2
        ["a", "value", 0],    // 3
        ["b", "value", 1],    // 4
        ["c", "friend", "a"], // 5
    ];

    let g: FactGraph;

    beforeEach(() => {
        g = new FactGraph();
        FactGraph.NEXT_ID = 0;
        for (let f of facts) {
            g.addFact(f);

        }
    });

    it("pattern query (S)", () => {
        const res = [];
        g.addPatternQuery("q", ["a", null, null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([0, 3])]);
    });

    it("pattern query (P)", () => {
        const res = [];
        g.addPatternQuery("q", [null, "type", null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([0, 1, 2])]);
    });

    it("pattern query (O)", () => {
        const res = [];
        g.addPatternQuery("q", [null, null, "a"], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([5])]);
    });

    it("pattern query (SP)", () => {
        const res = [];
        g.addPatternQuery("q", ["a", "value", null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([3])]);
    });

    it("pattern query (PO)", () => {
        const res = [];
        g.addPatternQuery("q", [null, "value", 0], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([3])]);
    });

    it("pattern query (SO)", () => {
        const res = [];
        g.addPatternQuery("q", ["b", null, "bar"], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([1])]);
    });

    it("pattern query (SPO)", () => {
        const res = [];
        g.addPatternQuery("q", ["c", "type", "baz"], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([2])]);
    });

    it("pattern query (all)", () => {
        const res = [];
        g.addPatternQuery("q", [null, null, null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([0, 1, 2, 3, 4, 5])]);
    });

    it("param query (S)", () => {
        const res = [];
        g.addParamQuery("q", ["a", "?p", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [[{ p: "type", o: "foo" }, { p: "value", o: 0 }]]);
    });

    it("param query (P)", () => {
        const res = [];
        g.addParamQuery("q", ["?s", "type", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [[{ s: "a", o: "foo" }, { s: "b", o: "bar" }, { s: "c", o: "baz" }]]);
    });

    it("param query (O)", () => {
        const res = [];
        g.addParamQuery("q", ["?s", "?p", "a"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [[{ s: "c", p: "friend" }]]);
    });

    it("param query (SP)", () => {
        const res = [];
        g.addParamQuery("q", ["a", "value", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [[{ o: 0 }]]);
    });

    it("param query (PO)", () => {
        const res = [];
        g.addParamQuery("q", ["?s", "value", 0]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [[{ s: "a" }]]);
    });

    it("param query (SO)", () => {
        const res = [];
        g.addParamQuery("q", ["b", "?p", "bar"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [[{ p: "type" }]]);
    });

    it("param query (SPO)", () => {
        assert.throws(() => g.addParamQuery("q", ["c", "type", "baz"]));
    });

    it("param query (all)", () => {
        const res = [];
        g.addParamQuery("q", ["?s", "?p", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [[
            { s: "a", p: "type", o: "foo" },
            { s: "b", p: "type", o: "bar" },
            { s: "c", p: "type", o: "baz" },
            { s: "a", p: "value", o: 0 },
            { s: "b", p: "value", o: 1 },
            { s: "c", p: "friend", o: "a" },
        ]]);
    });
});
