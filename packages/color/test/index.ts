import { XsAdd } from "@thi.ng/random";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    abgr32,
    argb32,
    Color,
    ColorMode,
    css,
    hsl,
    labD50,
    parseCss,
    rgb,
    srgb,
} from "../src/index.js"

group("color", {
    srgb: () => {
        const res = srgb(0xaa / 0xff, 0xbb / 0xff, 0xcc / 0xff);
        assert.ok(srgb("#abc").eqDelta(res), "#abc");
        assert.ok(srgb(0xffaabbcc).eqDelta(res), "0xaabbcc");
        assert.ok(
            srgb([0xaa / 0xff, 0xbb / 0xff, 0xcc / 0xff, 1]).eqDelta(res),
            "array"
        );
        assert.ok(srgb(hsl("hsl(60,100%,50%)")).eqDelta(srgb(1, 1, 0)), "hsl");
    },

    abgr32: () => {
        const buf = abgr32.mapBuffer([0x11223344, -1, 0x55667788], 2, 0, 1, 2);
        assert.deepStrictEqual(
            [...srgb(buf[0])],
            [0x44 / 0xff, 0x33 / 0xff, 0x22 / 0xff, 0x11 / 0xff]
        );
        assert.deepStrictEqual(
            [...srgb(buf[1])],
            [0x88 / 0xff, 0x77 / 0xff, 0x66 / 0xff, 0x55 / 0xff]
        );
        assert.strictEqual(abgr32(srgb(buf[0]))[0], 0x11223344);
        assert.strictEqual(abgr32(srgb(buf[1]))[0], 0x55667788);
    },

    argb32: () => {
        const buf = argb32.mapBuffer([0x11223344, -1, 0x55667788], 2, 0, 1, 2);
        assert.deepStrictEqual(
            [...srgb(buf[0])],
            [0x22 / 0xff, 0x33 / 0xff, 0x44 / 0xff, 0x11 / 0xff]
        );
        assert.deepStrictEqual(
            [...srgb(buf[1])],
            [0x66 / 0xff, 0x77 / 0xff, 0x88 / 0xff, 0x55 / 0xff]
        );
        assert.strictEqual(argb32(srgb(buf[0]))[0], 0x11223344);
        assert.strictEqual(argb32(srgb(buf[1]))[0], 0x55667788);
    },

    "css()": () => {
        assert.strictEqual(css("#abc"), "#abc");
        assert.strictEqual(css(0xffbbccdd), "#bbccdd");
        assert.strictEqual(css(0xaabbccdd), "rgba(187,204,221,0.667)");
        // srgb
        assert.strictEqual(css([0.2, 0.4, 0.6]), "#336699");
        assert.strictEqual(css([0.2, 0.4, 0.6, 0.8]), "rgba(51,102,153,0.800)");
        // linear
        assert.strictEqual(css(rgb(0.2, 0.4, 0.6)), "#7caacb");
        assert.strictEqual(
            css(rgb([0.2, 0.4, 0.6, 0.8])),
            "rgba(124,170,203,0.800)"
        );
        // css -> srgb -> rgb -> srgb -> css
        assert.strictEqual(css(rgb("#abc")), "#aabbcc");
        assert.strictEqual(css(hsl("#ff0")), "hsl(60.000,100.000%,50.000%)");
        assert.strictEqual(css(hsl("#990")), "hsl(60.000,100.000%,30.000%)");
    },

    random: () => {
        assert.ok(
            rgb
                .random(new XsAdd(0xdecafbad))
                .eqDelta(rgb(0.4379, 0.1376, 0.0615), 1e-3)
        );
        assert.ok(
            labD50
                .random(new XsAdd(0xdecafbad))
                .eqDelta(labD50(0.4379, -0.5549, -0.994), 1e-3)
        );
    },

    parseCss: () => {
        const check = (src: string, mode: ColorMode, val: boolean | Color) => {
            if (val === true) {
                assert.throws(() => parseCss(src), src);
                return;
            }
            const res = parseCss(src);
            assert.strictEqual(
                res.mode,
                mode,
                `${src}, expected mode: ${mode}`
            );
            assert.deepStrictEqual(res.deref(), val, `${src} value`);
        };

        const cases: [string, ColorMode, boolean | Color][] = [
            ["#c96", "srgb", [0.8, 0.6, 0.4, 1]],
            ["#dc96", "srgb", [0.8, 0.6, 0.4, 0xdd / 0xff]],
            ["#cc9966", "srgb", [0.8, 0.6, 0.4, 1]],
            ["#aacc9966", "srgb", [0.8, 0.6, 0.4, 0xaa / 0xff]],
            ["rgb(255,254,253)", "srgb", [1, 254 / 255, 253 / 255, 1]],
            ["rgb(255,254,253/0.5)", "srgb", [1, 254 / 255, 253 / 255, 0.5]],
            ["rgba(255,254,253,0.5)", "srgb", [1, 254 / 255, 253 / 255, 0.5]],
            ["rgba(257,-254,255.5,1.5)", "srgb", [1, 0, 1, 1]],
        ];
        cases.forEach((spec) => check(...spec));
    },
});
