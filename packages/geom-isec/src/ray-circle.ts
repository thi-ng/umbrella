import {
    dot,
    maddN,
    magSq,
    ReadonlyVec,
    sub
} from "@thi.ng/vectors";

export const intersectRayCircle =
    (rpos: ReadonlyVec, dir: ReadonlyVec, spos: ReadonlyVec, r: number) => {
        const delta = sub([], spos, rpos);
        const w = dot(delta, dir);
        let d = r * r + w * w - magSq(delta);
        if (d >= 0) {
            d = Math.sqrt(d);
            const a = w + d;
            const b = w - d;
            return a >= 0 ?
                b >= 0 ?
                    a > b ?
                        [maddN(delta, rpos, dir, b), maddN([], rpos, dir, a)] :
                        [maddN(delta, rpos, dir, a), maddN([], rpos, dir, b)] :
                    [maddN(delta, rpos, dir, a)] :
                b >= 0 ?
                    [maddN(delta, rpos, dir, b)] :
                    undefined;
        }
    };
