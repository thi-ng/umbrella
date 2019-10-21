import { equiv } from "@thi.ng/equiv";
import { init } from "../src";

const simd = init(new WebAssembly.Memory({ initial: 1 }))!;
console.log(simd);

const assertEqual = (res: any, exp: any, msg?: string) => {
    if (!equiv(res, exp)) {
        process.stderr.write(msg || `expected: ${exp}, got ${res}\n\n`);
        process.exit(1);
    }
};

const res_f32 = (addr: number, n: number) =>
    simd.f32.slice(addr / 4, addr / 4 + n);

// dot2_aos
// prettier-ignore
simd.f32.set([
        // a
        1, 2, 3, 4,
        // b
        10, 20, 30, 40
    ]);
simd.dot2_f32_aos(1024, 0, 16, 2);
assertEqual(res_f32(1024, 2), [50, 250]);

// dot4_aos
// prettier-ignore
simd.f32.set([
        // a
        1, 2, 3, 4, 5, 6, 7, 8,
        // b
        10, 20, 30, 40, 50, 60, 70, 80
    ]);
simd.dot4_f32_aos(1024, 0, 32, 2, 1, 4, 4);
assertEqual(res_f32(1024, 2), [300, 1740]);

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
simd.dot4_f32_soa(1024, 0, 64, 4, 4, 4);
assertEqual(res_f32(1024, 4), [100, 200, 300, 400]);

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
simd.madd4_f32(1024, 0, 32, 64, 2, 4, 4, 4, 4);
assertEqual(res_f32(1024, 8), [111, 222, 333, 444, 555, 666, 777, 888]);

// maddn4
// prettier-ignore
simd.f32.set([
        // a
        1, 2, 3, 4, 5, 6, 7, 8,
        // c
        100, 200, 300, 400, 500, 600, 700, 800
    ]);
simd.maddn4_f32(1024, 0, 11, 32, 2, 4, 4, 4);
// prettier-ignore
assertEqual(res_f32(1024, 8), [111, 222, 333, 444, 555, 666, 777, 888]);

// mul_m23v2_aos
// prettier-ignore
simd.f32.set([
        // mat23 (col major)
        10, 0,
        0, 20,
        100, 200,
        // space
        0, 0,
        // vec4
        1, 2, 3, 4
    ]);
simd.mul_m23v2_aos(1024, 0, 32, 2);
assertEqual(res_f32(1024, 4), [110, 240, 130, 280]);

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
simd.mul_m44v4_aos(1024, 0, 64, 2, 4, 4);
assertEqual(res_f32(1024, 8), [110, 240, 390, 1, 140, 300, 480, 1]);
