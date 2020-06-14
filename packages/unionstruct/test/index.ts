import { Field, union, struct } from "../src/index";
import * as assert from "assert";

describe("nested struct + union", () => {
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
    it("sizes (aligned)", () => {
        assert.equal(struct(i).__size, 0x48, "inner");
        assert.equal(union(u).__size, 0x48, "union");
        assert.equal(struct(o).__size, 0xc0, "outer");
    });
    it("sizes (unaligned)", () => {
        assert.equal(struct(i, null, 0, false).__size, 0x48, "inner");
        assert.equal(union(u, null, 0, false).__size, 0x48, "union");
        assert.equal(struct(o, null, 0, false).__size, 0x70, "outer");
    });
    it("offsets (aligned)", () => {
        let oo = <any>struct(o);
        assert.equal(oo.__offsets.u8, 0x00, "o.u8");
        assert.equal(oo.__offsets.un, 0x40, "o.un");
        assert.equal(oo.un.__offsets.u16, 0x40, "o.un.u16");
        assert.equal(oo.un.__offsets.str, 0x40, "o.un.str");
        assert.equal(oo.un.str.__offsets.f64, 0x40, "o.un.str.f64");
        assert.equal(oo.un.str.__offsets.u8, 0x80, "o.un.str.u8");
        assert.equal(oo.__offsets.u32, 0xa0, "o.u32");
    });
    it("offsets (unaligned)", () => {
        let s = <any>struct(o, null, 0, false);
        assert.equal(s.__offsets.u8, 0x00, "o.u8");
        assert.equal(s.__offsets.un, 0x08, "o.un");
        assert.equal(s.un.__offsets.u16, 0x08, "o.un.u16");
        assert.equal(s.un.__offsets.str, 0x08, "o.un.str");
        assert.equal(s.un.str.__offsets.f64, 0x08, "o.un.str.f64");
        assert.equal(s.un.str.__offsets.u8, 0x48, "o.un.str.u8");
        assert.equal(s.__offsets.u32, 0x50, "o.u32");
    });
    it("values (aligned)", () => {
        let s = <any>struct(o);
        assert.equal(((s.u8 = 0xff), s.u8), 0xff, "o.u8");
        assert.equal(((s.un.u16 = 0xffff), s.un.u16), 0xffff, "o.un.u16");
        assert.equal(
            ((s.un.str.f64 = Math.PI), s.un.str.f64),
            Math.PI,
            "o.un.str.f64"
        );
        assert.equal(s.un.u16, 0x4009, "o.un.u16 (2)");
        assert.equal(((s.un.str.u8 = 0xaa), s.un.str.u8), 0xaa, "o.un.str.u8");
        assert.equal(((s.u32 = 0x87654321), s.u32), 0x87654321, "o.u32");
    });
    it("values (unaligned)", () => {
        let s = <any>struct(o, null, 0, false);
        assert.equal(((s.u8 = 0xff), s.u8), 0xff, "o.u8");
        assert.equal(((s.un.u16 = 0xffff), s.un.u16), 0xffff, "o.un.u16");
        assert.equal(
            ((s.un.str.f64 = Math.PI), s.un.str.f64),
            Math.PI,
            "o.un.str.f64"
        );
        assert.equal(s.un.u16, 0x4009, "o.un.u16 (2)");
        assert.equal(((s.un.str.u8 = 0xaa), s.un.str.u8), 0xaa, "o.un.str.u8");
        assert.equal(((s.u32 = 0x87654321), s.u32), 0x87654321, "o.u32");
    });
    it("bitfields (aligned)", () => {
        let s = <any>struct(bf);
        assert.equal(((s.a = 1), s.a), -1, "s.a");
        assert.equal(((s.b = 0x1f), s.b), 0x1f, "s.b");
        assert.equal(((s.c = 0x7654321), s.c), 0x3654321, "s.c");
        assert.equal(((s.d = 0xff654321), s.d), 0xf654321, "s.d");
        assert.equal(((s.e = 0x2), s.e), -2, "s.e");
        assert.equal(((s.f = 2), s.f), 2, "s.f");
        assert.equal(s.e, -2, "s.e (read)");
        assert.equal(s.d, 0xf654321, "s.d (read)");
        assert.equal(s.c, 0x3654321, "s.c (read)");
        assert.equal(s.b, 0x1f, "s.b (read)");
        assert.equal(s.a, -1, "s.a (read)");
    });
});
