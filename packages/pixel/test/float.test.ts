import { expect, test } from "bun:test";
import {
	FLOAT_GRAY,
	FLOAT_GRAY_ALPHA,
	FLOAT_RGB,
	FLOAT_RGBA,
} from "../src/index.js";

test("FLOAT_GRAY", () => {
	expect(FLOAT_GRAY.fromABGR(0x80333333)).toEqual([0.2]);
	expect(FLOAT_GRAY.fromABGR(0x80666666)).toEqual([0.4]);
	expect(FLOAT_GRAY.fromABGR(0x80999999)).toEqual([0.6]);
	expect(FLOAT_GRAY.fromABGR(0x80cccccc)).toEqual([0.8]);
	expect(FLOAT_GRAY.fromABGR(0x80ffffff)).toEqual([1]);
	expect(FLOAT_GRAY.toABGR([0.25])).toBe(0xff404040);
	expect(FLOAT_GRAY.toABGR([0.5])).toBe(0xff808080);
	expect(FLOAT_GRAY.toABGR([0.75])).toBe(0xffbfbfbf);
});

test("FLOAT_GRAY_ALPHA", () => {
	expect(FLOAT_GRAY_ALPHA.fromABGR(0x80333333)).toEqual([
		0.2, 0.5019607843137255,
	]);
	expect(FLOAT_GRAY_ALPHA.fromABGR(0x666666)).toEqual([0.4, 0]);
	expect(FLOAT_GRAY_ALPHA.fromABGR(0xff999999)).toEqual([0.6, 1]);
	expect(FLOAT_GRAY_ALPHA.toABGR([0.25, 0])).toBe(0x00404040);
	expect(FLOAT_GRAY_ALPHA.toABGR([0.5, 0.5])).toBe(0x80808080);
	expect(FLOAT_GRAY_ALPHA.toABGR([0.75, 1])).toBe(0xffbfbfbf);
});

test("FLOAT_RGB", () => {
	expect(FLOAT_RGB.fromABGR(0x80336699)).toEqual([0.6, 0.4, 0.2]);
	expect(FLOAT_RGB.fromABGR(0xff00ff00)).toEqual([0, 1, 0]);
	expect(FLOAT_RGB.toABGR([0.6, 0.4, 0.2])).toBe(0xff336699);
	expect(FLOAT_RGB.toABGR([0, 1, 0])).toBe(0xff00ff00);
});

test("FLOAT_RGBA", () => {
	expect(FLOAT_RGBA.fromABGR(0x80336699)).toEqual([
		0.6, 0.4, 0.2, 0.5019607843137255,
	]);
	expect(FLOAT_RGBA.fromABGR(0xff00ff00)).toEqual([0, 1, 0, 1]);
	expect(FLOAT_RGBA.toABGR([0.6, 0.4, 0.2, 0.5])).toBe(0x80336699);
	expect(FLOAT_RGBA.toABGR([0, 1, 0, 1])).toBe(0xff00ff00);
});
