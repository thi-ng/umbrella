import * as tx from "@thi.ng/transducers";
import * as assert from "assert";

import * as rs from "../src/index";

describe("transducers", () => {
    let src: rs.Stream<number>;
    let data = [10, 20, 30];

    let check = (expected, done) => {
        let buf = [];
        return {
            next(x) { buf.push(x) },
            done() {
                assert.deepEqual(buf, expected);
                done();
            }
        };
    };

    beforeEach(() => {
        src = rs.fromIterable(data);
    });

    it("works chained", (done) => {
        src.subscribe(tx.map((x: number) => x * 10))
            .subscribe(tx.map((x: number) => x + 1))
            .subscribe(check([101, 201, 301], done));
    });

    it("works combined", (done) => {
        src.subscribe(
            check([101, 201, 301], done),
            tx.comp(
                tx.map((x: number) => x * 10),
                tx.map((x: number) => x + 1)
            )
        );
    });

    it("does early termination", (done) => {
        src.subscribe(
            check([data[0], data[1]], done),
            tx.take(2)
        );
    });

    it("emits multiple values", (done) => {
        src.subscribe(
            check([10, 10, 20], done),
            tx.comp(
                tx.mapcat(x => [x, x]),
                tx.take(3)
            )
        );
    });

    it("filters values", (done) => {
        src.subscribe(
            check([10, 30], done),
            tx.filter((x: number) => (x % 20) > 0),
        );
    });

});