import { mixQuadratic } from "@thi.ng/vectors/mix-quadratic";
import { __sample, __sampleArray } from "./internal/sample.js";

export const sampleQuadratic = __sample((res, [a, b, c], num) => {
    const delta = 1 / num;
    for (let t = 0; t < num; t++) {
        res.push(mixQuadratic([], a, b, c, t * delta));
    }
});

export const sampleQuadraticArray = __sampleArray(sampleQuadratic);
