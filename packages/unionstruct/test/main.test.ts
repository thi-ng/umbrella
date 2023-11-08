import { expect, test } from "bun:test";
import { struct, union, type Field } from "../src/index.js";

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

test("sizes (aligned)", () => {
	expect(struct(i).__size).toBe(0x48);
	expect(union(u).__size).toBe(0x48);
	expect(struct(o).__size).toBe(0xc0);
});

test("sizes (unaligned)", () => {
	expect(struct(i, null, 0, false).__size).toBe(0x48);
	expect(union(u, null, 0, false).__size).toBe(0x48);
	expect(struct(o, null, 0, false).__size).toBe(0x70);
});

test("offsets (aligned)", () => {
	let oo = <any>struct(o);
	expect(oo.__offsets.u8).toBe(0x00);
	expect(oo.__offsets.un).toBe(0x40);
	expect(oo.un.__offsets.u16).toBe(0x40);
	expect(oo.un.__offsets.str).toBe(0x40);
	expect(oo.un.str.__offsets.f64).toBe(0x40);
	expect(oo.un.str.__offsets.u8).toBe(0x80);
	expect(oo.__offsets.u32).toBe(0xa0);
});

test("offsets (unaligned)", () => {
	let s = <any>struct(o, null, 0, false);
	expect(s.__offsets.u8).toBe(0x00);
	expect(s.__offsets.un).toBe(0x08);
	expect(s.un.__offsets.u16).toBe(0x08);
	expect(s.un.__offsets.str).toBe(0x08);
	expect(s.un.str.__offsets.f64).toBe(0x08);
	expect(s.un.str.__offsets.u8).toBe(0x48);
	expect(s.__offsets.u32).toBe(0x50);
});

test("values (aligned)", () => {
	let s = <any>struct(o);
	expect(((s.u8 = 0xff), s.u8)).toBe(0xff);
	expect(((s.un.u16 = 0xffff), s.un.u16)).toBe(0xffff);
	expect(((s.un.str.f64 = Math.PI), s.un.str.f64)).toBe(Math.PI);
	expect(s.un.u16).toBe(0x4009);
	expect(((s.un.str.u8 = 0xaa), s.un.str.u8)).toBe(0xaa);
	expect(((s.u32 = 0x87654321), s.u32)).toBe(0x87654321);
});

test("values (unaligned)", () => {
	let s = <any>struct(o, null, 0, false);
	expect(((s.u8 = 0xff), s.u8)).toBe(0xff);
	expect(((s.un.u16 = 0xffff), s.un.u16)).toBe(0xffff);
	expect(((s.un.str.f64 = Math.PI), s.un.str.f64)).toBe(Math.PI);
	expect(s.un.u16).toBe(0x4009);
	expect(((s.un.str.u8 = 0xaa), s.un.str.u8)).toBe(0xaa);
	expect(((s.u32 = 0x87654321), s.u32)).toBe(0x87654321);
});

test("bitfields (aligned)", () => {
	let s = <any>struct(bf);
	expect(((s.a = 1), s.a)).toBe(-1);
	expect(((s.b = 0x1f), s.b)).toBe(0x1f);
	expect(((s.c = 0x7654321), s.c)).toBe(0x3654321);
	expect(((s.d = 0xff654321), s.d)).toBe(0xf654321);
	expect(((s.e = 0x2), s.e)).toBe(-2);
	expect(((s.f = 2), s.f)).toBe(2);
	expect(s.e).toBe(-2);
	expect(s.d).toBe(0xf654321);
	expect(s.c).toBe(0x3654321);
	expect(s.b).toBe(0x1f);
	expect(s.a).toBe(-1);
});
