// import * as tx from "@thi.ng/transducers";
import * as assert from "assert";

import * as rs from "../src/index";

describe("Subscription", () => {
    let src: rs.Stream<number>;

    beforeEach(() => {
    });

    it("new sub receives last", (done) => {
        let buf = [];
        src = rs.fromIterable([1, 2, 3], 10);
        src.subscribe({ next(x) { buf.push(x); } });
        setTimeout(() =>
            src.subscribe({
                next(x) { buf.push(x); },
                done() {
                    assert.deepEqual(buf, [1, 2, 2, 3, 3]);
                    done();
                }
            }),
            25);
    });
});