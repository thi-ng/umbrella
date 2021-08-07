import { XsAdd } from "@thi.ng/random";
import * as assert from "assert";
import { AKSUID, defKSUID, defKSUID64 } from "../src";

describe("ksuid", () => {
    const check = (id: AKSUID, eps: number, buf: Uint8Array) => {
        const t = Date.now();
        const a = id.timeOnly(t);
        assert.strictEqual(a.length, 27);
        let res = id.parse(a);
        assert(Math.abs(res.epoch - t) < eps * 2);
        assert.deepStrictEqual(res.id, new Uint8Array(20 - id.epochSize));
        const b = id.nextBinary();
        assert.deepStrictEqual(b.slice(id.epochSize), buf);
        res = id.parse(id.format(b));
        assert(Math.abs(res.epoch - t) < eps * 2);
        assert.deepStrictEqual(res.id, buf);
    };

    it("ksuid32", () => {
        check(
            defKSUID({ rnd: new XsAdd(0xdecafbad) }),
            1000,
            new Uint8Array([
                170, 213, 122, 63, 189, 122, 161, 143, 91, 187, 80, 231, 61, 17,
                112, 238,
            ])
        );
    });

    it("ksuid64", () => {
        check(
            defKSUID64({ rnd: new XsAdd(0xdecafbad) }),
            1,
            new Uint8Array([
                189, 122, 161, 143, 91, 187, 80, 231, 61, 17, 112, 238,
            ])
        );
    });
});
