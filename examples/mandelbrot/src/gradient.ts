import { TAU } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { comp } from "@thi.ng/transducers/func/comp";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { partial } from "@thi.ng/compose/partial";

// see http://dev.thi.ng/gradients/
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

export const cosineGradient = (n: number, spec: number[][]) => {
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

export const GRADIENTS = [
    [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [-1.0, -1.0, -1.0], [0.00, 0.10, 0.20]],
    [[0.500, 0.500, 0.500], [0.500, 0.500, 0.500], [0.500, 0.618, 0.500], [-1.000, 0.828, -0.152]],
    [[0.402, 0.654, 0.247], [0.835, 0.668, 0.420], [1.226, 1.553, 1.445], [2.684, 6.256, 4.065]],
    [[0.500, 0.500, 0.500], [0.500, 0.500, 0.500], [0.500, 0.500, 0.500], [0.500, 0.500, 0.500]],
    [[0.5, 0.5, 0.5], [1.000, 1.000, 1.000], [10.000, 10.000, 10.000], [0.000, 0.000, 0.000]],
].map(partial(cosineGradient, 256));
