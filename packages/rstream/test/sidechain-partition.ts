import * as assert from "assert";
import { sidechainPartition, State, Stream, stream } from "../src/index";

describe("SidechainPartition", function () {
    let src: Stream<any>, side: Stream<any>, buf: any[];

    beforeEach(() => {
        src = stream();
        side = stream();
        buf = [];
    });

    it("partitions (manual)", (done) => {
        src.subscribe(sidechainPartition(side)).subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepEqual(buf, [
                    [1, 2],
                    [3, 4, 5],
                ]);
                done();
            },
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
        src.subscribe(
            sidechainPartition(side, { pred: (x: any) => x === 1 })
        ).subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepEqual(buf, [
                    [1, 2, 3],
                    [4, 5],
                ]);
                done();
            },
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
        const part = src.subscribe(sidechainPartition(side));
        const sub = part.subscribe({});
        sub.unsubscribe();
        assert.equal(src.getState(), State.DONE);
        assert.equal(side.getState(), State.DONE);
        assert.equal(part.getState(), State.DONE);
        assert.equal(sub.getState(), State.DONE);
    });
});
