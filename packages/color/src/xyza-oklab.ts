import { powN3 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { OKLAB_M1, OKLAB_M2 } from "./constants";
import { mulV33 } from "./internal/matrix-ops";

export const M1I = [
    1.2270138511035211,
    -0.04058017842328059,
    -0.0763812845057069,
    -0.5577999806518222,
    1.1122568696168302,
    -0.4214819784180127,
    0.28125614896646783,
    -0.07167667866560119,
    1.586163220440795,
];

export const M2I = [
    0.9999999984505198,
    1.0000000088817607,
    1.0000000546724108,
    0.3963377921737678,
    -0.10556134232365633,
    -0.08948418209496575,
    0.21580375806075877,
    -0.06385417477170588,
    -1.2914855378640917,
];

export const xyzaOklab: ColorOp = (out, src) =>
    mulV33(
        out || src,
        OKLAB_M2,
        powN3(null, mulV33([], OKLAB_M1, src, false), 1 / 3),
        false
    );
