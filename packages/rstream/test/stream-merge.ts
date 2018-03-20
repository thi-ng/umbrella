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
        src = new rs.StreamMerge<number, number>({
            src: [
                rs.fromIterable([1, 2]),
                rs.fromIterable([10, 20, 30, 40]),
                rs.fromIterable([100, 200, 300])
            ]
        });
    });

    it("merges all inputs", (done) => {
        src.subscribe(
            check([1, 2, 10, 20, 30, 40, 100, 200, 300], done)
        );
    });

    it("merges dynamic inputs", (done) => {
        src = new rs.StreamMerge();
        src.add(rs.fromIterable([1, 2, 3, 4], 10));
        src.add(rs.fromIterable([10, 20], 5));
        src.subscribe(check([1, 2, 3, 4, 10, 20], done));
    });

    it("merges dynamic inputs (synchronous)", (done) => {
        src = new rs.StreamMerge({ close: false });
        src.subscribe(check([1, 2, 3, 4, 10, 20], done));
        src.add(rs.fromIterableSync([1, 2, 3, 4]));
        src.add(rs.fromIterableSync([10, 20]));
        src.done();
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
        src = new rs.StreamMerge<number, number>({
            src: [
                rs.fromIterable([1, 2]),
                rs.fromIterable([10, 20])
            ],
            xform: tx.mapcat((x: number) => [x, x + 1])
        });
        src.subscribe(check([1, 2, 2, 3, 10, 11, 20, 21], done));
    });

    it("transducer streams", (done) => {
        const sources = [
            rs.fromIterable([1, 2, 3]),
            rs.fromIterable([4, 5, 6]),
        ].map(
            (s) => s.subscribe(tx.map(x => rs.fromIterable([x, x, x])))
        );
        const merge = new rs.StreamMerge({ src: sources });
        const histogram = tx.frequencies();
        let acc: any = histogram[0]();
        merge.subscribe({
            next(x) { acc = histogram[2](acc, x) },
            done() {
                assert.deepEqual(acc, new Map([[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]]));
                done();
            }
        })
    });
});
