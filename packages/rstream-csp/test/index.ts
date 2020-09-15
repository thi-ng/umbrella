import * as csp from "@thi.ng/csp";
import * as rs from "@thi.ng/rstream";
import * as assert from "assert";
import { fromChannel } from "../src/index";

describe("fromChannel", function () {
    it("receives all values", (done) => {
        let ch = csp.Channel.range(5);
        let src = fromChannel(ch);
        let buf: number[] = [];
        src.subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepStrictEqual(buf, [0, 1, 2, 3, 4]);
                assert(ch.isClosed(), "channel not closed");
                assert.strictEqual(
                    src.getState(),
                    rs.State.DONE,
                    "stream not done"
                );
                done();
            },
        });
    });
});
