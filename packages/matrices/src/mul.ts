import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { dotS2, dotS3, dotS4 } from "@thi.ng/vectors3/dots";
import { vop } from "@thi.ng/vectors3/internal/vop";
import { setC, setC4, setC6 } from "@thi.ng/vectors3/setc";
import { MultiMatOpMM } from "./api";

export const mul: MultiMatOpMM = vop(1);

export const mul22 =
    mul.add(4, (out, a, b) =>
        setC4(
            out || a,
            dotS2(a, b, 0, 0, 2),
            dotS2(a, b, 1, 0, 2),
            dotS2(a, b, 0, 2, 2),
            dotS2(a, b, 1, 2, 2)
        )
    );

export const mul23 =
    mul.add(6, (out, a, b) =>
        setC6(
            out || a,
            dotS2(a, b, 0, 0, 2),
            dotS2(a, b, 1, 0, 2),
            dotS2(a, b, 0, 2, 2),
            dotS2(a, b, 1, 2, 2),
            dotS2(a, b, 0, 4, 2) + a[4],
            dotS2(a, b, 1, 4, 2) + a[5]
        )
    );

export const mul33 =
    mul.add(9, (out, a, b) =>
        setC(
            out || a,
            dotS3(a, b, 0, 0, 3),
            dotS3(a, b, 1, 0, 3),
            dotS3(a, b, 2, 0, 3),
            dotS3(a, b, 0, 3, 3),
            dotS3(a, b, 1, 3, 3),
            dotS3(a, b, 2, 3, 3),
            dotS3(a, b, 0, 6, 3),
            dotS3(a, b, 1, 6, 3),
            dotS3(a, b, 2, 6, 3)
        )
    );

export const mul44 =
    mul.add(16, (out, a, b) =>
        setC(
            out || a,
            dotS4(a, b, 0, 0, 4),
            dotS4(a, b, 1, 0, 4),
            dotS4(a, b, 2, 0, 4),
            dotS4(a, b, 3, 0, 4),
            dotS4(a, b, 0, 4, 4),
            dotS4(a, b, 1, 4, 4),
            dotS4(a, b, 2, 4, 4),
            dotS4(a, b, 3, 4, 4),
            dotS4(a, b, 0, 8, 4),
            dotS4(a, b, 1, 8, 4),
            dotS4(a, b, 2, 8, 4),
            dotS4(a, b, 3, 8, 4),
            dotS4(a, b, 0, 12, 4),
            dotS4(a, b, 1, 12, 4),
            dotS4(a, b, 2, 12, 4),
            dotS4(a, b, 3, 12, 4)
        )
    );

export const mulQ =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec) => {
        const { 0: ax, 1: ay, 2: az, 3: aw } = a;
        const { 0: bx, 1: by, 2: bz, 3: bw } = b;
        return setC4(
            out || a,
            ax * bw + aw * bx + ay * bz - az * by,
            ay * bw + aw * by + az * bx - ax * bz,
            az * bw + aw * bz + ax * by - ay * bx,
            aw * bw - ax * bx - ay * by - az * bz
        );
    };
