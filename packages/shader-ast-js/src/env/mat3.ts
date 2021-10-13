import { add33 } from "@thi.ng/matrices/add";
import { addN33 } from "@thi.ng/matrices/addn";
import { div33 } from "@thi.ng/matrices/div";
import { divN33 } from "@thi.ng/matrices/divn";
import { mul33 } from "@thi.ng/matrices/mul";
import { mulM33 } from "@thi.ng/matrices/mulm";
import { mulN33 } from "@thi.ng/matrices/muln";
import { mulV33 } from "@thi.ng/matrices/mulv";
import { mulVM33 } from "@thi.ng/matrices/mulvm";
import { sub33 } from "@thi.ng/matrices/sub";
import { subN33 } from "@thi.ng/matrices/subn";
import { neg } from "@thi.ng/vectors/neg";
import { setS3 } from "@thi.ng/vectors/sets";
import { vecOf } from "@thi.ng/vectors/vec-of";
import type { JSBuiltinsMat } from "../api.js";

export const MAT3: JSBuiltinsMat = {
    add: (a, b) => add33([], a, b),
    addnv: (a, b) => addN33([], b, a),
    addvn: (a, b) => addN33([], a, b),
    dec: (a) => subN33([], a, 1),
    div: (a, b) => div33([], a, b),
    divnv: (a, b) => div33(null, vecOf(9, a), b),
    divvn: (a, b) => divN33([], a, b),
    idx: (a, b) => setS3([], a, 0, b * 3),
    inc: (a) => addN33([], a, 1),
    mul: (a, b) => mul33([], a, b),
    mulm: (a, b) => mulM33([], a, b),
    mulmv: (a, b) => mulV33([], a, b),
    mulnv: (a, b) => mulN33([], b, a),
    mulvm: (a, b) => mulVM33([], a, b),
    mulvn: (a, b) => mulN33([], a, b),
    sub: (a, b) => sub33([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub33(null, vecOf(9, a), b),
    subvn: (a, b) => subN33([], a, b),
};
