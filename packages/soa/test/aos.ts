import { equiv } from "@thi.ng/equiv";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { aos } from "../src/index.js"

group("aos", {
    basic: () => {
        const struct = aos(
            2,
            {
                a: { type: "u16", size: 1 }, // 2, 0
                b: { type: "f32", size: 2 }, // 8, 4
                c: { type: "u8", size: 1 }, // 1, 12
            },
            undefined,
            0x100
        );
        assert.ok(
            struct.buffers.a.buffer === struct.buffers.b.buffer &&
                struct.buffers.b.buffer === struct.buffers.c.buffer
        );
        assert.strictEqual(struct.specs.a.stride, 8);
        assert.strictEqual(struct.specs.b.stride, 4);
        assert.strictEqual(struct.specs.c.stride, 16);
        assert.strictEqual(struct.buffers.a.byteOffset, 0x100);
        assert.strictEqual(struct.buffers.b.byteOffset, 0x104);
        assert.strictEqual(struct.buffers.c.byteOffset, 0x10c);
        assert.strictEqual(struct.buffers.a.buffer.byteLength, 0x100 + 0x20);
        struct.setValues({
            a: [[0x1001], [0x2002]],
            b: [
                [1, 2],
                [3, 4],
            ],
            c: [[0xff], [0xfe]],
        });
        assert.ok(
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
        assert.strictEqual(struct.buffers.a[8], 0xaa55);
    },
});
