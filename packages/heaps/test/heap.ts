import * as assert from "assert";
import { Heap } from "../src/index";
import { compare } from "@thi.ng/compare";

describe("Heap", () => {
    const rcmp: (a: number, b: number) => number = (a, b) => b - a;

    const src = [5, 2, 10, 20, 15, 18, 23, 22, -1];
    let h: Heap<any>;

    beforeEach(() => {
        h = new Heap(src);
    });

    it("length", () => {
        assert.equal(h.length, src.length);
    });

    it("copy", () => {
        assert.deepEqual(drain(h.copy()), drain(h));
        h = new Heap(src, { compare: rcmp });
        assert.deepEqual(drain(h.copy()), drain(h));
    });

    it("peek", () => {
        assert.equal(h.peek(), -1);
        h.push(-2);
        assert.equal(h.peek(), -2);
    });

    it("pop", () => {
        assert.deepEqual(drain(h), src.slice().sort(compare));
        h = new Heap(src, { compare: rcmp });
        assert.deepEqual(drain(h), src.slice().sort(compare).reverse());
    });

    it("into", () => {
        assert.deepEqual(drain(h.into(src)), src.concat(src).sort(compare));
    });

    it("pushPop", () => {
        assert.equal(h.pushPop(-2), -2);
        assert.equal(h.length, src.length);
        assert.equal(h.pushPop(-1), -1);
        assert.equal(h.length, src.length);
        assert.equal(h.pushPop(11), -1);
        assert.equal(h.length, src.length);
        assert.equal(h.pushPop(24), 2);
        assert.equal(h.length, src.length);
    });

    it("min", () => {
        assert.deepEqual(h.min(0), []);
        assert.deepEqual(h.min(1), [-1]);
        assert.deepEqual(h.min(2), [-1, 2]);
        assert.deepEqual(h.min(3), [-1, 2, 5]);
        assert.deepEqual(h.min(4), [-1, 2, 5, 10]);
        assert.deepEqual(h.min(), src.slice().sort(compare));
    });

    it("max", () => {
        assert.deepEqual(h.max(0), []);
        assert.deepEqual(h.max(1), [23]);
        assert.deepEqual(h.max(2), [23, 22]);
        assert.deepEqual(h.max(3), [23, 22, 20]);
        assert.deepEqual(h.max(4), [23, 22, 20, 18]);
        assert.deepEqual(h.max(), src.slice().sort(compare).reverse());
    });

    it("parent", () => {
        assert.equal(h.parent(0), undefined);
        assert.equal(h.parent(1), -1);
        assert.equal(h.parent(2), -1);
        assert.equal(h.parent(3), 2);
        assert.equal(h.parent(4), 2);
        assert.equal(h.parent(5), 10);
        assert.equal(h.parent(6), 10);
    });

    it("children", () => {
        assert.deepEqual(h.children(0), [2, 10]);
        assert.deepEqual(h.children(1), [5, 15]);
        assert.deepEqual(h.children(2), [18, 23]);
        assert.deepEqual(h.children(3), [22, 20]);
        assert.deepEqual(h.children(4), undefined);
    });
});

function drain(h: Heap<any>) {
    const res = [];
    let x;
    while ((x = h.pop())) {
        res.push(x);
    }
    return res;
}
