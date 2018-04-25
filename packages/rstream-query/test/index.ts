import * as assert from "assert";
import { TripleStore, Triple } from "../src/index";

describe("rstream-query", () => {

    const triples: Triple[] = [
        ["a", "type", "foo"], // 0
        ["b", "type", "bar"], // 1
        ["c", "type", "baz"], // 2
        ["a", "value", 0],    // 3
        ["b", "value", 1],    // 4
        ["c", "friend", "a"], // 5
    ];

    let store: TripleStore;

    beforeEach(() => {
        TripleStore.NEXT_ID = 0;
        store = new TripleStore(triples);
    });

    it("pattern query (S)", () => {
        const res = [];
        store.addPatternQuery("q", ["a", null, null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([0, 3])]);
    });

    it("pattern query (P)", () => {
        const res = [];
        store.addPatternQuery("q", [null, "type", null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([0, 1, 2])]);
    });

    it("pattern query (O)", () => {
        const res = [];
        store.addPatternQuery("q", [null, null, "a"], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([5])]);
    });

    it("pattern query (SP)", () => {
        const res = [];
        store.addPatternQuery("q", ["a", "value", null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([3])]);
    });

    it("pattern query (PO)", () => {
        const res = [];
        store.addPatternQuery("q", [null, "value", 0], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([3])]);
    });

    it("pattern query (SO)", () => {
        const res = [];
        store.addPatternQuery("q", ["b", null, "bar"], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([1])]);
    });

    it("pattern query (SPO)", () => {
        const res = [];
        store.addPatternQuery("q", ["c", "type", "baz"], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([2])]);
    });

    it("pattern query (all)", () => {
        const res = [];
        store.addPatternQuery("q", [null, null, null], false).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([0, 1, 2, 3, 4, 5])]);
    });

    it("param query (S)", () => {
        const res = [];
        store.addParamQuery("q", ["a", "?p", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([{ p: "type", o: "foo" }, { p: "value", o: 0 }])]);
    });

    it("param query (P)", () => {
        const res = [];
        store.addParamQuery("q", ["?s", "type", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([{ s: "a", o: "foo" }, { s: "b", o: "bar" }, { s: "c", o: "baz" }])]);
    });

    it("param query (O)", () => {
        const res = [];
        store.addParamQuery("q", ["?s", "?p", "a"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([{ s: "c", p: "friend" }])]);
    });

    it("param query (SP)", () => {
        const res = [];
        store.addParamQuery("q", ["a", "value", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([{ o: 0 }])]);
    });

    it("param query (PO)", () => {
        const res = [];
        store.addParamQuery("q", ["?s", "value", 0]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([{ s: "a" }])]);
    });

    it("param query (SO)", () => {
        const res = [];
        store.addParamQuery("q", ["b", "?p", "bar"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([{ p: "type" }])]);
    });

    it("param query (SPO)", () => {
        assert.throws(() => store.addParamQuery("q", ["c", "type", "baz"]));
    });

    it("param query (all)", () => {
        const res = [];
        store.addParamQuery("q", ["?s", "?p", "?o"]).subscribe({ next: (r) => res.push(r) });
        assert.deepEqual(res, [new Set([
            { s: "a", p: "type", o: "foo" },
            { s: "b", p: "type", o: "bar" },
            { s: "c", p: "type", o: "baz" },
            { s: "a", p: "value", o: 0 },
            { s: "b", p: "value", o: 1 },
            { s: "c", p: "friend", o: "a" },
        ])]);
    });
});
