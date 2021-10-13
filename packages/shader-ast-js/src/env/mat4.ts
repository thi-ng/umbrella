import { add44 } from "@thi.ng/matrices/add";
import { addN44 } from "@thi.ng/matrices/addn";
import { div44 } from "@thi.ng/matrices/div";
import { divN44 } from "@thi.ng/matrices/divn";
import { mul44 } from "@thi.ng/matrices/mul";
import { mulM44 } from "@thi.ng/matrices/mulm";
import { mulN44 } from "@thi.ng/matrices/muln";
import { mulV44 } from "@thi.ng/matrices/mulv";
import { mulVM44 } from "@thi.ng/matrices/mulvm";
import { sub44 } from "@thi.ng/matrices/sub";
import { subN44 } from "@thi.ng/matrices/subn";
import { neg } from "@thi.ng/vectors/neg";
import { setS4 } from "@thi.ng/vectors/sets";
import { vecOf } from "@thi.ng/vectors/vec-of";
import type { JSBuiltinsMat } from "../api.js";

export const MAT4: JSBuiltinsMat = {
    add: (a, b) => add44([], a, b),
    addnv: (a, b) => addN44([], b, a),
    addvn: (a, b) => addN44([], a, b),
    dec: (a) => subN44([], a, 1),
    div: (a, b) => div44([], a, b),
    divnv: (a, b) => div44(null, vecOf(16, a), b),
    divvn: (a, b) => divN44([], a, b),
    idx: (a, b) => setS4([], a, 0, b * 4),
    inc: (a) => addN44([], a, 1),
    mul: (a, b) => mul44([], a, b),
    mulm: (a, b) => mulM44([], a, b),
    mulmv: (a, b) => mulV44([], a, b),
    mulnv: (a, b) => mulN44([], b, a),
    mulvm: (a, b) => mulVM44([], a, b),
    mulvn: (a, b) => mulN44([], a, b),
    sub: (a, b) => sub44([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub44(null, vecOf(16, a), b),
    subvn: (a, b) => subN44([], a, b),
};
