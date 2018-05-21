import { Atom } from "@thi.ng/atom";
import * as rs from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers/xform/map";
import * as assert from "assert";

import * as rsg from "../src";

describe("rstream-graph", () => {
    it("basic", (done) => {
        const acc = [];
        const state = new Atom({ a: 1, b: 2 });
        const graph = rsg.initGraph(state, {
            foo: rs.fromIterable([2]),
            bar: ($) => $("foo").transform(map((x: number) => x * 10)),
            add: {
                fn: rsg.add,
                ins: {
                    a: { path: "a" },
                    b: { path: "b" }
                },
            },
            mul: {
                fn: rsg.mul,
                ins: {
                    a: { stream: "add" },
                    b: { stream: () => rs.fromIterable([10, 20, 30]) },
                    c: { stream: "bar" }
                },
            }
        });
        graph.mul.subscribe({ next: (x) => acc.push(x) });
        setTimeout(() => {
            state.resetIn("a", 10);
            assert.deepEqual(acc, [600, 1200, 1800, 7200]);
            done();
        }, 10);
    });
});
