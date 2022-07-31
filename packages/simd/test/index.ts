import { equiv } from "@thi.ng/equiv";
import { eqDelta } from "@thi.ng/vectors";
import { init } from "../src/index.js";

const DEST = 0x400;

const simd = init(new WebAssembly.Memory({ initial: 1 }))!;
// console.log(simd);

const fail = (res: any, exp: any, msg = "") => {
	process.stderr.write(`${msg} expected: ${exp}, got ${res}\n\n`);
	process.exit(1);
};

const assertEqual = (res: any, exp: any, msg?: string) => {
	!equiv(res, exp) && fail(res, exp, msg);
};

const assertEqualDelta = (res: any, exp: any, eps = 1e-3, msg?: string) => {
	!eqDelta(res, exp, eps) && fail(res, exp, msg);
};

const res_f32 = (addr: number, n: number) =>
	simd.f32.slice(addr / 4, addr / 4 + n);

// basic math ops
// prettier-ignore
simd.f32.set([
    // a
    1, 2, 3, 4, 5, 6, 7, 8,
    // gap
    0, 0, 0, 0,
    // b
    10, 20, 30, 40, 50, 60, 70, 80
]);
// add4_f32
simd.add4_f32(DEST, 0, 48, 2, 4, 4, 4);
assertEqual(res_f32(DEST, 8), [11, 22, 33, 44, 55, 66, 77, 88]);
// addn4_f32
simd.addn4_f32(DEST, 0, 10, 2, 4, 4);
assertEqual(res_f32(DEST, 8), [11, 12, 13, 14, 15, 16, 17, 18]);
// sub4_f32
simd.sub4_f32(DEST, 0, 48, 2, 4, 4, 4);
assertEqual(res_f32(DEST, 8), [-9, -18, -27, -36, -45, -54, -63, -72]);
// subn4_f32
simd.subn4_f32(DEST, 0, 10, 2, 4, 4);
assertEqual(res_f32(DEST, 8), [-9, -8, -7, -6, -5, -4, -3, -2]);
// mul4_f32
simd.mul4_f32(DEST, 0, 48, 2, 4, 4, 4);
assertEqual(res_f32(DEST, 8), [10, 40, 90, 160, 250, 360, 490, 640]);
// muln4_f32
simd.muln4_f32(DEST, 0, 10, 2, 4, 4);
assertEqual(res_f32(DEST, 8), [10, 20, 30, 40, 50, 60, 70, 80]);
// div4_f32
simd.div4_f32(DEST, 0, 48, 2, 4, 4, 4);
assertEqualDelta(res_f32(DEST, 8), [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
// divn4_f32
simd.divn4_f32(DEST, 0, 10, 2, 4, 4);
assertEqualDelta(res_f32(DEST, 8), [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);

// abs4_f32
simd.f32.set([-1, 2, -3, 4, 5, -6, 7, -8]);
simd.abs4_f32(DEST, 0, 2, 4, 4);
assertEqual(res_f32(DEST, 8), [1, 2, 3, 4, 5, 6, 7, 8]);
// neg4_f32
simd.neg4_f32(DEST, 0, 2, 4, 4);
assertEqual(res_f32(DEST, 8), [1, -2, 3, -4, -5, 6, -7, 8]);

// clamp4_f32
// prettier-ignore
simd.f32.set([
    // a
    -10, 10, -10, 10,
    10, -10, 10, -10,
    // min
    -1, -2, -3, -4,
    // max
    1, 2, 3, 4
]);
simd.clamp4_f32(DEST, 0, 32, 48, 2, 4, 4, 0, 0);
assertEqual(res_f32(DEST, 8), [-1, 2, -3, 4, 1, -2, 3, -4]);
//clampn4_f32
simd.clampn4_f32(DEST, 0, -1, 1, 2, 4, 4);
assertEqual(res_f32(DEST, 8), [-1, 1, -1, 1, 1, -1, 1, -1]);
//min4_f32
simd.min4_f32(DEST, 0, 32, 2, 4, 4, 0);
assertEqual(res_f32(DEST, 8), [-10, -2, -10, -4, -1, -10, -3, -10]);
simd.min4_f32(DEST, 0, 48, 2, 4, 4, 0);
assertEqual(res_f32(DEST, 8), [-10, 2, -10, 4, 1, -10, 3, -10]);
//max4_f32
simd.max4_f32(DEST, 0, 32, 2, 4, 4, 0);
assertEqual(res_f32(DEST, 8), [-1, 10, -3, 10, 10, -2, 10, -4]);
simd.max4_f32(DEST, 0, 48, 2, 4, 4, 0);
assertEqual(res_f32(DEST, 8), [1, 10, 3, 10, 10, 2, 10, 4]);

// dot2_aos
// prettier-ignore
simd.f32.set([
        // a
        1, 2, 3, 4,
        // b
        10, 20, 30, 40
    ]);
simd.dot2_f32_aos(DEST, 0, 16, 2);
assertEqual(res_f32(DEST, 2), [50, 250]);

// dot4_aos
// prettier-ignore
simd.f32.set([
        // a
        1, 2, 3, 4, 5, 6, 7, 8,
        // b
        10, 20, 30, 40, 50, 60, 70, 80
    ]);
simd.dot4_f32_aos(DEST, 0, 32, 2, 1, 4, 4);
assertEqual(res_f32(DEST, 2), [300, 1740]);

// dot4_soa
// prettier-ignore
simd.f32.set([
        // ax
        1, 2, 3, 4,
        // ay
        1, 2, 3, 4,
        // az
        1, 2, 3, 4,
        // aw
        1, 2, 3, 4,
        // bx
        10, 10, 10, 10,
        // by
        20, 20, 20, 20,
        // bz
        30, 30, 30, 30,
        // bw
        40, 40, 40, 40
    ]);
simd.dot4_f32_soa(DEST, 0, 64, 4, 4, 4);
assertEqual(res_f32(DEST, 4), [100, 200, 300, 400]);

// madd4
// prettier-ignore
simd.f32.set([
        // a
        1, 2, 3, 4, 5, 6, 7, 8,
        // b
        11, 11, 11, 11, 11, 11, 11, 11,
        // c
        100, 200, 300, 400, 500, 600, 700, 800
    ]);
simd.madd4_f32(DEST, 0, 32, 64, 2, 4, 4, 4, 4);
assertEqual(res_f32(DEST, 8), [111, 222, 333, 444, 555, 666, 777, 888]);
// msub4
simd.msub4_f32(DEST, 0, 32, 64, 2, 4, 4, 4, 4);
// prettier-ignore
assertEqual(res_f32(DEST, 8), [-89, -178, -267, -356, -445, -534, -623, -712]);

// maddn4
// prettier-ignore
simd.f32.set([
        // a
        1, 2, 3, 4, 5, 6, 7, 8,
        // c
        100, 200, 300, 400, 500, 600, 700, 800
    ]);
simd.maddn4_f32(DEST, 0, 11, 32, 2, 4, 4, 4);
// prettier-ignore
assertEqual(res_f32(DEST, 8), [111, 222, 333, 444, 555, 666, 777, 888]);
// msubn4
simd.msubn4_f32(DEST, 0, 11, 32, 2, 4, 4, 4);
// prettier-ignore
assertEqual(res_f32(DEST, 8), [-89, -178, -267, -356, -445, -534, -623, -712]);

// magsq2
// magsq4
simd.f32.set([1, 2, 10, 20, -100, 200, 100, -200]);
simd.magsq2_f32_aos(DEST, 0, 4);
assertEqualDelta(res_f32(DEST, 4), [
	1 * 1 + 2 * 2,
	10 * 10 + 20 * 20,
	100 * 100 + 200 * 200,
	100 * 100 + 200 * 200,
]);
simd.mag2_f32_aos(DEST, 0, 4);
assertEqualDelta(res_f32(DEST, 4), [
	Math.sqrt(5),
	Math.sqrt(500),
	Math.sqrt(50000),
	Math.sqrt(50000),
]);

simd.magsq4_f32_aos(DEST, 0, 2, 1, 4);
assertEqualDelta(res_f32(DEST, 2), [505, 100000]);
simd.mag4_f32_aos(DEST, 0, 2, 1, 4);
assertEqualDelta(res_f32(DEST, 2), [Math.sqrt(505), Math.sqrt(100000)]);

// sqrt4
simd.f32.set([1, 2, 9, 16, 25, 36, 49, 64]);
simd.sqrt4_f32(DEST, 0, 2, 4, 4);
assertEqualDelta(res_f32(DEST, 8), [1, Math.SQRT2, 3, 4, 5, 6, 7, 8]);
// invsqrt4
simd.invsqrt4_f32(DEST, 0, 2, 4, 4);
assertEqualDelta(res_f32(DEST, 8), [
	1,
	Math.SQRT1_2,
	1 / 3,
	1 / 4,
	1 / 5,
	1 / 6,
	1 / 7,
	1 / 8,
]);

// mix4_f32
// mixn4_f32
// prettier-ignore
simd.f32.set([
    // a
    1, 2, 3, 4, 5, 6, 7, 8,
    // b
    10, 20, 30, 40, 50, 60, 70, 80,
    // t
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8
]);
simd.mix4_f32(DEST, 0, 32, 64, 2, 4, 4, 4, 4);
// prettier-ignore
assertEqualDelta(
    res_f32(DEST, 8),
    [1.9, 5.6, 11.1, 18.4, 27.5, 38.4, 51.1, 65.6]
);
simd.mixn4_f32(DEST, 0, 32, 0.5, 2, 4, 4, 4);
// prettier-ignore
assertEqualDelta(
    res_f32(DEST, 8),
    [5.5, 11, 16.5, 22, 27.5, 33, 38.5, 44]
);

// mul_m22v2_aos
// mul_m23v2_aos
// prettier-ignore
simd.f32.set([
        // mat23 (col major)
        10, 0,
        0, 20,
        100, 200,
        // space
        0, 0,
        // 4x vec2
        1, 2,
        3, 4,
        5, 6,
        -1, -1
    ]);
simd.mul_m22v2_aos(DEST, 0, 32, 4);
assertEqual(res_f32(DEST, 8), [10, 40, 30, 80, 50, 120, -10, -20]);
simd.mul_m23v2_aos(DEST, 0, 32, 4);
assertEqual(res_f32(DEST, 8), [110, 240, 130, 280, 150, 320, 90, 180]);

// mul_m44v4_aos
// prettier-ignore
simd.f32.set([
        // mat4 (col major)
        10, 0, 0, 0,
        0, 20, 0, 0,
        0, 0, 30, 0,
        100, 200, 300, 1,
        // vec4
        1, 2, 3, 1,
        4, 5, 6, 1,
    ]);
simd.mul_m44v4_aos(DEST, 0, 64, 2, 4, 4);
assertEqual(res_f32(DEST, 8), [110, 240, 390, 1, 140, 300, 480, 1]);

// normalize2_f32
simd.f32.set([-1, 1, 0, 2, -1e-8, 0, 4, -2]);
simd.normalize2_f32_aos(DEST, 0, 4, 10);
assertEqualDelta(
	res_f32(DEST, 8),
	[-7.07, 7.07, 0, 10, 0, 0, 8.94, -4.47],
	0.01
);
// normalize4_f32
simd.f32.set([1, 0, -1, 0, 0, -1, 0, 1, -1, 1, 1, -1, 1e-8, -1e-6, 1e-8, 1e-6]);
simd.normalize4_f32_aos(DEST, 0, 4, 10, 4, 4);
assertEqualDelta(
	res_f32(DEST, 16),
	// prettier-ignore
	[
        7.07, 0, -7.07, 0,
        0, -7.07, 0, 7.07,
        -5, 5, 5, -5,
        0, 0, 0, 0,
    ],
	0.01
);

// prettier-ignore
simd.f32.set([1, 2, 3, 4, 5, 6, 7, 8, 10, 20, 30, 40, 50, 60, 70, 80]);
assertEqual(simd.sum4_f32(0, 4, 4), 396);

simd.f32.set([10, 20, 30, 40, 50, 60, 70, 80]);
simd.swizzle4_32_aos(DEST, 0, 3, 0, 1, 2, 2, 4, 4),
	assertEqual(
		res_f32(DEST, 8),
		// prettier-ignore
		[40, 10, 20, 30, 80, 50, 60, 70],
		"swizzle4 1"
	);
simd.swizzle4_32_aos(DEST, 0, 1, 1, 2, 2, 2, 4, 4),
	assertEqual(
		res_f32(DEST, 8),
		// prettier-ignore
		[20, 20, 30, 30, 60, 60, 70, 70],
		"swizzle4 2"
	);
