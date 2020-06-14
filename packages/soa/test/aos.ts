import { Type } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { aos } from "../src";

describe("aos", () => {
    it("basic", () => {
        const struct = aos(
            2,
            {
                a: { type: Type.U16, size: 1 }, // 2, 0
                b: { type: Type.F32, size: 2 }, // 8, 4
                c: { type: Type.U8, size: 1 }, // 1, 12
            },
            undefined,
            0x100
        );
        assert(
            struct.buffers.a.buffer === struct.buffers.b.buffer &&
                struct.buffers.b.buffer === struct.buffers.c.buffer
        );
        assert.equal(struct.specs.a.stride, 8);
        assert.equal(struct.specs.b.stride, 4);
        assert.equal(struct.specs.c.stride, 16);
        assert.equal(struct.buffers.a.byteOffset, 0x100);
        assert.equal(struct.buffers.b.byteOffset, 0x104);
        assert.equal(struct.buffers.c.byteOffset, 0x10c);
        assert.equal(struct.buffers.a.buffer.byteLength, 0x100 + 0x20);
        struct.setValues({
            a: [[0x1001], [0x2002]],
            b: [
                [1, 2],
                [3, 4],
            ],
            c: [[0xff], [0xfe]],
        });
        assert(
            equiv(
                [...struct.values()],
                [
                    { a: [0x1001], b: [1, 2], c: [0xff] },
                    { a: [0x2002], b: [3, 4], c: [0xfe] },
                ]
            )
        );
        const x = struct.index(1);
        x.a[0] = 0xaa55;
        assert.equal(struct.buffers.a[8], 0xaa55);
    });
});
