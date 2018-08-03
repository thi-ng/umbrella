import * as assert from "assert";

import * as rs from "../src/index";

describe("SidechainPartition", function () {

    let src, side, buf;

    beforeEach(() => {
        src = rs.stream();
        side = rs.stream();
        buf = [];
    });

    it("partitions (manual)", (done) => {
        src.subscribe(rs.sidechainPartition(side))
            .subscribe({
                next(x) { buf.push(x); },
                done() {
                    assert.deepEqual(
                        buf,
                        [[1, 2], [3, 4, 5]]
                    );
                    done();
                }
            });
        src.next(1);
        src.next(2);
        side.next(1);

        src.next(3);
        src.next(4);
        src.next(5);
        side.next(false);

        side.done();
    });

    it("partitions w/ predicate", (done) => {
        src.subscribe(rs.sidechainPartition(side, (x) => x === 1))
            .subscribe({
                next(x) { buf.push(x); },
                done() {
                    assert.deepEqual(
                        buf,
                        [[1, 2, 3], [4, 5]]
                    );
                    done();
                }
            });
        src.next(1);
        src.next(2);
        side.next(0);
        src.next(3);
        side.next(1);
        src.next(4);
        src.next(5);
        side.done();
    });

    it("unsubscribe chain (from child)", () => {
        const part = src.subscribe(rs.sidechainPartition(side));
        const sub = part.subscribe({});
        sub.unsubscribe();
        assert.equal(src.getState(), rs.State.DONE);
        assert.equal(side.getState(), rs.State.DONE);
        assert.equal(part.getState(), rs.State.DONE);
        assert.equal(sub.getState(), rs.State.DONE);
    });
});
