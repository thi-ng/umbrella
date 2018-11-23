import { TAU } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { comp } from "@thi.ng/transducers/func/comp";
import { normRange } from "@thi.ng/transducers/iter/norm-range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";

// see http://dev.thi.ng/gradients/

const cosColor = (dc: number[], amp: number[], fmod: number[], phase: number[], t: number) =>
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
