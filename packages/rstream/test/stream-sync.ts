import * as assert from "assert";

import { Atom } from "@thi.ng/atom";
import * as tx from "@thi.ng/transducers";

import * as rs from "../src/index";

describe("StreamSync", () => {

    function adder() {
        return tx.map(
            (ports) => {
                let sum = 0;
                for (let p in ports) {
                    sum += ports[p];
                }
                return sum;
            }
        );
    }

    it("dataflow & teardown", () => {
        let a, b, c;
        let a1done = false, a2done = false;
        let a1buf, a2buf;
        const db = new Atom<any>({
            a1: { ins: { a: 1, b: 2 } },
            a2: { ins: { b: 10 } },
        });
        const a1 = new rs.StreamSync({
            src: [
                a = rs.fromView(db, "a1.ins.a"),
                b = rs.fromView(db, "a1.ins.b"),
            ],
            xform: adder(),
            reset: false
        });
        const a1res = a1.subscribe({
            next(x) { a1buf = x; },
            done() { a1done = true; }
        });
        const a2 = new rs.StreamSync({
            src: [
                a1,
                c = rs.fromView(db, "a2.ins.b"),
            ],
            xform: adder(),
            reset: false
        });
        const res = a2.subscribe({
            next(x) { a2buf = x; },
            done() { a2done = true; }
        });
        assert.equal(a1buf, 3);
        assert.equal(a2buf, 13);
        db.reset({ a1: { ins: { a: 100, b: 200 } }, a2: { ins: { b: 1000 } } });
        assert.equal(a1buf, 300);
        assert.equal(a2buf, 1300);
        // teardown from end result
        res.unsubscribe();
        assert(!a1done);
        assert(!a2done);
        assert.equal(a.getState(), rs.State.ACTIVE, "a != ACTIVE");
        assert.equal(b.getState(), rs.State.ACTIVE, "b != ACTIVE");
        assert.equal(a1.getState(), rs.State.ACTIVE, "a1 != ACTIVE");
        assert.equal(a1res.getState(), rs.State.IDLE, "a1res != IDLE");
        assert.equal(c.getState(), rs.State.DONE, "c != DONE");
        assert.equal(a2.getState(), rs.State.DONE, "a2 != DONE");
        assert.equal(res.getState(), rs.State.DONE, "res != DONE");
        // teardown from a1 result
        a1res.unsubscribe();
        assert.equal(a.getState(), rs.State.DONE, "a != DONE");
        assert.equal(b.getState(), rs.State.DONE, "b != DONE");
        assert.equal(a1.getState(), rs.State.DONE, "a1 != DONE");
        assert.equal(a1res.getState(), rs.State.DONE, "a1res != DONE");
        assert(!a1done);
        assert(!a2done);
    });
});
