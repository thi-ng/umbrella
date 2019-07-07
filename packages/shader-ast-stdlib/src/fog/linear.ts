import {
    defn,
    div,
    FLOAT1,
    ret,
    sub
} from "@thi.ng/shader-ast";
import { clamp01 } from "../math/clamp";

/**
 * @param dist float
 * @param start float
 * @param end float
 *
 */
export const fogLinear = defn(
    "float",
    "fogLinear",
    [["float"], ["float"], ["float"]],
    (dist, start, end) => [
        ret(sub(FLOAT1, clamp01(div(sub(end, dist), sub(end, start)))))
    ]
);
