import { powN3 } from "@thi.ng/vectors/pown";
import type { ColorOp } from "../api";
import { __mulV33 } from "../internal/matrix-ops";

// inverted version of OKLAB_M1
const M1I = [
    1.2270138511035211, -0.04058017842328059, -0.0763812845057069,
    -0.5577999806518222, 1.1122568696168302, -0.4214819784180127,
    0.28125614896646783, -0.07167667866560119, 1.586163220440795,
];

// inverted version of OKLAB_M2
const M2I = [
    0.9999999984505198, 1.0000000088817607, 1.0000000546724108,
    0.3963377921737678, -0.10556134232365633, -0.08948418209496575,
    0.21580375806075877, -0.06385417477170588, -1.2914855378640917,
];

export const oklabXyzD65: ColorOp = (out, src) =>
    __mulV33(null, M1I, powN3(null, __mulV33(out, M2I, src), 3));
