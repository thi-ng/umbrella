import * as assert from "assert";

import * as rs from "../src/index";

describe("SidechainToggle", () => {


    let src, side, buf;

    beforeEach(() => {
        src = new rs.Stream();
        side = new rs.Stream();
        buf = [];
    });

    let check = (initial, pred, expect, done) => {
        src.subscribe(rs.sidechainToggle(side, initial, pred))
            .subscribe({
                next(x) {
                    buf.push(x);
                },
                done() {
                    assert.deepEqual(buf, expect);
                    done();
                }
            });
        src.next(1);
        src.next(2);
        side.next(0);
        src.next(3);
        src.next(4);
        side.next(1);
        src.next(5);
        src.done();
    };

    it("toggles (initially on)", (done) => {
        check(true, null, [1, 2, 5], done);
    });

    it("toggles (initially off)", (done) => {
        check(false, null, [3, 4], done);
    });

    it("toggles w/ predicate", (done) => {
        check(true, (x) => x === 0, [1, 2], done);
    });

    it("unsubscribe chain (from child)", () => {
        const part = src.subscribe(rs.sidechainToggle(side));
        const sub = part.subscribe({});
        sub.unsubscribe();
        assert.equal(src.getState(), rs.State.DONE);
        assert.equal(side.getState(), rs.State.DONE);
        assert.equal(part.getState(), rs.State.DONE);
        assert.equal(sub.getState(), rs.State.DONE);
    });
});
