import { expect, test } from "bun:test";
import {
	TRUE,
	bvec2,
	defn,
	float,
	isTerm,
	ivec2,
	mul,
	ret,
	sym,
	texture,
	vec2,
	vec3,
	type Lit,
	type Sym,
} from "../src/index.js";

test("op2 type infer mulvv", () => {
	expect<any>(mul(vec2(), vec2())).toEqual({
		tag: "op2",
		type: "vec2",
		info: undefined,
		op: "*",
		l: {
			tag: "lit",
			type: "vec2",
			info: "n",
			val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
		},
		r: {
			tag: "lit",
			type: "vec2",
			info: "n",
			val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
		},
	});
});

test("op2 type infer mulnv", () => {
	expect<any>(mul(1, vec2())).toEqual({
		tag: "op2",
		type: "vec2",
		info: "nv",
		op: "*",
		l: { tag: "lit", type: "float", info: undefined, val: 1 },
		r: {
			tag: "lit",
			type: "vec2",
			info: "n",
			val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
		},
	});
});

test("op2 type infer mulvn", () => {
	expect<any>(mul(vec2(), 1)).toEqual({
		tag: "op2",
		type: "vec2",
		info: "vn",
		op: "*",
		l: {
			tag: "lit",
			type: "vec2",
			info: "n",
			val: [{ tag: "lit", type: "float", info: undefined, val: 0 }],
		},
		r: { tag: "lit", type: "float", info: undefined, val: 1 },
	});
});

test("isTerm", () => {
	expect(isTerm({ tag: "lit", type: "float", val: 1 })).toBeTrue();
	expect(isTerm(float(1))).toBeTrue();
	expect(isTerm(null)).toBeFalse();
	expect(isTerm(undefined)).toBeFalse();
	expect(isTerm({})).toBeFalse();
	expect(isTerm(1)).toBeFalse();
});

test("defn deps", () => {
	const foo = defn("bool", "foo", [], () => [ret(TRUE)]);
	const bar = defn("float", "bar", [], () => [ret(float(foo()))]);
	expect(bar.deps.length).toBe(1);
	expect(bar.deps[0].id).toBe("foo");
});

test("vec2 ctor", () => {
	expect(vec2()).toEqual(<Lit<"vec2">>{
		tag: "lit",
		type: "vec2",
		info: "n",
		val: [
			{
				info: undefined,
				tag: "lit",
				type: "float",
				val: 0,
			},
		],
	});
	expect(vec2(1)).toEqual(<Lit<"vec2">>{
		tag: "lit",
		type: "vec2",
		info: "n",
		val: [
			{
				info: undefined,
				tag: "lit",
				type: "float",
				val: 1,
			},
		],
	});
	expect(vec2(1, 2)).toEqual(<Lit<"vec2">>{
		tag: "lit",
		type: "vec2",
		info: undefined,
		val: [
			{
				info: undefined,
				tag: "lit",
				type: "float",
				val: 1,
			},
			{
				info: undefined,
				tag: "lit",
				type: "float",
				val: 2,
			},
		],
	});
	expect(vec2(bvec2(true))).toEqual(<Lit<"vec2">>{
		tag: "lit",
		type: "vec2",
		info: "b",
		val: [
			{
				info: "n",
				tag: "lit",
				type: "bvec2",
				val: [
					{
						info: undefined,
						tag: "lit",
						type: "bool",
						val: true,
					},
				],
			},
		],
	});
	expect(vec2(ivec2(1))).toEqual(<Lit<"vec2">>{
		tag: "lit",
		type: "vec2",
		info: "i",
		val: [
			{
				info: "n",
				tag: "lit",
				type: "ivec2",
				val: [
					{
						info: undefined,
						tag: "lit",
						type: "int",
						val: 1,
					},
				],
			},
		],
	});
});

test("texture", () => {
	const s2d = sym("sampler2D", "tex");
	const s3d = sym("sampler3D", "tex");
	const args2d = [
		{
			id: "tex",
			init: undefined,
			opts: {},
			tag: "sym",
			type: "sampler2D",
		},
		{
			info: "n",
			tag: "lit",
			type: "vec2",
			val: [
				{
					info: undefined,
					tag: "lit",
					type: "float",
					val: 0,
				},
			],
		},
	];
	expect<any>(texture(s2d, vec2())).toEqual({
		args: args2d,
		id: "texture",
		tag: "call_i",
		type: "vec4",
	});
	expect<any>(texture(s2d, vec2(), float(1))).toEqual({
		args: [
			...args2d,
			{
				info: undefined,
				tag: "lit",
				type: "float",
				val: 1,
			},
		],
		id: "texture",
		tag: "call_i",
		type: "vec4",
	});
	expect<any>(texture(s3d, vec3())).toEqual({
		args: [
			{
				id: "tex",
				init: undefined,
				opts: {},
				tag: "sym",
				type: "sampler3D",
			},
			{
				info: "n",
				tag: "lit",
				type: "vec3",
				val: [
					{
						info: undefined,
						tag: "lit",
						type: "float",
						val: 0,
					},
				],
			},
		],
		id: "texture",
		tag: "call_i",
		type: "vec4",
	});
});

test("type infer of defn", () => {
	const f = defn(
		"void",
		undefined,
		[],
		() => []
	);
	const g = defn(
		"void",
		undefined,
		["float", "int"],
		(x, y) => {
			const a: Sym<"float"> = x;
			const b: Sym<"int"> = y;
			return [a, b];
		}
	);
	const h = defn(
		"void",
		undefined,
		["int", ["float", "x"]],
		(x, y) => {
			const a: Sym<"int"> = x;
			const b: Sym<"float"> = y;
			return [a, b];
		}
	);
	f();
	g(sym("float"), sym("int"));
	h(sym("int"), sym("float"));
});
