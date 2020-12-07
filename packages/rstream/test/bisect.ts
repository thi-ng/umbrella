import { map } from "@thi.ng/transducers";
import * as assert from "assert";
import { bisect, fromIterable, Stream, subscription } from "../src";

// prettier-ignore
describe("bisect", () => {
    let src: Stream<number>;

    beforeEach(() => {
        src = fromIterable([1, 2, 3, 4]);
    });

    it("raw subscribers", (done) => {
        const odds: number[] = [], evens: number[] = [];
        src.subscribe(
            bisect<number>((x) => !!(x & 1),
                { next(x) { odds.push(x) } },
                { next(x) { evens.push(x) } }
            )
        );
        src.subscribe({
            done() {
                assert. deepStrictEqual(odds, [1, 3]);
                assert. deepStrictEqual(evens, [2, 4]);
                done();
            }
        });
    });

    it("subs", (done) => {
        const odds: number[] = [], evens: number[] = [];
        const subo = subscription<number, number>(
            { next(x) { odds.push(x) }, done() { doneCount++; } },
            { xform: map<number, number>(x => x * 10) }
        );
        const sube = subscription<number, number>(
            { next(x) { evens.push(x) }, done() { doneCount++; } },
            { xform: map<number, number>(x => x * 100) }
        );
        let doneCount = 0;
        src.subscribe(bisect((x) => !!(x & 1), subo, sube));
        src.subscribe({
            done() {
                assert. deepStrictEqual(odds, [10, 30]);
                assert. deepStrictEqual(evens, [200, 400]);
                assert.strictEqual(doneCount, 2);
                done();
            }
        });
    });
});
