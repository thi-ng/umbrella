import { dotS2, dotS3, dotS4 } from "@thi.ng/vectors3/dots";
import { vop } from "@thi.ng/vectors3/internal/vop";
import { MultiMatOpMM } from "./api";
import {
    setValues22,
    setValues23,
    setValues33,
    setValues44
} from "./set-values";

export const mul: MultiMatOpMM = vop(1);

export const mul22 =
    mul.add(4, (out, a, b) =>
        setValues22(
            out,
            dotS2(a, b, 0, 0, 2),
            dotS2(a, b, 1, 0, 2),
            dotS2(a, b, 0, 2, 2),
            dotS2(a, b, 1, 2, 2)
        ));

export const mul23 =
    mul.add(6, (out, a, b) =>
        setValues23(
            out,
            dotS2(a, b, 0, 0, 2),
            dotS2(a, b, 1, 0, 2),
            dotS2(a, b, 0, 2, 2),
            dotS2(a, b, 1, 2, 2),
            dotS2(a, b, 0, 4, 2) + a[4],
            dotS2(a, b, 1, 4, 2) + a[5]
        ));

export const mul33 =
    mul.add(9, (out, a, b) =>
        setValues33(
            out,
            dotS3(a, b, 0, 0, 3),
            dotS3(a, b, 1, 0, 3),
            dotS3(a, b, 2, 0, 3),
            dotS3(a, b, 0, 3, 3),
            dotS3(a, b, 1, 3, 3),
            dotS3(a, b, 2, 3, 3),
            dotS3(a, b, 0, 6, 3),
            dotS3(a, b, 1, 6, 3),
            dotS3(a, b, 2, 6, 3)
        ));

export const mul44 =
    mul.add(16, (out, a, b) =>
        setValues44(
            out,
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
        ));
