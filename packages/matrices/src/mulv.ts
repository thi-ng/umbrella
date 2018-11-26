import { dotS2, dotS3, dotS4 } from "@thi.ng/vectors3/dots";
import { MatOpMV, MultiMatOpMV } from "./api";
import { vop } from "@thi.ng/vectors3/internal/vop";

export const mulV: MultiMatOpMV = vop(1);

export const mulV22: MatOpMV =
    mulV.add(4, (out, m, v) => {
        const x = dotS2(m, v, 0, 0, 2);
        out[1] = dotS2(m, v, 1, 0, 2);
        out[0] = x;
        return out;
    });

export const mulV23: MatOpMV =
    mulV.add(6, (out, m, v) => {
        const x = dotS2(m, v, 0, 0, 2) + m[4];
        out[1] = dotS2(m, v, 1, 0, 2) + m[5];
        out[0] = x;
        return out;
    });

export const mulV33: MatOpMV =
    mulV.add(9, (out, m, v) => {
        const x = dotS3(m, v, 0, 0, 3);
        const y = dotS3(m, v, 1, 0, 3);
        out[2] = dotS3(m, v, 2, 0, 3);
        out[1] = y;
        out[0] = x;
        return out;
    });

export const mulV44: MatOpMV =
    mulV.add(16, (out, m, v) => {
        const x = dotS4(m, v, 0, 0, 4);
        const y = dotS4(m, v, 1, 0, 4);
        const z = dotS4(m, v, 2, 0, 4);
        out[3] = dotS4(m, v, 3, 0, 4);
        out[2] = z;
        out[1] = y;
        out[0] = x;
        return out;
    });

export const mulV344: MatOpMV =
    (out, m, v) => {
        const x = dotS3(m, v, 0, 0, 4) + m[12];
        const y = dotS3(m, v, 1, 0, 4) + m[13];
        out[2] = dotS3(m, v, 2, 0, 4) + m[14];
        out[1] = y;
        out[0] = x;
        return out;
    };
