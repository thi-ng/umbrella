import { dotS2, dotS3, dotS4 } from "@thi.ng/vectors3/dots";
import { MatOpMV } from "./api";

export const mulV22: MatOpMV =
    (out, m, v) => (
        out[0] = dotS2(m, v, 0, 0, 2),
        out[1] = dotS2(m, v, 1, 0, 2),
        out
    );

export const mulV23: MatOpMV =
    (out, m, v) => (
        out[0] = dotS2(m, v, 0, 0, 2) + m[4],
        out[1] = dotS2(m, v, 1, 0, 2) + m[5],
        out
    );

export const mulV33: MatOpMV =
    (out, m, v) => (
        out[0] = dotS3(m, v, 0, 0, 3),
        out[1] = dotS3(m, v, 1, 0, 3),
        out[2] = dotS3(m, v, 2, 0, 3),
        out
    );

export const mulV344: MatOpMV =
    (out, m, v) => (
        out[0] = dotS3(m, v, 0, 0, 4) + m[12],
        out[1] = dotS3(m, v, 1, 0, 4) + m[13],
        out[2] = dotS3(m, v, 2, 0, 4) + m[14],
        out
    );

export const mulV44: MatOpMV =
    (out, m, v) => (
        out[0] = dotS4(m, v, 0, 0, 4),
        out[1] = dotS4(m, v, 1, 0, 4),
        out[2] = dotS4(m, v, 2, 0, 4),
        out[3] = dotS4(m, v, 3, 0, 4),
        out
    );
