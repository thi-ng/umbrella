import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { Field, struct, union } from "../src/index.js"

let i = <Field[]>[
    ["f64", "f64"],
    ["u8", "u8"],
];
let u = <Field[]>[
    ["u16", "u16"],
    ["str", "struct", i],
];
let o = <Field[]>[
    ["u8", "u8"],
    ["un", "union", u],
    ["u32", "u32"],
];
let bf = <Field[]>[
    ["a", "i32", 1],
    ["b", "u32", 5],
    ["c", "u32", 26],
    ["d", "u32", 28],
    ["e", "i32", 2],
    ["f", "f32"],
];

group("nested struct + union", {
    "sizes (aligned)": () => {
        assert.strictEqual(struct(i).__size, 0x48, "inner");
        assert.strictEqual(union(u).__size, 0x48, "union");
        assert.strictEqual(struct(o).__size, 0xc0, "outer");
    },

    "sizes (unaligned)": () => {
        assert.strictEqual(struct(i, null, 0, false).__size, 0x48, "inner");
        assert.strictEqual(union(u, null, 0, false).__size, 0x48, "union");
        assert.strictEqual(struct(o, null, 0, false).__size, 0x70, "outer");
    },

    "offsets (aligned)": () => {
        let oo = <any>struct(o);
        assert.strictEqual(oo.__offsets.u8, 0x00, "o.u8");
        assert.strictEqual(oo.__offsets.un, 0x40, "o.un");
        assert.strictEqual(oo.un.__offsets.u16, 0x40, "o.un.u16");
        assert.strictEqual(oo.un.__offsets.str, 0x40, "o.un.str");
        assert.strictEqual(oo.un.str.__offsets.f64, 0x40, "o.un.str.f64");
        assert.strictEqual(oo.un.str.__offsets.u8, 0x80, "o.un.str.u8");
        assert.strictEqual(oo.__offsets.u32, 0xa0, "o.u32");
    },

    "offsets (unaligned)": () => {
        let s = <any>struct(o, null, 0, false);
        assert.strictEqual(s.__offsets.u8, 0x00, "o.u8");
        assert.strictEqual(s.__offsets.un, 0x08, "o.un");
        assert.strictEqual(s.un.__offsets.u16, 0x08, "o.un.u16");
        assert.strictEqual(s.un.__offsets.str, 0x08, "o.un.str");
        assert.strictEqual(s.un.str.__offsets.f64, 0x08, "o.un.str.f64");
        assert.strictEqual(s.un.str.__offsets.u8, 0x48, "o.un.str.u8");
        assert.strictEqual(s.__offsets.u32, 0x50, "o.u32");
    },

    "values (aligned)": () => {
        let s = <any>struct(o);
        assert.strictEqual(((s.u8 = 0xff), s.u8), 0xff, "o.u8");
        assert.strictEqual(((s.un.u16 = 0xffff), s.un.u16), 0xffff, "o.un.u16");
        assert.strictEqual(
            ((s.un.str.f64 = Math.PI), s.un.str.f64),
            Math.PI,
            "o.un.str.f64"
        );
        assert.strictEqual(s.un.u16, 0x4009, "o.un.u16 (2)");
        assert.strictEqual(
            ((s.un.str.u8 = 0xaa), s.un.str.u8),
            0xaa,
            "o.un.str.u8"
        );
        assert.strictEqual(((s.u32 = 0x87654321), s.u32), 0x87654321, "o.u32");
    },

    "values (unaligned)": () => {
        let s = <any>struct(o, null, 0, false);
        assert.strictEqual(((s.u8 = 0xff), s.u8), 0xff, "o.u8");
        assert.strictEqual(((s.un.u16 = 0xffff), s.un.u16), 0xffff, "o.un.u16");
        assert.strictEqual(
            ((s.un.str.f64 = Math.PI), s.un.str.f64),
            Math.PI,
            "o.un.str.f64"
        );
        assert.strictEqual(s.un.u16, 0x4009, "o.un.u16 (2)");
        assert.strictEqual(
            ((s.un.str.u8 = 0xaa), s.un.str.u8),
            0xaa,
            "o.un.str.u8"
        );
        assert.strictEqual(((s.u32 = 0x87654321), s.u32), 0x87654321, "o.u32");
    },

    "bitfields (aligned)": () => {
        let s = <any>struct(bf);
        assert.strictEqual(((s.a = 1), s.a), -1, "s.a");
        assert.strictEqual(((s.b = 0x1f), s.b), 0x1f, "s.b");
        assert.strictEqual(((s.c = 0x7654321), s.c), 0x3654321, "s.c");
        assert.strictEqual(((s.d = 0xff654321), s.d), 0xf654321, "s.d");
        assert.strictEqual(((s.e = 0x2), s.e), -2, "s.e");
        assert.strictEqual(((s.f = 2), s.f), 2, "s.f");
        assert.strictEqual(s.e, -2, "s.e (read)");
        assert.strictEqual(s.d, 0xf654321, "s.d (read)");
        assert.strictEqual(s.c, 0x3654321, "s.c (read)");
        assert.strictEqual(s.b, 0x1f, "s.b (read)");
        assert.strictEqual(s.a, -1, "s.a (read)");
    },
});
