import * as tx from "@thi.ng/transducers";
import * as assert from "assert";

import * as rs from "../src/index";

describe("StreamMerge", () => {

    let src: rs.StreamMerge<number, number>;

    let check = (expected, done) => {
        let buf = [];
        return {
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepEqual(buf.sort((a, b) => a - b), expected);
                done();
            }
        };
    };

    beforeEach(() => {
        src = new rs.StreamMerge([
            rs.fromIterable([1, 2]),
            rs.fromIterable([10, 20, 30, 40]),
            rs.fromIterable([100, 200, 300])
        ]);
    });

    it("merges all inputs", (done) => {
        src.subscribe(
            check([1, 2, 10, 20, 30, 40, 100, 200, 300], done)
        );
    });

    it("merges dynamic inputs", (done) => {
        src = new rs.StreamMerge([]);
        src.add(rs.fromIterable([1, 2, 3, 4], 10));
        src.add(rs.fromIterable([10, 20], 5));
        src.subscribe(check([1, 2, 3, 4, 10, 20], done));
    });

    it("stops when no more subs", () => {
        assert(src.getState() === rs.State.IDLE);
        let sub1 = src.subscribe({});
        let sub2 = src.subscribe({});
        sub1.unsubscribe();
        assert(src.getState() === rs.State.ACTIVE);
        sub2.unsubscribe();
        assert(src.getState() === rs.State.DONE);
    });

    it("applies transducer", (done) => {
        src = new rs.StreamMerge(
            [
                rs.fromIterable([1, 2]),
                rs.fromIterable([10, 20])
            ],
            tx.mapcat((x: number) => [x, x + 1])
        );
        src.subscribe(check([1, 2, 2, 3, 10, 11, 20, 21], done));
    });

});
