import { addW2, normalize, ReadonlyVec, sub, Vec } from "@thi.ng/vectors";

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
