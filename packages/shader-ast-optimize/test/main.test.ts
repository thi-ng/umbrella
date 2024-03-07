import {
	add,
	div,
	float,
	mul,
	sub,
	vec2,
	type Term,
	pow,
	exp2,
} from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { expect, test } from "bun:test";
import { constantFolding } from "../src/index.js";

const glsl = targetGLSL();

const $ = (x: Term<any>) => glsl(constantFolding(x));

test("add", () => {
	expect($(add(float(0), float(0)))).toBe("0.0");
	expect($(add(float(0), float(1)))).toBe("1.0");
	expect($(add(float(1), float(0)))).toBe("1.0");
	expect($(add(float(1), float(1)))).toBe("2.0");
	expect($(add(float(1), float(-1)))).toBe("0.0");
	expect($(add(0, vec2(1, 2)))).toBe("vec2(1.0, 2.0)");
	expect($(add(vec2(1, 2), 0))).toBe("vec2(1.0, 2.0)");
});

test("sub", () => {
	expect($(sub(float(0), float(0)))).toBe("0.0");
	expect($(sub(float(0), float(1)))).toBe("-1.0");
	expect($(sub(float(1), float(0)))).toBe("1.0");
	expect($(sub(float(1), float(1)))).toBe("0.0");
	expect($(sub(float(1), float(-1)))).toBe("2.0");
	expect($(sub(0, vec2(1, 2)))).toBe("(-vec2(1.0, 2.0))");
	expect($(sub(vec2(1, 2), 0))).toBe("vec2(1.0, 2.0)");
});

test("mul", () => {
	expect($(mul(float(0), float(0)))).toBe("0.0");
	expect($(mul(float(0), float(1)))).toBe("0.0");
	expect($(mul(float(1), float(0)))).toBe("0.0");
	expect($(mul(float(1), float(1)))).toBe("1.0");
	expect($(mul(float(1), float(-1)))).toBe("-1.0");
	expect($(mul(0, vec2(1, 2)))).toBe("vec2(0.0)");
	expect($(mul(vec2(1, 2), 0))).toBe("vec2(0.0)");
});

test("div", () => {
	expect(() => $(div(float(0), float(0)))).toThrow();
	expect($(div(float(0), float(1)))).toBe("0.0");
	expect(() => $(div(float(1), float(0)))).toThrow();
	expect($(div(float(1), float(1)))).toBe("1.0");
	expect($(div(float(1), float(-1)))).toBe("-1.0");
	expect($(div(0, vec2(1, 2)))).toBe("vec2(0.0)");
	expect(() => $(div(vec2(1, 2), 0))).toThrow();
});

test("exp2", () => {
	expect($(exp2(float(0)))).toBe("1.0");
	expect($(exp2(float(1)))).toBe("2.0");
	expect($(exp2(vec2(0)))).toBe("vec2(1.0)");
	expect($(exp2(vec2(1)))).toBe("vec2(2.0)");
	expect($(exp2(vec2(2)))).toBe("exp2(vec2(2.0))");
});

test("pow", () => {
	expect($(pow(float(2), float(0)))).toBe("1.0");
	expect($(pow(float(2), float(1)))).toBe("2.0");
	expect($(pow(float(2), float(2)))).toBe("4.0");
	expect($(pow(vec2(2, 3), vec2(0)))).toBe("vec2(1.0)");
	expect($(pow(vec2(2, 3), vec2(1)))).toBe("vec2(2.0, 3.0)");
	expect($(pow(vec2(2, 3), vec2(2)))).toBe("pow(vec2(2.0, 3.0), vec2(2.0))");
});
