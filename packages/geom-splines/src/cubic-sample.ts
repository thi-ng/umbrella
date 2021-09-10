import { mixCubic } from "@thi.ng/vectors/mix-cubic";
import { __sample, __sampleArray } from "./internal/sample";

export const sampleCubic = __sample((res, [a, b, c, d], num) => {
    const delta = 1 / num;
    for (let t = 0; t < num; t++) {
        res.push(mixCubic([], a, b, c, d, t * delta));
    }
});

export const sampleCubicArray = __sampleArray(sampleCubic);
