import { XsAdd } from "@thi.ng/random";
import { expect, test } from "bun:test";
import {
	abgr32,
	argb32,
	css,
	hsl,
	labD50,
	parseCss,
	rgb,
	srgb,
	type Color,
	type ColorMode,
} from "../src/index.js";

test("srgb", () => {
	const res = srgb(0xaa / 0xff, 0xbb / 0xff, 0xcc / 0xff);
	expect(srgb("#abc").eqDelta(res)).toBeTrue();
	expect(srgb(0xffaabbcc).eqDelta(res)).toBeTrue();
	expect(
		srgb([0xaa / 0xff, 0xbb / 0xff, 0xcc / 0xff, 1]).eqDelta(res)
	).toBeTrue();
	expect(srgb(hsl("hsl(60,100%,50%)")).eqDelta(srgb(1, 1, 0))).toBeTrue();
});

test("abgr32", () => {
	const buf = abgr32.mapBuffer([0x11223344, -1, 0x55667788], 2, 0, 1, 2);
	expect([...srgb(buf[0])]).toEqual([
		0x44 / 0xff,
		0x33 / 0xff,
		0x22 / 0xff,
		0x11 / 0xff,
	]);
	expect([...srgb(buf[1])]).toEqual([
		0x88 / 0xff,
		0x77 / 0xff,
		0x66 / 0xff,
		0x55 / 0xff,
	]);
	expect(abgr32(srgb(buf[0]))[0]).toBe(0x11223344);
	expect(abgr32(srgb(buf[1]))[0]).toBe(0x55667788);
});

test("argb32", () => {
	const buf = argb32.mapBuffer([0x11223344, -1, 0x55667788], 2, 0, 1, 2);
	expect([...srgb(buf[0])]).toEqual([
		0x22 / 0xff,
		0x33 / 0xff,
		0x44 / 0xff,
		0x11 / 0xff,
	]);
	expect([...srgb(buf[1])]).toEqual([
		0x66 / 0xff,
		0x77 / 0xff,
		0x88 / 0xff,
		0x55 / 0xff,
	]);
	expect(argb32(srgb(buf[0]))[0]).toBe(0x11223344);
	expect(argb32(srgb(buf[1]))[0]).toBe(0x55667788);
});

test("css()", () => {
	expect(css("#abc")).toBe("#abc");
	expect(css(0xffbbccdd)).toBe("#bbccdd");
	expect(css(0xaabbccdd)).toBe("rgba(187,204,221,0.667)");
	// srgb
	expect(css([0.2, 0.4, 0.6])).toBe("#336699");
	expect(css([0.2, 0.4, 0.6, 0.8])).toBe("rgba(51,102,153,0.800)");
	// linear
	expect(css(rgb(0.2, 0.4, 0.6))).toBe("#7caacb");
	expect(css(rgb([0.2, 0.4, 0.6, 0.8]))).toBe("rgba(124,170,203,0.800)");
	// css -> srgb -> rgb -> srgb -> css
	expect(css(rgb("#abc"))).toBe("#aabbcc");
	expect(css(hsl("#ff0"))).toBe("hsl(60.000,100.000%,50.000%)");
	expect(css(hsl("#990"))).toBe("hsl(60.000,100.000%,30.000%)");
});

test("random", () => {
	expect(
		rgb
			.random(new XsAdd(0xdecafbad))
			.eqDelta(rgb(0.274, 0.0615, 0.1377), 1e-3)
	).toBeTrue();
	expect(
		labD50
			.random(new XsAdd(0xdecafbad))
			.eqDelta(labD50(0.274, -0.6866, -0.8375), 1e-3)
	).toBeTrue();
});

test("parseCss", () => {
	const check = (src: string, mode: ColorMode, val: boolean | Color) => {
		if (val === true) {
			expect(() => parseCss(src)).toThrow();
			return;
		}
		const res = parseCss(src);
		expect(res.mode).toBe(mode);
		expect(res.deref()).toEqual(<Color>val);
	};

	const cases: [string, ColorMode, boolean | Color][] = [
		["#c96", "srgb", [0xcc / 0xff, 0x99 / 0xff, 0x66 / 0xff, 1]],
		["#dc96", "srgb", [0xdd / 0xff, 0xcc / 0xff, 0x99 / 0xff, 0x66 / 0xff]],
		["#cc9966", "srgb", [0xcc / 0xff, 0x99 / 0xff, 0x66 / 0xff, 1]],
		[
			"#ddcc9966",
			"srgb",
			[0xdd / 0xff, 0xcc / 0xff, 0x99 / 0xff, 0x66 / 0xff],
		],
		["rgb(255,254,253)", "srgb", [1, 254 / 255, 253 / 255, 1]],
		["rgb(255,254,253/0.5)", "srgb", [1, 254 / 255, 253 / 255, 0.5]],
		["rgba(255,254,253,0.5)", "srgb", [1, 254 / 255, 253 / 255, 0.5]],
		["rgba(257,-254,255.5,1.5)", "srgb", [1, 0, 1, 1]],
		["rgb(100% 80% 60% / 40%)", "srgb", [1, 0.8, 0.6, 0.4]],
		["hsl(90 100% 50%)", "hsl", [0.25, 1, 0.5, 1]],
		["hsla(90,100%,50%,0.4)", "hsl", [0.25, 1, 0.5, 0.4]],
		["lab(66% -8.7 -42)", "lab50", [0.66, -0.087, -0.42, 1]],
		["lab(50% 100% -100%/80%)", "lab50", [0.5, 1.25, -1.25, 0.8]],
		["lch(66% 87 42)", "lch", [0.66, 0.87, 42 / 360, 1]],
		[
			"lch(50% 100% 1.57rad/80%)",
			"lch",
			[0.5, 1.5, 1.57 / (2 * Math.PI), 0.8],
		],
		["oklab(66% -0.3 0.5)", "oklab", [0.66, -0.3, 0.5, 1]],
		["oklab(50% 100% -100%/0.8)", "oklab", [0.5, 0.4, -0.4, 0.8]],
		["oklch(66% 0.5 42)", "oklch", [0.66, 0.5, 42 / 360, 1]],
		["oklch(50% 100% 0.25turn / 0.8)", "oklch", [0.5, 0.4, 0.25, 0.8]],
	];
	cases.forEach((spec) => check(...spec));
});
