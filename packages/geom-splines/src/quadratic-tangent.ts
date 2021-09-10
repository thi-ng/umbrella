import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addW2 } from "@thi.ng/vectors/addw";
import { normalize } from "@thi.ng/vectors/normalize";
import { sub } from "@thi.ng/vectors/sub";

export const quadraticTangentAt = (
    out: Vec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    t: number,
    len = 1
) =>
    normalize(
        out,
        addW2(out, sub(out, b, a), sub([], c, b), 2 * (1 - t), 2 * t),
        len
    );
