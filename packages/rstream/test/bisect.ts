import * as tx from "@thi.ng/transducers";
import * as assert from "assert";

import * as rs from "../src/index";

describe("bisect", () => {
    let src: rs.Stream<number>;

    beforeEach(() => {
        src = rs.fromIterable([1, 2, 3, 4]);
    });

    it("raw subscribers", (done) => {
        const odds = [], evens = [];
        src.subscribe(
            rs.bisect<number>((x) => !!(x & 1),
                { next(x) { odds.push(x) } },
                { next(x) { evens.push(x) } }
            )
        );
        src.subscribe({
            done() {
                assert.deepEqual(odds, [1, 3]);
                assert.deepEqual(evens, [2, 4]);
                done();
            }
        });
    });

    it("subs", (done) => {
        const odds = [], evens = [];
        const subo = new rs.Subscription<number, number>(
            { next(x) { odds.push(x) }, done() { doneCount++; } },
            tx.map<number, number>(x => x * 10)
        );
        const sube = new rs.Subscription<number, number>(
            { next(x) { evens.push(x) }, done() { doneCount++; } },
            tx.map<number, number>(x => x * 100)
        );
        let doneCount = 0;
        src.subscribe(rs.bisect((x) => !!(x & 1), subo, sube));
        src.subscribe({
            done() {
                assert.deepEqual(odds, [10, 30]);
                assert.deepEqual(evens, [200, 400]);
                assert.equal(doneCount, 2);
                done();
            }
        });
    });
});