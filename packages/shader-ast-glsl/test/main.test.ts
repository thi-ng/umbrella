import {
	$,
	FALSE,
	TRUE,
	bool,
	float,
	input,
	int,
	output,
	scope,
	sym,
	uint,
	uniform,
	vec2,
	vec3,
	vec4,
	type IVec,
	type Term,
	type Vec,
} from "@thi.ng/shader-ast";
import { expect, test } from "bun:test";
import { GLSLVersion, targetGLSL } from "../src/index.js";

const vs100 = targetGLSL({
	type: "vs",
	version: GLSLVersion.GLES_100,
	versionPragma: false,
});
const fs100 = targetGLSL({
	type: "fs",
	version: GLSLVersion.GLES_100,
	versionPragma: false,
});
const vs300 = targetGLSL({ type: "vs", versionPragma: false });
const fs300 = targetGLSL({ type: "fs", versionPragma: false });

const V2 = sym("vec2", "v");
const V3 = sym("vec3", "v");
const V4 = sym("vec4", "v");

test("lit", () => {
	expect(fs300(TRUE)).toBe("true");
	expect(fs300(FALSE)).toBe("false");
	expect(fs300(bool(1))).toBe("true");
	expect(fs300(bool(int(1)))).toBe("bool(1)");
	expect(fs300(bool(uint(1)))).toBe("bool(1u)");
	expect(fs300(bool(float(1)))).toBe("bool(1.0)");
	expect(fs300(float(0))).toBe("0.0");
	expect(fs300(float(-1))).toBe("-1.0");
	expect(fs300(float(uint(1)))).toBe("float(1u)");
	expect(fs300(float(3.1415))).toBe("3.1415");
	expect(fs300(int(false))).toBe("0");
	expect(fs300(int(true))).toBe("1");
	expect(fs300(int(0))).toBe("0");
	expect(fs300(int(-1))).toBe("-1");
	expect(fs300(int(3.1415))).toBe("3");
	expect(fs300(uint(false))).toBe("0u");
	expect(fs300(uint(true))).toBe("1u");
	expect(fs300(uint(0))).toBe("0u");
	expect(fs300(uint(-1))).toBe("4294967295u");
	expect(fs300(uint(3.1415))).toBe("3u");
});

test("vec2", () => {
	expect(fs300(vec2())).toBe("vec2(0.0)");
	expect(fs300(vec2(1))).toBe("vec2(1.0)");
	expect(fs300(vec2(1, -2))).toBe("vec2(1.0, -2.0)");
});

test("vec3", () => {
	expect(fs300(vec3())).toBe("vec3(0.0)");
	expect(fs300(vec3(1))).toBe("vec3(1.0)");
	expect(fs300(vec3(1, -2, 3.14))).toBe("vec3(1.0, -2.0, 3.14)");
	expect(fs300(vec3(vec2(1, -2), 3.14))).toBe("vec3(vec2(1.0, -2.0), 3.14)");
});

test("vec4", () => {
	expect(fs300(vec4())).toBe("vec4(0.0)");
	expect(fs300(vec4(1))).toBe("vec4(1.0)");
	expect(fs300(vec4(1, -2, 3.14, -4))).toBe("vec4(1.0, -2.0, 3.14, -4.0)");
	expect(fs300(vec4(vec2(1, -2), vec2(3.14)))).toBe(
		"vec4(vec2(1.0, -2.0), vec2(3.14))"
	);
	expect(fs300(vec4(vec3(1, -2, 0), 3.14))).toBe(
		"vec4(vec3(1.0, -2.0, 0.0), 3.14)"
	);
});

test("swizzle", () => {
	const check = (v: Term<Vec | IVec>, pat: string) => {
		const res = $(<any>v, <any>pat);
		expect<string>(res.type).toBe(
			pat.length > 1 ? "vec" + pat.length : "float"
		);
		expect(fs300(res)).toBe("v." + pat);
	};
	check(V2, "y");
	check(V2, "yx");
	check(V2, "yxy");
	check(V2, "yxyx");
	check(V3, "z");
	check(V3, "zy");
	check(V3, "zyx");
	check(V3, "zyxz");
	check(V4, "w");
	check(V4, "wz");
	check(V4, "wzy");
	check(V4, "wzyx");
});

test("inputs", () => {
	[
		[
			input("vec3", "a"),
			"attribute vec3 a;",
			"in vec3 a;",
			"varying vec3 a;",
			"in vec3 a;",
		],
		[
			input("vec3", "a", { loc: 1 }),
			"attribute vec3 a;",
			"layout(location=1) in vec3 a;",
			"varying vec3 a;",
			"layout(location=1) in vec3 a;",
		],
		[
			input("vec3", "a", { loc: 1, num: 3 }),
			"attribute vec3 a[3];",
			"layout(location=1) in vec3 a[3];",
			"varying vec3 a[3];",
			"layout(location=1) in vec3 a[3];",
		],
	].forEach(([inp, v100, v300, f100, f300]: any) => {
		const spec = scope([inp], true);
		expect(vs100(spec)).toBe(v100);
		expect(vs300(spec)).toBe(v300);
		expect(fs100(spec)).toBe(f100);
		expect(fs300(spec)).toBe(f300);
	});
});

test("uniforms", () => {
	[
		[uniform("vec3", "a"), "uniform vec3 a;", "uniform vec3 a;"],
		[
			uniform("vec3", "a", { loc: 1 }),
			"uniform vec3 a;",
			"layout(location=1) uniform vec3 a;",
		],
		[
			uniform("vec3", "a", { loc: 1, num: 3 }),
			"uniform vec3 a[3];",
			"layout(location=1) uniform vec3 a[3];",
		],
	].forEach(([uni, gl100, gl300]: any) => {
		const spec = scope([uni], true);
		expect(vs100(spec)).toBe(gl100);
		expect(vs300(spec)).toBe(gl300);
		expect(fs100(spec)).toBe(gl100);
		expect(fs300(spec)).toBe(gl300);
	});
});

test("outputs", () => {
	[
		[output("vec3", "a"), "varying vec3 a;", "out vec3 a;", "out vec3 a;"],
		[
			output("vec3", "a", { loc: 1 }),
			"varying vec3 a;",
			"layout(location=1) out vec3 a;",
			"layout(location=1) out vec3 a;",
		],
		[
			output("vec3", "a", { loc: 1, num: 3 }),
			"varying vec3 a[3];",
			"layout(location=1) out vec3 a[3];",
			"layout(location=1) out vec3 a[3];",
		],
	].forEach(([out, v100, v300, f300]: any) => {
		const spec = scope([out], true);
		expect(vs100(spec)).toBe(v100);
		expect(vs300(spec)).toBe(v300);
		expect(() => fs100(spec)).toThrow();
		expect(fs300(spec)).toBe(f300);
	});
});
