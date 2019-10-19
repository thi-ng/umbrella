import { equiv } from "@thi.ng/equiv";
import * as fs from "fs";
import { init } from "../src";

const assertEqual = (res: any, exp: any, msg?: string) => {
    if (!equiv(res, exp)) {
        process.stderr.write(msg || `expected: ${exp}, got ${res}\n\n`);
        process.exit(1);
    }
};

(async () => {
    const simd = await init(
        fs.readFileSync("simd.wasm"),
        new WebAssembly.Memory({ initial: 1 })
    );

    // dot2_aos
    // prettier-ignore
    simd.f32.set([
        // a
        1, 2, 3, 4,
        // b
        10, 20, 30, 40
    ]);
    simd.dot2_f32_aos(1024, 0, 16, 2, 1);
    assertEqual(simd.f32.slice(1024 / 4, 1024 / 4 + 2), [50, 250]);

    // dot4_aos
    // prettier-ignore
    simd.f32.set([
        // a
        1, 2, 3, 4, 5, 6, 7, 8,
        // b
        10, 20, 30, 40, 50, 60, 70, 80
    ]);
    simd.dot4_f32_aos(1024, 0, 32, 2, 1, 4, 4);
    assertEqual(simd.f32.slice(1024 / 4, 1024 / 4 + 2), [300, 1740]);

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
    assertEqual(simd.f32.slice(1024 / 4, 1024 / 4 + 4), [100, 200, 300, 400]);

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
    // prettier-ignore
    assertEqual(simd.f32.slice(1024 / 4, 1024 / 4 + 8), [111, 222, 333, 444, 555, 666, 777, 888]);
})();
