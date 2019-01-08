import { clamp01, TAU } from "@thi.ng/math";
import {
    comp,
    map,
    normRange,
    push,
    transduce,
    tuples
} from "@thi.ng/transducers";

// see http://dev.thi.ng/gradients/

const cosColor =
    (dc: number[], amp: number[], fmod: number[], phase: number[], t: number) =>
        transduce(
            map<number[], number>(
                ([a, b, c, d]) => clamp01(a + b * Math.cos(TAU * (c * t + d)))
            ),
            push(),
            tuples(dc, amp, fmod, phase)
        );

export const cosineGradient =
    (n: number, spec: number[][]) => {
        const [dc, amp, fmod, phase] = spec;
        return transduce(
            comp(
                map((t: number) => cosColor(dc, amp, fmod, phase, t)),
                map(([r, g, b]) => (b * 255) << 16 | (g * 255) << 8 | (r * 255) | 0xff000000)
            ),
            push(),
            normRange(n - 1)
        );
    };
