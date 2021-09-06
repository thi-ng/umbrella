import { equiv } from "@thi.ng/equiv";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { soa } from "../src";

group("soa", {
    basic: () => {
        const struct = soa(2, {
            a: { type: "u16" },
            b: { size: 2, default: [1, 2] },
            c: { type: "i8", size: 2, default: [-3, 4] },
        });
        assert.strictEqual(struct.length, 2);
        assert.deepStrictEqual(struct.keys(), ["a", "b", "c"]);
        assert.ok(struct.buffers.a instanceof Uint16Array);
        assert.strictEqual(struct.buffers.a.length, 2);
        assert.ok(struct.buffers.b instanceof Float32Array);
        assert.strictEqual(struct.buffers.b.length, 4);
        assert.ok(struct.buffers.c instanceof Int8Array);
        assert.strictEqual(struct.buffers.c.length, 4);
        assert.ok(
            equiv(
                [...struct.values()],
                [
                    { a: [0], b: [1, 2], c: [-3, 4] },
                    { a: [0], b: [1, 2], c: [-3, 4] },
                ]
            )
        );
    },

    copy: () => {
        const src = soa(2, {
            a: { type: "u16" },
            b: { size: 2, default: [1, 2] },
            c: { type: "i8", size: 2, default: [-3, 4] },
        });
        const dest = soa(4, {
            a: { type: "u16", default: [0xaa55] },
            b: { size: 2 },
            c: { type: "i8", size: 2 },
        });
        src.copyTo(dest, undefined, 2);
        assert.ok(
            equiv(
                [...dest.values()],
                [
                    { a: [0xaa55], b: [0, 0], c: [0, 0] },
                    { a: [0xaa55], b: [0, 0], c: [0, 0] },
                    { a: [0], b: [1, 2], c: [-3, 4] },
                    { a: [0], b: [1, 2], c: [-3, 4] },
                ]
            )
        );
    },
});
